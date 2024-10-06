import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState } from '@/store/layoutStore';
import axios from 'axios';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const SaveChangesBtn = () => {
    const [unsavedChanges, setUnsavedChanges] = useRecoilState(GlobalLayoutUnsavedChangesRecState);
    const layout = useRecoilValue(GlobalLayoutRecState);

    const saveChanges = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/updateLayout', layout);

            if (response.status === 200) {
                console.log('Server response:', response.data);
                setUnsavedChanges(false);
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error sending update to server:', error);
        }
    };

    return (
        <div>
            <button
                onClick={saveChanges}
                disabled={!unsavedChanges}
                className={`h-8 w-auto text-xs px-2 text-nowrap flex justify-center shadow items-center border rounded-xl 
                    ${!unsavedChanges ? 'opacity-50 cursor-not-allowed' : 'bg-green-400 scale-105 duration-700 text-white font-semibold'} 
                    ${unsavedChanges ? 'throb' : ''}`} // Add throb class conditionally
            >
                Save Changes
            </button>
        </div>
    );
};

export default SaveChangesBtn;
