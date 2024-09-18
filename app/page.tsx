"use client";
import { useState, useCallback, SetStateAction } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { debounce } from "lodash";

export default function Home() {
  // Define the layout with custom widths and heights
  const [layout, setLayout] = useState([
    { i: "1", x: 0, y: 0, w: 2, h: 2 },    // 500x500 pixels
    { i: "2", x: 2, y: 0, w: 2, h: 1 },    // 500x250 pixels
    { i: "3", x: 0, y: 2, w: 1, h: 1 },    // 250x250 pixels
    { i: "4", x: 1, y: 2, w: 1, h: 2 },    // 250x500 pixels
  ]);

  // Debounced layout change handler for smooth resizing
  const onLayoutChange = useCallback(
    debounce(
      (newLayout: SetStateAction<{ i: string; x: number; y: number; w: number; h: number; }[]>) => {
        setLayout(newLayout);
      },
      300 // Adjust debounce delay as needed
    ),
    []
  );

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <div className="flex-shrink-0 w-1/3 bg-gray-100 p-4">
        <p className="text-center text-gray-600">Left Side (Reserved)</p>
      </div>

      {/* Right draggable/resizable grid */}
      <div className="flex-grow w-2/3 p-4">
        <GridLayout
          className="layout"
          layout={layout}
          cols={4} // Define grid columns (1 column = 250px)
          rowHeight={125} // Set row height (1 row = 125px, 4 rows = 500px)
          width={1000} // Total width of the grid
          onLayoutChange={onLayoutChange}
          isDraggable={true}
          isResizable={true}
          useCSSTransforms={true}
          margin={[20, 20]} // Margin between items
          compactType={null} // Disable auto-compaction
          preventCollision={true} // Prevent items from overlapping
        >
          <div key="1" className="bg-gray-200 p-4 rounded-lg shadow">
            Social Media Links
          </div>
          <div key="2" className="bg-gray-200 p-4 rounded-lg shadow">
            Photos
          </div>
          <div key="3" className="bg-gray-200 p-4 rounded-lg shadow">
            Videos
          </div>
          <div key="4" className="bg-gray-200 p-4 rounded-lg shadow">
            Map
          </div>
        </GridLayout>
      </div>
    </div>
  );
}
