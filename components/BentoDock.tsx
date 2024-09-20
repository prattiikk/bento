import React, { useState } from 'react';
import bentoGallery from "@/components/assets/bento galllery.png";
import bentoMap from "@/components/assets/bento map.png";
import bentoText from "@/components/assets/bento text.png";
import Image from 'next/image';


import AddLinkbtn from './AddLinkbtn';
import SaveChangesBtn from './SaveChangesBtn';

const BentoDock = () => {



    return (
        <div className='w-[25%] h-14 px-6 border fixed bottom-4 shadow-lg rounded-2xl'>
            <div className='w-full h-full rounded-2xl flex justify-between items-center'>
                {/* add link btn */}
                <AddLinkbtn />

                {/* gallery button */}
                <button onClick={() => console.log('Images icon clicked')} className='h-8 w-8 overflow-hidden border shadow  rounded-xl hover:scale-125 duration-500'>
                    <Image src={bentoGallery} alt="Gallery Icon" width={32} height={32} />
                </button>
                {/* text button */}
                <button onClick={() => console.log('Text icon clicked')} className='h-8 w-8 overflow-hidden border shadow  rounded-xl hover:scale-125 duration-500'>
                    <Image src={bentoText} alt='Text Icon' width={32} height={32} />
                </button>
                {/* map button */}
                <button onClick={() => console.log('Map icon clicked')} className='h-8 w-8 border overflow-hidden shadow  rounded-xl hover:scale-125 duration-500'>
                    <Image src={bentoMap} alt='Map Icon' width={32} height={32} />
                </button>

                {/* save changes button */}
                <SaveChangesBtn />
            </div>
        </div>
    );
};

export default BentoDock;