"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { getWeather } from "@/lib/actions/getWeather";
import { useLocationContext } from "@/context/LocationContext";
import { Weather } from "@/lib/weather";
import decodePolyline from "@/lib/decodePolyline";
import getDirection from "@/lib/getDirection";
import { useMap } from "@/context/MapContext";
import axios from "axios";
import debounce from "lodash.debounce";
import { Incident } from "@/app/police/dashboard/Dashboard";
import { haversine } from "@/lib/distance";
import polylineModule from "@mapbox/polyline";
import { MapPinIcon } from "./markers";
import { Droplets, Search, WindIcon } from "lucide-react";
import { jakarta } from "@/app/layout";
import Logo from "./ui/Logo";

export function NavigationBar({
  setIncidentsOnRoute,
}: {
  setIncidentsOnRoute: Dispatch<SetStateAction<Incident[]>>;
}) {
  const { map, addMarker } = useMap();
  const locationCtx = useLocationContext();
  const currentlocation = locationCtx?.currentLocation;
  const [weather, setWeather] = useState<Weather | null>(null);
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [polyline, setPolyline] = useState<string | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      const resp = await fetch("/api/incident");
      if (resp.ok) {
        const data = await resp.json();
        setIncidents(data);
      }
    };
    fetchIncidents();
  }, []);

  useEffect(() => {
    if (!polyline || !incidents) return;
    const routeCoords = polylineModule.decode(polyline);
    const incidentsEnRoute: Set<Incident> = new Set();
    routeCoords.forEach((coord) => {
      const [lng, lat] = coord;
      incidents.forEach((incident) => {
        const dist = haversine(lat, lng, incident.longitude, incident.latitude);
        if (dist <= 1) {
          incidentsEnRoute.add(incident);
        }
      });
    });
    console.log(incidentsEnRoute);
    setIncidentsOnRoute(Array.from(incidentsEnRoute));
  }, [polyline, incidents]);

  const fitMapToLocations = (
    currentLocation: { latitude: number; longitude: number },
    destination: { lat: number; lng: number }
  ) => {
    if (!map || !currentLocation) return;

    const bounds = [
      [
        Math.min(currentLocation.longitude, destination.lng),
        Math.min(currentLocation.latitude, destination.lat),
      ],
      [
        Math.max(currentLocation.longitude, destination.lng),
        Math.max(currentLocation.latitude, destination.lat),
      ],
    ];

    map.fitBounds(bounds, { padding: 100 });
  };

  async function handleInput(location?: { lat: number; lng: number }) {
    setShowModal(false);

    if (map && currentlocation && location) {
      addMarker(location.lng, location.lat, map, () => (
        <MapPinIcon className="bg-transparent" />
      ));

      fitMapToLocations(
        {
          latitude: currentlocation.latitude,
          longitude: currentlocation.longitude,
        },
        location
      );
      if (map.getLayer("route")) {
        map.removeLayer("route");
      }
      if (map.getSource("route")) {
        map.removeSource("route");
      }

      getDirection(
        {
          lng: location.lng,
          lat: location.lat,
        },
        {
          lng: currentlocation.longitude,
          lat: currentlocation.latitude,
        }
      ).then((data) => {
        setPolyline(data.routes[0].overview_polyline as string);
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: decodePolyline(data),
            },
          },
        });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#000",
            "line-width": 2,
          },
        });
        console.log(data);
      });
    }
  }

  const fetchSuggestions = useCallback(
    debounce(async (input: string) => {
      if (input.length > 2 && showModal) {
        const response = await axios.get(
          `https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`
        );
        setSuggestions(response.data.predictions);
      } else {
        setSuggestions([]);
      }
    }, 300),
    [showModal]
  );

  useEffect(() => {
    async function fetchData() {
      if (!currentlocation) {
        return;
      }
      const weatherData = await getWeather(
        currentlocation.latitude,
        currentlocation.longitude
      );
      setWeather(weatherData);
    }
    fetchData();
  }, [currentlocation]);

  useEffect(() => {
    fetchSuggestions(destination);
  }, [destination, fetchSuggestions]);

  return (
    <div className="min-h-36 w-full fixed top-0 z-10 flex flex-col justify-between p-2 ">
      <div className="bg-white p-2 border shadow-md rounded-lg h-full">
        <div className="flex flex-col items-center justify-between gap-5">
          <div
            className={`flex items-start justify-start gap-3 pr-2 mt-2 w-full ${jakarta.className}`}
          >
            <div className="">
              <Logo />
            </div>

            <div className="flex flex-col">
              <div className="font-bold text-3xl">{weather?.city}</div>
              <div>{weather?.currentTemp}&deg; C</div>
            </div>
            <div className="flex items-center justify-center gap-2 ">
              <div className="flex justify-between gap-2 items-center">
                <WindIcon className="hover:bg-transparent text-slate-300 -ml-1" />{" "}
                <div className="-ml-1">{weather?.windSpeed} Km/hr</div>{" "}
              </div>
              <div className="flex justify-between gap-2 items-center">
                <Droplets className="text-blue-300" />{" "}
                <div>{weather?.humidity} %</div>{" "}
              </div>
            </div>
          </div>
          <div className="relative flex items-center h-full w-full flex-1">
            <div className="relative w-full h-full">
              <input
                onClick={() => setShowModal(true)}
                name="destination"
                type="text"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={`w-full h-full text-sm py-4 pl-12 pr-2 border font-medium outline-none rounded-lg ${jakarta.className}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleInput();
                  }
                }}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="text-slate-300" />
              </div>
            </div>

            <div className={showModal ? "" : "hidden"}>
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md mt-1 z-10">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setDestination(suggestion.description);
                        setSuggestions([]);
                        handleInput(suggestion.geometry.location);
                      }}
                    >
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

