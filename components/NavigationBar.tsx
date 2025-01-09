"use client";
import React, { useState, useEffect, useCallback } from "react";
import { getWeather } from "@/lib/actions/getWeather";
import { useLocationContext } from "@/context/LocationContext";
import { Weather } from "@/lib/weather";
import decodePolyline from "@/lib/decodePolyline";
import getDirection from "@/lib/getDirection";
import { useMap } from "@/context/MapContext";
import axios from "axios";
import debounce from "lodash.debounce";

const NavigationBar: React.FC = () => {
    const { map, addMarker } = useMap();
    const locationCtx = useLocationContext();
    const currentlocation = locationCtx?.currentLocation;
    const [weather, setWeather] = useState<Weather | null>(null);
    const [destination, setDestination] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

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
            addMarker(location.lng, location.lat, map);

            fitMapToLocations(
                {
                    latitude: currentlocation.latitude,
                    longitude: currentlocation.longitude,
                },
                location
            );

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
            if (input.length > 2) {
                const response = await axios.get(
                    `https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`
                );
                setSuggestions(response.data.predictions);
            } else {
                setSuggestions([]);
            }
        }, 300),
        []
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
                <div className="flex">
                    {weather && (
                        <div className="flex items-center mr-4">
                            <img
                                src={weather.iconURL}
                                alt={weather.description}
                                className="w-8 h-8 mr-2"
                            />
                            <div>
                                <p className="text-gray-800">{weather.main}</p>
                                <p className="text-gray-600">
                                    {weather.currentTemp}°C
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative flex items-center">
                    <input
                        onClick={() => setShowModal(true)}
                        name="destination"
                        type="text"
                        placeholder="Where do you want to go?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full p-2 pr-10 border rounded mt-4 font-medium outline-none"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleInput();
                            }
                        }}
                    />

                    <div className={showModal ? "" : "hidden"}>
                        {suggestions.length > 0 && (
                            <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md mt-1 z-10">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => {
                                            setDestination(
                                                suggestion.description
                                            );
                                            setSuggestions([]);
                                            handleInput(
                                                suggestion.geometry.location
                                            );
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
    );
};

export default NavigationBar;
