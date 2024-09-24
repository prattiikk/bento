"use client";

import React, { useCallback } from 'react';
import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState, newLayoutItemIndexRecState } from "@/store/layoutStore";
import LayoutItem from "@/utils/Types";
import { useRecoilState, useSetRecoilState } from "recoil";

const SectionTileBtn: React.FC = () => {
    const [layout, setLayout] = useRecoilState(GlobalLayoutRecState);
    const [newItemIndex, setNewItemIndex] = useRecoilState(newLayoutItemIndexRecState);
    const setUnsavedChanges = useSetRecoilState(GlobalLayoutUnsavedChangesRecState);

    const generateUniqueId = useCallback((): number => {
        const maxId = layout.reduce((max, item) => {
            const itemId = parseInt(item.i, 10);
            return isNaN(itemId) ? max : Math.max(max, itemId);
        }, 0);
        return Math.max(maxId + 1, newItemIndex + 1);
    }, [layout, newItemIndex]);

    const addTile = () => {
        const rowHeight = 180;

        const x = 0;
        const y = layout.length > 0 ? layout[layout.length - 1].y + layout[layout.length - 1].h * rowHeight : 0;

        const newId = generateUniqueId();
        const newItem: LayoutItem = {
            i: String(newId),
            x,
            y,
            w: 4,
            h: 1,
            type: "sectionTile", // Hardcoded type
            data: { content: "Add Title" }, // Hardcoded content
        };

        setLayout((prevLayout) => [...prevLayout, newItem]);
        setNewItemIndex((prevIndex) => prevIndex + 1);
        setUnsavedChanges(true);
    };

    return (
        <button onClick={addTile} className='h-8 w-8 overflow-hidden border shadow rounded-xl hover:scale-125 duration-500 cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="12" width="7" height="8" rx="3" fill="#E3E3E3" />
                <rect x="4.5" y="12.5" width="6" height="7" rx="2.5" stroke="black" strokeOpacity="0.08" />
                <rect x="13" y="12" width="7" height="8" rx="3" fill="#E3E3E3" />
                <rect x="13.5" y="12.5" width="6" height="7" rx="2.5" stroke="black" strokeOpacity="0.08" />
                <rect x="4" y="4" width="12" height="5" rx="2.5" fill="url(#paint0_linear_7289_21481)" />
                <defs>
                    <linearGradient id="paint0_linear_7289_21481" x1="10" y1="4" x2="10" y2="9" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#5B5B5B" />
                        <stop offset="1" />
                    </linearGradient>
                </defs>
            </svg>
        </button>
    );
};

export default SectionTileBtn;