import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LayoutItem from '@/utils/Types';
import { addComponentFromURL, saveChanges } from '@/utils/ComponentUtilities';
const MenuComp = () => {
    const [layout, setLayout] = useState<LayoutItem[]>([]);
    const [newItemIndex, setNewItemIndex] = useState<number>(0);
    const [url, setUrl] = useState("");
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };


    return (
        <div className="mb-4">

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-blue-500 text-white p-2 rounded">Add Component</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className=" text-white">
                        <DialogTitle>Add New Component</DialogTitle>
                        <DialogDescription>
                            Enter the URL to add a new component.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col space-y-2 text-white">
                        <Input
                            type="text"
                            value={url}
                            onChange={handleInputChange}
                            placeholder="Enter URL"
                        />
                        <Button
                            onClick={() => {
                                if (url) {
                                    addComponentFromURL(layout, url, newItemIndex, setLayout, setNewItemIndex, setUnsavedChanges);
                                    setUrl(""); // Clear input after adding
                                } else {
                                    console.error('URL cannot be empty');
                                }
                            }}
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Add Component
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
            <button
                onClick={() => {
                    saveChanges(layout, setUnsavedChanges)
                }
                }
                disabled={!unsavedChanges} // Disable button if no changes
                className={`bg-green-500 text-white p-2 mt-2 rounded ${!unsavedChanges ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Save Changes
            </button>
        </div>
    )
}

export default MenuComp