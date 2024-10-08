import React from 'react';
import FileUploadButton from "@/components/Dock/FileBtn"; // Ensure correct import

import AddLinkbtn from './AddLinkbtn';
import SaveChangesBtn from './SaveChangesBtn';
import SectionTileBtn from './SectionTileBtn';
import Tooltip from '../ui/tooltip';
import AddTextBtn from "@/components/Dock/AddTextBtn"
import AddMapBtn from "@/components/Dock/AddMapBtn"
const BentoDock = () => {
    return (
        <div className='w-[30%] h-14 px-6 border fixed bottom-14 left-12 shadow-2xl rounded-2xl'>
            <div className='w-full h-full rounded-2xl flex justify-between items-center'>
                {/* Add link button */}
                <Tooltip text={"add links"}>
                    <AddLinkbtn />
                </Tooltip>

                {/* Gallery button */}
                <Tooltip text={"upload Images/videos"}>
                    <FileUploadButton />
                </Tooltip>


                {/* Text button */}
                <Tooltip text={"insert text card"}>
                    <AddTextBtn />
                </Tooltip>



                {/* Map button */}
                <Tooltip text={"add map"}>
                    <AddMapBtn />
                </Tooltip>


                {/* section tile button */}
                <Tooltip text={"add section tile"}>
                    <SectionTileBtn />
                </Tooltip>



                {/* Save changes button */}
                <Tooltip text={"save changes"}>
                    <SaveChangesBtn />
                </Tooltip>


            </div>
        </div>
    );
};

export default BentoDock;