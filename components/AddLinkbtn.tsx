import React, { useCallback, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LayoutItem from '@/utils/Types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState, newLayoutItemIndexRecState } from '@/store/layoutStore';
import { makeUpdateCall } from '@/utils/ComponentUtilities';

const AddLinkbtn = () => {
    const [layout, setLayout] = useRecoilState(GlobalLayoutRecState);
    const [newItemIndex, setNewItemIndex] = useRecoilState(newLayoutItemIndexRecState);
    const setUnsavedChanges = useSetRecoilState(GlobalLayoutUnsavedChangesRecState);
    const [url, setUrl] = useState("");

    const getComponentTypeFromURL = (url: string): "socialMediaLinks" | "image" | "video" | "map" | "text" | "website" => {
        // Determine the type based on the URL
        // For now, let's assume it always returns 'website'
        return 'website'; // Replace with your logic to determine type
    };

    // Handlers for the click events
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const generateUniqueId = useCallback((): number => {
        const maxId = layout.reduce((max, item) => {
            const itemId = parseInt(item.i, 10);
            return isNaN(itemId) ? max : Math.max(max, itemId);
        }, 0);
        return Math.max(maxId + 1, newItemIndex + 1);
    }, [layout, newItemIndex]);

    const addComponentFromURL = (url: string) => {
        const type = getComponentTypeFromURL(url);
        const numCols = 4;
        const rowHeight = 180;



        if (type) {
            let x = 0;
            let y = 0;

            // Calculate the position of the new item at the end of the layout
            if (layout.length > 0) {
                const lastItem = layout[layout.length - 1];
                x = 0; // Start from the leftmost column
                y = lastItem.y + lastItem.h * rowHeight; // Place below the last item
            }

            const newId = generateUniqueId();
            const newItem: LayoutItem = {
                i: String(newId),
                x,
                y,
                w: 2,
                h: 2,
                type,
                data: { url },
            };

            // Update layout, newItemIndex, and unsavedChanges using Recoil
            setLayout((prevLayout) => [...prevLayout, newItem]);
            setNewItemIndex((prevIndex) => prevIndex + 1);
            setUnsavedChanges(true); // Mark changes as unsaved
        } else {
            console.error('Unknown URL type');
        }
    };

    return (
        <div>
            {/* Link button triggering the dialog */}
            <Dialog >
                <DialogTrigger asChild>
                    <button className='h-8 w-8 p-2 border shadow rounded-xl hover:scale-125 duration-500'>
                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.95034 13.8492C5.12191 15.0208 7.02141 15.0208 8.19298 13.8492L9.6072 12.435C9.99772 12.0445 10.6309 12.0445 11.0214 12.435C11.4119 12.8256 11.4119 13.4587 11.0214 13.8492L9.6072 15.2635C7.65457 17.2161 4.48875 17.2161 2.53613 15.2635C0.583506 13.3108 0.583507 10.145 2.53613 8.19239L3.95034 6.77817C4.34087 6.38765 4.97403 6.38765 5.36455 6.77817C5.75508 7.1687 5.75508 7.80186 5.36455 8.19239L3.95034 9.6066C2.77877 10.7782 2.77877 12.6777 3.95034 13.8492ZM12.4356 9.6066L13.8498 8.19239C15.0214 7.02082 15.0214 5.12132 13.8498 3.94975C12.6783 2.77817 10.7788 2.77817 9.6072 3.94975L8.19298 5.36396C7.80246 5.75449 7.16929 5.75449 6.77877 5.36396C6.38824 4.97344 6.38824 4.34027 6.77877 3.94975L8.19298 2.53553C10.1456 0.582913 13.3114 0.582913 15.264 2.53553C17.2167 4.48816 17.2167 7.65398 15.264 9.6066L13.8498 11.0208C13.4593 11.4113 12.8261 11.4113 12.4356 11.0208C12.0451 10.6303 12.0451 9.99713 12.4356 9.6066ZM11.7285 7.48528C12.119 7.09476 12.119 6.46159 11.7285 6.07107C11.338 5.68054 10.7048 5.68054 10.3143 6.07107L6.07166 10.3137C5.68114 10.7042 5.68114 11.3374 6.07166 11.7279C6.46219 12.1184 7.09535 12.1184 7.48588 11.7279L11.7285 7.48528Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </DialogTrigger>

                {/* Dialog content for adding component */}
                <DialogContent className=" bg-black border-black text-gray-300 ">
                    <DialogHeader className="">
                        <DialogTitle>Paste new Link</DialogTitle>
                        <DialogDescription>
                            Enter your Url here...
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col space-y-2">
                        <Input
                            type="text"
                            value={url}
                            onChange={handleInputChange}
                            placeholder="Enter URL"
                            className=' rounded-xl'
                        />
                        <Button
                            onClick={() => {
                                if (url) {
                                    addComponentFromURL(url);
                                    setUrl(""); // Clear input after adding
                                } else {
                                    console.error('URL cannot be empty');
                                }
                            }}
                            className="bg-white text-black rounded-xl hover:bg-gray-200 hover:text-base duration-1000 p-2 "
                        >
                            Add Component
                        </Button>
                        {/* <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose> */}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddLinkbtn