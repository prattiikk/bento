"use client";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import axios from "axios";

// Import the components
import Photo from "@/components/Photo";
import Video from "@/components/Video";
import Social from "@/components/Social";
import Map from "@/components/Map";
import ProfileSection from "@/components/ProfileSection";
import TextCard from "@/components/TextCard";
import Websites from "@/components/Websites";

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: "socialMediaLinks" | "image" | "video" | "map" | "text" | "website";
  data: any;
}

export default function Home() {
  const [layout, setLayout] = useState<LayoutItem[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [newItemIndex, setNewItemIndex] = useState<number>(0); // Initialize index
  const [url, setUrl] = useState(""); // State for URL input

  useEffect(() => {
    axios.get("http://localhost:3000/api/user/test")
      .then(response => {
        console.log("Fetched layout data:", response.data);
        setLayout(response.data.layout);
        setInitialLoad(false); // Set flag to false after initial load
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  const getComponentTypeFromURL = (url: string): string => {
    // Always return 'website' for now
    return 'website';
  };

  const addComponentFromURL = (url: string) => {
    const type = getComponentTypeFromURL(url);

    if (type) {
      let x = 0;
      let y = 0;

      if (layout.length > 0) {
        const lastItem = layout[layout.length - 1];
        x = (lastItem.x + lastItem.w + 1) % numCols;
        y = (lastItem.y + Math.floor((lastItem.x + lastItem.w) / numCols)) * rowHeight;
      }

      const newItem: LayoutItem = {
        i: String(newItemIndex),
        x,
        y,
        w: 2,
        h: 2,
        type,
        data: { url }
      };

      setLayout(prevLayout => {
        const updatedLayout = [...prevLayout, newItem];
        setNewItemIndex(prevIndex => prevIndex + 1);
        return updatedLayout;
      });

      axios.post('http://localhost:3000/api/updateLayout', [...layout, newItem])
        .then(response => console.log('Layout updated successfully'))
        .catch(error => console.error('Error updating layout:', error));
    } else {
      console.error('Unknown URL type');
    }
  };

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

    setLayout(updatedItems);
    sendUpdateToServer(updatedItems);
  };

  const sendUpdateToServer = async (updatedItems: LayoutItem[]) => {
    try {
      const response = await axios.post('http://localhost:3000/api/updateLayout', updatedItems);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending update to server:', error);
    }
  };

  const gridWidth = 940;
  const numCols = 4;
  const rowHeight = 180;

  const renderComponent = (item: LayoutItem) => {
    switch (item.type) {
      case "socialMediaLinks":
        return <Social url={item.data.url} platform={item.data.platform} />;
      case "text":
        return <TextCard cont={item.data.content} />;
      case "image":
        return <Photo src={item.data.url} alt={item.data.alt} />;
      case "video":
        return <Video src={item.data.url} />;
      case "map":
        return <Map latitude={item.data.latitude} longitude={item.data.longitude} zoom={item.data.zoom} />;
      case "website":
        return <Websites url={item.data.url} />;
      default:
        return <div>Unknown Component Type</div>;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleAddComponent = () => {
    if (url) {
      addComponentFromURL(url);
      setUrl(""); // Clear input after adding
    } else {
      console.error('URL cannot be empty');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 h-screen">
        <ProfileSection />
      </div>
      <div className="flex-grow w-2/3 p-4">
        <div className="mb-4">
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL"
            className="border p-2 w-full rounded"
          />
          <button
            onClick={handleAddComponent}
            className="bg-blue-500 text-white p-2 mt-2 rounded"
          >
            Add Component
          </button>
        </div>
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