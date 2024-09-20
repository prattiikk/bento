"use client";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import ProfileSection from "@/components/ProfileSection";


// Import Utility functions and types
import LayoutItem from "@/utils/Types";
import { addComponentFromURL, fetchLayout, saveChanges } from "@/utils/ComponentUtilities";
import renderComponent from "@/components/CompRenderer";
import { gridWidth, numCols, rowHeight } from "@/utils/config";



export default function Home() {
  const [layout, setLayout] = useState<LayoutItem[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [newItemIndex, setNewItemIndex] = useState<number>(0);
  const [url, setUrl] = useState("");

  // flag for unsaved changes
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    // fetches the user layout and sets it in the state
    fetchLayout({ setLayout, setInitialLoad });
  }, []);



  const handleLayoutChange = (newLayout: any[]) => {
    if (initialLoad) return;

    const updatedItems = newLayout.map((item: any) => {
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



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  // const handleAddComponent = () => {
  //   if (url) {
  //     addComponentFromURL(layout, url, newItemIndex, setLayout, setNewItemIndex, setUnsavedChanges);
  //     setUrl(""); // Clear input after adding
  //   } else {
  //     console.error('URL cannot be empty');
  //   }
  // };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 h-screen">
        <ProfileSection />
      </div>
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
              className={`bg-gray-200 overflow-hidden rounded-3xl shadow`}
            >
              {renderComponent(item)}

            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
}