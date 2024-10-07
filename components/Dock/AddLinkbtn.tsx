"use client"

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LinkIcon } from 'lucide-react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState, newLayoutItemIndexRecState } from '@/store/layoutStore'
import LayoutItem from '@/utils/Types'

const AddLinkbtn = () => {
    const [layout, setLayout] = useRecoilState(GlobalLayoutRecState)
    const [newItemIndex, setNewItemIndex] = useRecoilState(newLayoutItemIndexRecState)
    const setUnsavedChanges = useSetRecoilState(GlobalLayoutUnsavedChangesRecState)
    const [url, setUrl] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const getComponentTypeFromURL = (): "socialMediaLinks" | "image" | "video" | "map" | "text" | "website" => {
        return 'website' // Replace with your logic to determine type
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value)
    }

    const generateUniqueId = (): number => {
        const maxId = layout.reduce((max, item) => {
            const itemId = parseInt(item.i, 10)
            return isNaN(itemId) ? max : Math.max(max, itemId)
        }, 0)
        return Math.max(maxId + 1, newItemIndex + 1)
    }

    const addComponentFromURL = (url: string) => {
        const type = getComponentTypeFromURL()
        const rowHeight = 180

        if (type) {
            let x = 0
            let y = 0

            if (layout.length > 0) {
                const lastItem = layout[layout.length - 1]
                x = 0
                y = lastItem.y + lastItem.h * rowHeight
            }

            const newId = generateUniqueId()
            const newItem: LayoutItem = {
                i: String(newId),
                x,
                y,
                w: 2,
                h: 2,
                type,
                data: { url },
            }

            setLayout((prevLayout) => [...prevLayout, newItem])
            setNewItemIndex((prevIndex) => prevIndex + 1)
            setUnsavedChanges(true)
            setIsOpen(false)
            setUrl("")
        } else {
            console.error('Unknown URL type')
        }
    }

    // const handlePaste = async () => {
    //     try {
    //         const text = await navigator.clipboard.readText()
    //         setUrl(text)
    //     } catch (err) {
    //         console.error('Failed to read clipboard contents: ', err)
    //     }
    // }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (url) {
            addComponentFromURL(url)
        } else {
            console.error('URL cannot be empty')
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={null}
                    size="icon"
                    className="h-8 w-8 rounded-xl shadow transition-transform duration-500 hover:scale-125"
                >
                    <LinkIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80 p-0 bg-white border-none shadow-lg rounded-xl"
                side="top"
                align="end"
                sideOffset={5}
            >
                <form onSubmit={handleSubmit} className="flex items-center p-1">
                    <Input
                        type="text"
                        value={url}
                        onChange={handleInputChange}
                        placeholder="Enter Link"
                        className="flex-grow border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    {/* <Button
                        type="button"
                        onClick={handlePaste}
                        className="ml-2 bg-black text-white rounded-xl transition-transform hover:bg-black hover:opacity-80  hover:scale-95 duration-500"
                    >
                        Paste
                    </Button> */}
                    <Button
                        type="submit"
                        className="ml-2 bg-black text-white rounded-xl transition-transform hover:bg-black hover:opacity-80 hover:scale-95 duration-500"
                    >
                        Add
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default AddLinkbtn