import React from 'react';
import bentoMap from "@/components/assets/bento map.png";
import bentoText from "@/components/assets/bento text.png";
import Image from 'next/image';
import FileUploadButton from "@/components/Dock/FileBtn"; // Ensure correct import

import AddLinkbtn from './AddLinkbtn';
import SaveChangesBtn from './SaveChangesBtn';
import SectionTileBtn from './SectionTileBtn';
import Tooltip from '../ui/tooltip';

const BentoDock = () => {
    return (
        <div className='w-[30%] h-14 px-6 border fixed bottom-14 left-12 shadow-2xl rounded-2xl'>
            <div className='w-full h-full rounded-2xl flex justify-between items-center'>
                {/* Add link button */}
                <Tooltip text={"add links"}><AddLinkbtn /></Tooltip>

                {/* Gallery button */}
                <Tooltip text={"upload Images/videos"}> <FileUploadButton /></Tooltip>


                {/* Text button */}
                <Tooltip text={"insert text card"}>
                    <button onClick={() => console.log('Text icon clicked')} className='h-8 w-8 overflow-hidden border shadow rounded-xl hover:scale-125 duration-500'>
                        <Image src={bentoText} alt='Text Icon' width={32} height={32} />
                    </button>
                </Tooltip>



                {/* Map button */}
                <Tooltip text={"add map"}>
                    <button onClick={() => console.log('Map icon clicked')} className='h-8 w-8 border overflow-hidden shadow rounded-xl hover:scale-125 duration-500'>
                        <Image src={bentoMap} alt='Map Icon' width={32} height={32} />
                    </button>
                </Tooltip>


                {/* section tile button */}
                <Tooltip text={"add section tile"}><SectionTileBtn /></Tooltip>



                {/* Save changes button */}
                <Tooltip text={"save changes"}><SaveChangesBtn /></Tooltip>


            </div>
        </div>
    );
};

export default BentoDock;