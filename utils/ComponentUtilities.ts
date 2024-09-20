import axios from "axios";
import LayoutItem from "./Types";


interface FetchLayoutParams {
    setLayout: (layout: LayoutItem[]) => void;
    setInitialLoad: (value: boolean) => void;
}

export function fetchLayout({ setLayout, setInitialLoad }: FetchLayoutParams) {
    axios.get("http://localhost:3000/api/user/test")
        .then(response => {
            console.log("Fetched layout data:", response.data);
            setLayout(response.data.layout); // Assuming response.data.layout is of type LayoutItem[]
            setInitialLoad(false);
        })
        .catch(error => {
            console.error("There was an error fetching the user data!", error);
        });
}



export const saveChanges = async (
    layout: LayoutItem[],
    setUnsavedChanges: (value: boolean) => void
) => {
    try {
        const response = await axios.post('http://localhost:3000/api/updateLayout', layout);

        if (response.status === 200) {
            console.log('Server response:', response.data);
            setUnsavedChanges(false); // Reset unsaved changes flag
        } else {
            console.error('Unexpected response status:', response.status);
        }
    } catch (error) {
        console.error('Error sending update to server:', error);
        // Optionally, show user feedback here
    }
};


const getComponentTypeFromURL = (url: string): string => {
    // Always return 'website' for now
    return 'website';
};


export const addComponentFromURL = (
    layout: LayoutItem[],
    url: string,
    newItemIndex: number,
    setLayout: (layout: LayoutItem[]) => void,
    setNewItemIndex: (value: number) => void,
    setUnsavedChanges: (value: boolean) => void
) => {
    const type = getComponentTypeFromURL(url);

    const gridWidth = 940;
    const numCols = 4;
    const rowHeight = 180;

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

        setLayout((prevLayout: any) => {
            const updatedLayout = [...prevLayout, newItem];
            setNewItemIndex((prevIndex: number) => prevIndex + 1);
            setUnsavedChanges(true); // Set unsaved changes flag
            return updatedLayout;
        });
    } else {
        console.error('Unknown URL type');
    }
};





