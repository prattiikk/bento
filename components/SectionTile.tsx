"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { GlobalLayoutUnsavedChangesRecState } from "@/store/layoutStore";

const TextCard: React.FC = () => {
    const [content, setContent] = useState("");
    const setUnsavedChanges = useSetRecoilState(GlobalLayoutUnsavedChangesRecState);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setUnsavedChanges(true);
    }, [content, setUnsavedChanges]);

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
                    className="w-full text-left text-xl font-semibold text-black bg-transparent focus:outline-none resize-none"
                    placeholder="Add section tile header"
                    maxLength={80} // max charr limit
                />
            </div>
        </div>
    );
};

export default TextCard;