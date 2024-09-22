// Import the components

import TextCard from "@/components/TextCard";
import Websites from "@/components/Websites";
import Photo from "@/components/Photo";
import Video from "@/components/Video";
import Social from "@/components/Social";
import Map from "@/components/Map";
import LayoutItem from "@/utils/Types";
import SectionTile from "./SectionTile";

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
        case "sectionTile":
            return <SectionTile />
        default:
            return <div>Unknown Component Type</div>;
    }
};

export default renderComponent;