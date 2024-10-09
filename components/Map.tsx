"use client";

import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Search } from "lucide-react";
import { Ellipsis } from "lucide-react"
import AirplaneScene from "./PlaneAnimation";

const ReactMapBox = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoicHJhdHRpaWtrIiwiYSI6ImNtMjA0b2JnbDBkOTIyanF0MWlmZ3JncTAifQ._pSzkQsgp7SXiKrAsCeeiw",
});

const customMapStyle = {
    version: 8 as const,
    name: "Vibrant Cartoon",
    sources: {
        mapbox: {
            type: "vector",
            url: "mapbox://mapbox.mapbox-streets-v8",
        },
    },
    layers: [
        {
            id: "background",
            type: "background",
            paint: { "background-color": "#F4F5EB" }, // Bright white background
        },
        {
            id: "water",
            type: "fill",
            source: "mapbox",
            "source-layer": "water",
            paint: { "fill-color": "#87C5F7" }, // Light blue for water
        },
        {
            id: "park",
            type: "fill",
            source: "mapbox",
            "source-layer": "landuse",
            filter: ["==", "class", "park"],
            paint: { "fill-color": "#88E576" }, // Light green for parks
        },
        {
            id: "vegetation",
            type: "fill",
            source: "mapbox",
            "source-layer": "landcover",
            filter: ["==", "class", "vegetation"],
            paint: { "fill-color": "#A7D59E" }, // Slightly darker green for vegetation
        },
        {
            id: "buildings",
            type: "fill",
            source: "mapbox",
            "source-layer": "building",
            paint: { "fill-color": "#DCE2D9", "fill-opacity": 0.9 }, // Beige color for buildings with transparency
        },
        {
            id: "roads",
            type: "line",
            source: "mapbox",
            "source-layer": "road",
            paint: {
                "line-color": "#fafafa", // Keeping roads as per your requirement
                "line-width": 4,
            },
        },
        {
            id: "place-labels",
            type: "symbol",
            source: "mapbox",
            "source-layer": "place_label",
            layout: {
                "text-field": "{name}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12,
            },
            paint: {
                "text-color": "#4A4A4A", // Dark gray for place names
                "text-halo-color": "#FFFFFF", // White halo for clarity
                "text-halo-width": 2,
            },
        },
        // {
        //     id: "road-labels",
        //     type: "symbol",
        //     source: "mapbox",
        //     "source-layer": "road_label",
        //     layout: {
        //         "text-field": "{name}",
        //         "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        //         "text-size": 10,
        //     },
        //     paint: {
        //         "text-color": "#6B6B6B", // Medium gray for road names
        //         "text-halo-color": "#FFFFFF",
        //         "text-halo-width": 2,
        //     },
        // },
    ],
    glyphs: "https://api.mapbox.com/fonts/v1/mapbox/{fontstack}/{range}.pbf?access_token=pk.eyJ1IjoicHJhdHRpaWtrIiwiYSI6ImNtMjA0b2JnbDBkOTIyanF0MWlmZ3JncTAifQ._pSzkQsgp7SXiKrAsCeeiw",
};


interface Suggestion {
    name: string
    coords: [number, number]
}

const initialLocation = { lng: -73.9665, lat: 40.7812 }

export default function Component() {
    const [lng, setLng] = useState<number>(initialLocation.lng)
    const [lat, setLat] = useState<number>(initialLocation.lat)
    const [zoom] = useState<number>(15)
    const [searchValue, setSearchValue] = useState<string>("")
    const [location, setLocation] = useState<string>("Central Park, New York, NY, USA")
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
    const [showMenu, setShowMenu] = useState(true)

    const suggestions: Suggestion[] = [
        { name: "Times Square, New York, NY, USA", coords: [-73.9857, 40.758] },
        { name: "Statue of Liberty, New York, NY, USA", coords: [-74.0445, 40.6892] },
        { name: "Brooklyn Bridge, New York, NY, USA", coords: [-73.9969, 40.7061] },
    ]

    const handleSearch = (value: string) => {
        setSearchValue(value)
        setShowSuggestions(true)
    }

    const handleSelectLocation = (loc: Suggestion) => {
        setLocation(loc.name)
        setLng(loc.coords[0])
        setLat(loc.coords[1])
        setSearchValue("")
        setShowSuggestions(false)
    }

    const getCoordinatesFromPlace = async (place: string) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json`
            )
            const data = await response.json()

            if (data && data.length > 0) {
                const { lon, lat, display_name } = data[0]
                setLng(parseFloat(lon))
                setLat(parseFloat(lat))
                setLocation(display_name)
                console.log("New coordinates set:", lon, lat)
            } else {
                console.error("Location not found")
            }
        } catch (error) {
            console.error("Error fetching location:", error)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && searchValue) {
            getCoordinatesFromPlace(searchValue)
            setShowSuggestions(false)
        }
    }

    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        setLat(latitude)
                        setLng(longitude)
                        setLocation("")
                    },
                    (error) => {
                        console.error("Error getting location:", error)
                    }
                )
            } else {
                console.error("Geolocation is not supported by this browser.")
            }
        }

        getCurrentLocation()
    }, [])

    return (
        <div className="w-full h-full relative">
            <div className="absolute w-full h-full mx-auto rounded-2xl overflow-hidden shadow-lg">
                <AirplaneScene />
                <ReactMapBox
                    style={customMapStyle}
                    center={[lng, lat]}
                    zoom={[zoom]}
                    containerStyle={{
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
                        <Feature coordinates={[lng, lat]} />
                    </Layer>
                </ReactMapBox>

                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full text-sm shadow-md z-10">
                    {location}
                </div>
            </div>
            <button className="absolute -bottom-6 left-2 w-6 h-6" onClick={() => setShowMenu(!showMenu)}>
                <Ellipsis />
            </button>
            {showMenu && (
                <div className="absolute mt-2 mb-4 left-1/2 -bottom-16 transform -translate-x-1/2 rounded-full shadow-lg ">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Location"
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full px-4 py-2 rounded-2xl text-black placeholder-gray-200 focus:outline-none shadow-md"
                        />
                        <Search className="absolute right-5 top-3 h-5 w-5 text-gray-400" />
                    </div>
                    {showSuggestions && (
                        <div className="absolute top-full left-0 right-0 mt-2 overflow-hidden shadow-md">
                            {suggestions
                                .filter((suggestion) => suggestion.name.toLowerCase().includes(searchValue.toLowerCase()))
                                .map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 text-black hover:bg-gray-200 bg-white cursor-pointer rounded-2xl my-2 transition-colors duration-200"
                                        onClick={() => handleSelectLocation(suggestion)}
                                    >
                                        {suggestion.name}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}