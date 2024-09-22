
export default interface LayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    type: "socialMediaLinks" | "image" | "video" | "map" | "text" | "website" | "sectionTile";
    data: any;
}
