"use client";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";


import ProfileSection from "@/components/ProfileSection";


// Import Utility functions and types
import LayoutItem from "@/utils/Types";
import renderComponent from "@/components/CompRenderer";
import { gridWidth, numCols, rowHeight } from "@/utils/config";
import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState } from "@/store/layoutStore";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";


export default function Home() {


    // recoil states
    const [layout, setLayout] = useRecoilState(GlobalLayoutRecState)
    // const [newItemIndex, setNewItemIndex] = useRecoilState(newLayoutItemIndexRecState);
    // flag for unsaved changes
    const setUnsavedChanges = useSetRecoilState(GlobalLayoutUnsavedChangesRecState);



    // local states
    // const [url, setUrl] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);


    useEffect(() => {
        // fetches the user layout and sets it in the state
        fetchLayout(setInitialLoad);
    }, []);



    // We remove setLayout and setInitialLoad from the params
    function fetchLayout(setInitialLoad: (value: boolean) => void) {

        axios.get('http://localhost:3000/api/user')
            .then(response => {
                console.log('Fetched layout data:', response.data);

                // Update the Recoil global state directly
                setLayout(response.data.layout as LayoutItem[]); // Assuming response.data.layout is of type LayoutItem[]
                setInitialLoad(false);
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });
    }












    const handleLayoutChange = (newLayout: LayoutItem[]) => {
        if (initialLoad) return;

        const updatedItems = newLayout.map((item: LayoutItem) => {
            const updatedItem = layout.find((prevItem: LayoutItem) => prevItem.i === item.i);
            if (updatedItem) {
                return {
                    ...updatedItem,
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h,
                };
            }
            return updatedItem;
        }).filter((item: LayoutItem | undefined) => item !== undefined) as LayoutItem[];

        // set changes into the state
        setLayout(updatedItems);
        setUnsavedChanges(true); // Set unsaved changes flag
    };


    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setUrl(event.target.value);
    // };


    return (
        <div className="flex h-screen">
            <div className="w-1/3 p-4 h-screen">
                <ProfileSection />
            </div>

            <div className="flex-grow w-2/3 p-4">

                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={numCols}
                    rowHeight={rowHeight}
                    width={gridWidth}
                    onLayoutChange={handleLayoutChange}
                    isDraggable={true}
                    isResizable={true}
                    useCSSTransforms={true}
                    margin={[40, 40]}
                    compactType={"vertical"}
                    preventCollision={false}
                >
                    {layout.map(item => (
                        <div
                            key={item.i}
                            data-grid={{ i: item.i, x: item.x, y: item.y, w: item.w, h: item.h }}
                            className={`${item.type === "sectionTile"
                                ? "react-grid-item-exception"
                                : item.type === "text"
                                    ? "bg-gray-200 overflow-visible rounded-3xl shadow-2xl"
                                    : "bg-gray-200 overflow-hidden rounded-3xl shadow-2xl"}`}
                        >
                            {renderComponent(item)}

                        </div>
                    ))}
                </GridLayout>
            </div>
        </div>
    );
}