import React, { useCallback, useState } from 'react';
import { onSubmit } from '@/app/actions/uploadFile'; // Adjust the import based on your file structure
import bentoGallery from "@/components/assets/bento galllery.png"; // Ensure the correct path
import Image from 'next/image';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    GlobalLayoutRecState,
    GlobalLayoutUnsavedChangesRecState,
    newLayoutItemIndexRecState
} from '@/store/layoutStore';
import LayoutItem from '@/utils/Types';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const getComponentTypeFromFile = (file: File): "image" | "video" => {
    const mimeType = file.type;

    if (mimeType.startsWith('image/')) {
        return 'image';
    } else if (mimeType.startsWith('video/')) {
        return 'video';
    } else {
        throw new Error('Unsupported file type');
    }
};

const FileUploadButton = () => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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

    const addComponentFromURL = (url: string, type: "image" | "video") => {
        const numCols = 4;
        const rowHeight = 180;

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
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setError('File size exceeds the maximum limit of 5 MB.');
                return;
            }

            setError(null); // Reset error if file size is acceptable
            setLoading(true); // Set loading state

            try {
                const formData = new FormData();
                formData.append('file', file);
                console.log("File being uploaded:", file);

                const cdnUrl = await onSubmit(formData); // Call the server action

                if (cdnUrl) {
                    setFileUrl(cdnUrl);
                    console.log('File uploaded successfully:', cdnUrl);
                    const fileType = getComponentTypeFromFile(file); // Detect the type from file
                    addComponentFromURL(cdnUrl, fileType);
                } else {
                    setError('Failed to get the uploaded file URL.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setError('Error uploading file. Please try again.');
            } finally {
                setLoading(false); // Reset loading state
            }
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
            />
            <label htmlFor="file-upload">
                <div className='h-8 w-8 overflow-hidden border shadow rounded-xl hover:scale-125 duration-500 cursor-pointer'>
                    <Image src={bentoGallery} alt="Gallery Icon" width={32} height={32} />
                </div>
            </label>
            {/* {loading && <p className="text-blue-500">Uploading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {fileUrl && (
                <p className="text-green-500">
                    File uploaded: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a>
                </p>
            )} */}
        </div>
    );
};

export default FileUploadButton;
