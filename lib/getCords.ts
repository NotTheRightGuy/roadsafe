export default async function getCords(location: string) {
    const response = await fetch(
        `https://api.olamaps.io/places/v1/geocode?address=${location}&api_key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`
    );
    const data = await response.json();
    return data.geocodingResults[0].geometry.viewport.northeast;
}
