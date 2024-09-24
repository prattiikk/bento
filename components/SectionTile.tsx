"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState } from "@/store/layoutStore";

// Define the props interface for proper typing
interface TextCardProps {
    data: string;
}

const TextCard: React.FC<TextCardProps> = ({ data }) => {
    const [content, setContent] = useState<string>(data);
    const setUnsavedChanges = useSetRecoilState(GlobalLayoutUnsavedChangesRecState);
    const inputRef = useRef<HTMLInputElement>(null);
    const layout = useRecoilValue(GlobalLayoutRecState)
    useEffect(() => {
        const updateTileInfo = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/user/tileChange", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ TileInfo: layout, content })
                });

                if (!response.ok) {
                    throw new Error("Failed to update tile info");
                }

                const result = await response.json();
                console.log("Tile updated successfully:", result);
            } catch (error) {
                console.error("Error updating tile info:", error);
            }
        };

        const timer = setTimeout(() => {
            updateTileInfo();
            setUnsavedChanges(true);
        }, 3000); // Add delay for debouncing

        return () => clearTimeout(timer); // Cleanup the timeout
    }, [content, setUnsavedChanges, layout]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    return (
        <div className="w-full h-full bg-white pl-4 flex items-end border-none shadow-none hover:border-none hover:shadow-none">
            <div className="w-full">
                <input
                    ref={inputRef}
                    type="text"
                    value={content}
                    onChange={handleChange}
                    className="w-full text-left text-2xl font-semibold text-black bg-transparent focus:outline-none resize-none"
                    placeholder={content}
                    maxLength={80} // max character limit
                />
            </div>
        </div>
    );
};

export default TextCard;