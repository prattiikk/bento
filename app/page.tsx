"use client";
import { useState, useCallback, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
// import { debounce } from "lodash";
import axios from "axios";

// Import the components
import Photo from "@/components/Photo";
import Video from "@/components/Video";
import Social from "@/components/Social";
import Map from "@/components/Map";
import ProfileSection from "@/components/ProfileSection";
import TextCard from "@/components/TextCard";
import Websites from "@/components/Websites"
interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: "socialMediaLinks" | "image" | "video" | "map" | "text" | "website"; // Define possible types
  data: any; // Adjust this to be more specific if possible
}

export default function Home() {
  const [layout, setLayout] = useState<LayoutItem[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/user/test")
      .then(response => {
        console.log("Fetched layout data:", response.data);
        setLayout(response.data.layout);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  // const onLayoutChange = useCallback(
  //   debounce(
  //     (newLayout: LayoutItem[]) => {
  //       console.log("Layout changed:", newLayout);
  //       setLayout(newLayout);
  //     },
  //     300
  //   ),
  //   []
  // );

  const gridWidth = 940;
  const numCols = 4;
  const rowHeight = gridWidth / numCols;

  const renderComponent = (item: LayoutItem) => {
    console.log(item.type)
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
        return <Websites url={item.data.url} />
      default:
        return <div>Unknown Component Type</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <div className="w-1/3 p-4 h-screen">

        <ProfileSection />

      </div>

      {/* Right draggable/resizable grid */}
      <div className="flex-grow w-2/3 p-4">
        <GridLayout
          className="layout"
          layout={layout}
          cols={numCols}
          rowHeight={rowHeight}
          width={gridWidth}
          // onLayoutChange={onLayoutChange}
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
              className="bg-gray-200 overflow-hidden rounded-3xl shadow"
            >
              {renderComponent(item)}
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
}