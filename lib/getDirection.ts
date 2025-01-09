interface Coordinates {
    lng: number;
    lat: number;
}

export default async function getDirection(
    origin: Coordinates,
    destination: Coordinates
) {
    const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
    if (!apiKey) {
        throw new Error("API key is not defined in the environment variables");
    }

    const url = `https://api.olamaps.io/routing/v1/directions?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&api_key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: "POST",
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching directions:", error);
        throw error;
    }
}
