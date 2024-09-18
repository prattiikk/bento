"use client"
import { SetStateAction, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function Home() {
  // Define layout with component sizes in grid units (500px = 1 grid unit)
  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 1, h: 1 },  // 500x500 pixels
    { i: '2', x: 1, y: 0, w: 0.5, h: 1 }, // 500x250 pixels
    { i: '3', x: 0, y: 1, w: 0.5, h: 0.5 }, // 250x250 pixels
    { i: '4', x: 0.5, y: 1, w: 1, h: 0.5 }, // 500x250 pixels
  ]);

  const onLayoutChange = (newLayout: SetStateAction<{ i: string; x: number; y: number; w: number; h: number; }[]>) => {
    setLayout(newLayout);
    // This is where you would send the new layout to the backend.
  };

  return (
    <div className="container mx-auto p-4">
      <GridLayout
        className="layout"
        layout={layout}
        cols={1}  // Only 1 column since the entire screen is one big block
        rowHeight={500}  // Row height in pixels (one block height)
        width={500}  // Total width in pixels (one block width)
        onLayoutChange={onLayoutChange}
        // Enable resizing and dragging
        isDraggable={true}
        isResizable={true}
        // Define the resize constraints based on possible component sizes
        resizeHandles={['se', 'sw', 'ne', 'nw']}
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
  );
}