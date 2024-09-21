import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState } from '@/store/layoutStore';
import axios from 'axios';
import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const SaveChangesBtn = () => {
    const [unsavedChanges, setUnsavedChanges] = useRecoilState(GlobalLayoutUnsavedChangesRecState);

    // Access global layout state 
    const layout = useRecoilValue(GlobalLayoutRecState);



    const saveChanges = async () => {



        try {
            // Make API request to save layout changes
            const response = await axios.post('http://localhost:3000/api/updateLayout', layout);

            if (response.status === 200) {
                console.log('Server response:', response.data);

                // Reset the unsavedChanges flag to false since changes are saved
                setUnsavedChanges(false);
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error sending update to server:', error);
            // Optionally, handle error feedback for the user
        }
    };

    return (
        <div>
            <button
                onClick={() => saveChanges()}
                disabled={!unsavedChanges}
                className={`h-8 w-auto text-xs px-2 text-nowrap flex justify-center shadow items-center border rounded-xl hover:scale-110 duration-500 ${!unsavedChanges ? 'opacity-50 cursor-not-allowed' : ' bg-green-400 text-white font-semibold'}`}
            >
                Save Changes
            </button>
        </div>
    )
}

export default SaveChangesBtn