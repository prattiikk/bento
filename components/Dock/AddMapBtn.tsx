"use client"
import bentoMap from "@/components/assets/bento map.png";
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState, newLayoutItemIndexRecState } from '@/store/layoutStore'
import LayoutItem from '@/utils/Types'
import Image from 'next/image';

const AddLinkbtn = () => {
    const [layout, setLayout] = useRecoilState(GlobalLayoutRecState)
    const [newItemIndex, setNewItemIndex] = useRecoilState(newLayoutItemIndexRecState)
    const setUnsavedChanges = useSetRecoilState(GlobalLayoutUnsavedChangesRecState)

    const generateUniqueId = (): number => {
        const maxId = layout.reduce((max, item) => {
            const itemId = parseInt(item.i, 10)
            return isNaN(itemId) ? max : Math.max(max, itemId)
        }, 0)
        return Math.max(maxId + 1, newItemIndex + 1)
    }

    const AddMap = () => {
        const type = 'map'
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
                data: {},
            }

            setLayout((prevLayout) => [...prevLayout, newItem])
            setNewItemIndex((prevIndex) => prevIndex + 1)
            setUnsavedChanges(true)
        } else {
            console.error('some error occured in map component')
        }
    }


    return (
        <button onClick={AddMap} className='h-8 w-8 border overflow-hidden shadow rounded-xl hover:scale-125 duration-500'>
            <Image src={bentoMap} alt='Map Icon' width={32} height={32} />
        </button>
    )
}

export default AddLinkbtn