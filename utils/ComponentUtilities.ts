// import axios from "axios";
// import LayoutItem from "./Types";

// // recoil states
// import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
// import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState, newLayoutItemIndexRecState } from '@/store/layoutStore';


// // interface FetchLayoutParams {
// //     setLayout: (layout: LayoutItem[]) => void;
// //     setInitialLoad: (value: boolean) => void;
// // }

import axios from "axios";
import LayoutItem from "./Types";

export async function makeUpdateCall(layout: LayoutItem[]) {
    try {
        await axios.post("http://localhost:3000/api/user", { data: layout });
        console.log("Layout updated successfully");
    } catch (error: any) {
        console.error("Error updating layout:", error.response?.data || error.message);
    }
}