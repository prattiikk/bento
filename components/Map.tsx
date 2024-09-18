// components/MapComponent.js
export default function MapComponent({ location, zoom }: { location: string, zoom: string }) {
    // Placeholder for the map rendering logic
    return (
        <div className=" text-black p-4 bg-slate-400">
            <p>Map for {location} with zoom level {zoom}</p>
        </div>
    );
}