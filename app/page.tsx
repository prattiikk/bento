// "use client";
// import { useState, useCallback, SetStateAction } from "react";
// import GridLayout from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import { debounce } from "lodash";

// export default function Home() {
//   // Define the layout with custom widths and heights
//   const [layout, setLayout] = useState([
//     { i: "1", x: 0, y: 0, w: 2, h: 2 },    // 500x500 pixels
//     { i: "2", x: 2, y: 0, w: 2, h: 1 },    // 500x250 pixels
//     { i: "3", x: 0, y: 2, w: 1, h: 1 },    // 250x250 pixels
//     { i: "4", x: 1, y: 2, w: 1, h: 2 },    // 250x500 pixels
//   ]);

//   // Debounced layout change handler for smooth resizing
//   const onLayoutChange = useCallback(
//     debounce(
//       (newLayout: SetStateAction<{ i: string; x: number; y: number; w: number; h: number; }[]>) => {
//         setLayout(newLayout);
//       },
//       300 // Adjust debounce delay as needed
//     ),
//     []
//   );

//   return (
//     <div className="flex h-screen">
//       {/* Left sidebar */}
//       <div className="flex-shrink-0 w-1/3 bg-gray-100 p-4">
//         <p className="text-center text-gray-600">Left Side (Reserved)</p>
//       </div>

//       {/* Right draggable/resizable grid */}
//       <div className="flex-grow w-2/3 p-4">
//         <GridLayout
//           className="layout"
//           layout={layout}
//           cols={4} // Define grid columns (1 column = 250px)
//           rowHeight={250} // Set row height (1 row = 125px, 4 rows = 500px)
//           width={1000} // Total width of the grid
//           onLayoutChange={onLayoutChange}
//           // resizeHandles={['se', 'sw', 'ne', 'nw', 's', 'w', 'e', 'n']} // Resize handles
//           isDraggable={true}
//           isResizable={true}
//           useCSSTransforms={true}
//           margin={[40, 40]} // Margin between items
//           compactType={"vertical"} // Disable auto-compaction
//           preventCollision={true} // Prevent items from overlapping
//         >
//           <div key="1" className="bg-gray-200 p-4 rounded-3xl shadow">
//             Social Media Links
//           </div>
//           <div key="2" className="bg-gray-200 p-4 rounded-3xl shadow">
//             Photos
//           </div>
//           <div key="3" className="bg-gray-200 p-4 rounded-3xl shadow">
//             Videos
//           </div>
//           <div key="4" className="bg-gray-200 p-4 rounded-3xl shadow">
//             Map
//           </div>
//         </GridLayout>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useCallback, SetStateAction } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { debounce } from "lodash";

export default function Home() {
  // Define the layout with square dimensions (w: width, h: height)
  const [layout, setLayout] = useState([
    { i: "1", x: 0, y: 0, w: 2, h: 2 },    // 1:1 square (500x500 pixels)
    { i: "2", x: 2, y: 0, w: 2, h: 1 },    // Rectangle (500x250 pixels)
    { i: "3", x: 0, y: 2, w: 1, h: 1 },    // 1:1 square (250x250 pixels)
    { i: "4", x: 1, y: 2, w: 1, h: 2 },    // Rectangle (250x500 pixels)
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

  // Width of each column = Total grid width / Number of columns
  const gridWidth = 800; // Set grid width (1000px in this case)
  const numCols = 4; // Define number of columns
  const rowHeight = gridWidth / numCols; // Ensure each row has the same height as a column's width

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
          cols={numCols} // Define grid columns (1 column = 250px if grid width is 1000px and cols=4)
          rowHeight={rowHeight} // Set row height equal to column width for 1:1 ratio
          width={gridWidth} // Total width of the grid
          onLayoutChange={onLayoutChange}
          isDraggable={true}
          isResizable={true}
          useCSSTransforms={true}
          margin={[20, 20]} // Margin between items
          compactType={"vertical"} // Disable auto-compaction
          preventCollision={true} // Prevent items from overlapping
        >
          <div key="1" className="bg-gray-200 p-4 rounded-3xl shadow">
            Social Media Links
          </div>
          <div key="2" className="bg-gray-200 p-4 rounded-3xl shadow">
            Photos
          </div>
          <div key="3" className="bg-gray-200 p-4 rounded-3xl shadow">
            Videos
          </div>
          <div key="4" className="bg-gray-200 p-4 rounded-3xl shadow">
            Map
          </div>
        </GridLayout>
      </div>
    </div>
  );
}

