"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState } from "@/store/layoutStore";
import LayoutItem from '@/utils/Types'; // Import your layout type

// Define the props interface for proper typing
interface TextCardProps {
    item: LayoutItem;  // Pass the current layout item for easier updates
}

const TextCard: React.FC<TextCardProps> = ({ item }) => {
    const [content, setContent] = useState<string>(item.data);
    console.log(item.data)
    const [layout, setLayout] = useRecoilState(GlobalLayoutRecState); // Using useRecoilState to update the layout
    const setUnsavedChanges = useSetRecoilState(GlobalLayoutUnsavedChangesRecState);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const updateLayout = () => {
            const updatedLayout = layout.map((layoutItem: LayoutItem) =>
                layoutItem.i === item.i ? { ...layoutItem, data: content } : layoutItem
            );
            setLayout(updatedLayout);
            setUnsavedChanges(true);
        };

        const timer = setTimeout(updateLayout, 1000); // Debouncing to reduce frequent updates

        return () => clearTimeout(timer); // Cleanup the timeout
    }, [content]);

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







