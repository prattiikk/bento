"use client";
import { useState } from "react";

const TextCard = ({ cont }: { cont: string }) => {
    const [content, setContent] = useState(cont);

    return (
        <div className="w-full h-full bg-white p-6">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-2xl text-black bg-transparent focus:outline-none resize-none"
                placeholder="text content"
                rows={3}
            />
        </div>
    );
};

export default TextCard;