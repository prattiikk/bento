import React, { useEffect, useState } from "react";
import axios from "axios";

interface MetaType {
    publisher?: string;
    title?: string;
    logo?: {
        url?: string;
    };
    screenshot?: {
        url?: string;
    };
}

interface WebsitePreviewProps {
    url: string;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ url }) => {
    const [metadata, setMetadata] = useState<MetaType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWebsiteMetadata = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true`
            );
            setMetadata(response.data.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch website metadata");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (url) {
            fetchWebsiteMetadata();
        }
    }, [url]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!metadata) return null;

    return (
        <div className="p-4 w-full h-full mx-auto bg-white overflow-hidden flex flex-col justify-evenly">
            <a href={url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        {metadata.logo && metadata.logo.url && (
                            <img
                                className="h-12 w-12 object-cover md:w-16 md:h-16 m-2 rounded-full"
                                src={metadata.logo.url}
                                alt="Website Logo"
                            />
                        )}
                    </div>
                    <div className="p-2">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {metadata.title || "No Title"}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            {metadata.publisher || "No Publisher"}
                        </p>
                    </div>
                </div>
            </a>

            {metadata.screenshot && metadata.screenshot.url && (
                <div className="mt-4">
                    <img
                        src={metadata.screenshot.url}
                        alt="Website preview"
                        className="w-3/4 mx-auto h-auto rounded-md shadow-sm"
                    />
                </div>
            )}
        </div>
    );
};

export default WebsitePreview;