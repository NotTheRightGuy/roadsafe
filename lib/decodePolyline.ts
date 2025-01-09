import polyline from "@mapbox/polyline";

function decodePolyline(response: any) {
    const overviewPolyline = response.routes[0].overview_polyline;
    const decodedCoordinates = polyline.decode(overviewPolyline);
    const formattedCoordinates = decodedCoordinates.map((coord) => [
        coord[1],
        coord[0],
    ]);

    return formattedCoordinates;
}

export default decodePolyline;
