"use client";
import React, { useEffect, useState } from "react";

interface MapCardProps {
    latitude: number;
    longitude: number;
    zoom: number;
    width?: number;
    height?: number;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_KEY;

const MapCard: React.FC<MapCardProps> = ({
    latitude,
    longitude,
    zoom = 100,
    width = 500,
    height = 500,
}) => {
    const [mapUrl, setMapUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMap = () => {
            if (!MAPBOX_TOKEN) {
                setError("Mapbox token is not set");
                return;
            }

            // Construct the static map URL
            const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${longitude},${latitude},${zoom}/${width}x${height}@2x?access_token=${MAPBOX_TOKEN}`;

            setMapUrl(staticMapUrl);
        };

        fetchMap();
    }, [latitude, longitude, zoom, width, height]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!mapUrl) {
        return <div>Loading map...</div>;
    }

    return (
        <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
            <img
                src={mapUrl}
                alt={`Map of location at ${latitude},${longitude}`}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default MapCard;