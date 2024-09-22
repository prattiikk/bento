import React from 'react';
import bentoMap from "@/components/assets/bento map.png";
import bentoText from "@/components/assets/bento text.png";
import Image from 'next/image';
import FileUploadButton from "@/components/FileBtn"; // Ensure correct import

import AddLinkbtn from './AddLinkbtn';
import SaveChangesBtn from './SaveChangesBtn';
import SectionTileBtn from './SectionTileBtn';

const BentoDock = () => {
    return (
        <div className='w-[30%] h-14 px-6 border fixed bottom-14 left-12 shadow-2xl rounded-2xl'>
            <div className='w-full h-full rounded-2xl flex justify-between items-center'>
                {/* Add link button */}
                <AddLinkbtn />

                {/* Gallery button */}
                <FileUploadButton />


                {/* Text button */}
                <button onClick={() => console.log('Text icon clicked')} className='h-8 w-8 overflow-hidden border shadow rounded-xl hover:scale-125 duration-500'>
                    <Image src={bentoText} alt='Text Icon' width={32} height={32} />
                </button>

                {/* Map button */}
                <button onClick={() => console.log('Map icon clicked')} className='h-8 w-8 border overflow-hidden shadow rounded-xl hover:scale-125 duration-500'>
                    <Image src={bentoMap} alt='Map Icon' width={32} height={32} />
                </button>

                {/* section tile button */}
                <SectionTileBtn />

                {/* Save changes button */}
                <SaveChangesBtn />
            </div>
        </div>
    );
};

export default BentoDock;