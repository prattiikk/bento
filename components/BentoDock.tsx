
import React from 'react';
import bentoGallery from "@/components/assets/bento galllery.png";
import bentoMap from "@/components/assets/bento map.png";
import bentoText from "@/components/assets/bento text.png";
import Image from 'next/image';

const BentoDock = () => {
    // Handlers for the click events
    const handleLinkClick = () => {
        console.log('Link icon clicked');
    };

    const handleImagesClick = () => {
        console.log('Images icon clicked');
    };

    const handleALargeSmallClick = () => {
        console.log('ALargeSmall icon clicked');
    };

    const handleMapPinnedClick = () => {
        console.log('MapPinned icon clicked');
    };

    return (
        <div className='w-[25%]  h-14 px-6 border fixed bottom-4 shadow-lg rounded-2xl'>
            <div className='w-full h-full rounded-2xl flex justify-between items-center'>

                {/* link */}
                <button onClick={handleLinkClick} className='h-8 w-8 p-2 border shadow  rounded-xl hover:scale-125 duration-500'>
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.95034 13.8492C5.12191 15.0208 7.02141 15.0208 8.19298 13.8492L9.6072 12.435C9.99772 12.0445 10.6309 12.0445 11.0214 12.435C11.4119 12.8256 11.4119 13.4587 11.0214 13.8492L9.6072 15.2635C7.65457 17.2161 4.48875 17.2161 2.53613 15.2635C0.583506 13.3108 0.583507 10.145 2.53613 8.19239L3.95034 6.77817C4.34087 6.38765 4.97403 6.38765 5.36455 6.77817C5.75508 7.1687 5.75508 7.80186 5.36455 8.19239L3.95034 9.6066C2.77877 10.7782 2.77877 12.6777 3.95034 13.8492ZM12.4356 9.6066L13.8498 8.19239C15.0214 7.02082 15.0214 5.12132 13.8498 3.94975C12.6783 2.77817 10.7788 2.77817 9.6072 3.94975L8.19298 5.36396C7.80246 5.75449 7.16929 5.75449 6.77877 5.36396C6.38824 4.97344 6.38824 4.34027 6.77877 3.94975L8.19298 2.53553C10.1456 0.582913 13.3114 0.582913 15.264 2.53553C17.2167 4.48816 17.2167 7.65398 15.264 9.6066L13.8498 11.0208C13.4593 11.4113 12.8261 11.4113 12.4356 11.0208C12.0451 10.6303 12.0451 9.99713 12.4356 9.6066ZM11.7285 7.48528C12.119 7.09476 12.119 6.46159 11.7285 6.07107C11.338 5.68054 10.7048 5.68054 10.3143 6.07107L6.07166 10.3137C5.68114 10.7042 5.68114 11.3374 6.07166 11.7279C6.46219 12.1184 7.09535 12.1184 7.48588 11.7279L11.7285 7.48528Z" fill="currentColor"></path></svg>
                </button>
                {/* gallery */}
                <button onClick={handleImagesClick} className='h-8 w-8 overflow-hidden border shadow  rounded-xl hover:scale-125 duration-500'>
                    <Image src={bentoGallery} alt="Gallery Icon" width={32} height={32} />
                </button>
                {/* text */}
                <button onClick={handleALargeSmallClick} className='h-8 w-8 overflow-hidden border shadow  rounded-xl hover:scale-125 duration-500'>
                    <Image src={bentoText} alt='Text Icon' width={32} height={32} />
                </button>
                {/* map */}
                <button onClick={handleMapPinnedClick} className='h-8 w-8 border overflow-hidden shadow  rounded-xl hover:scale-125 duration-500'>
                    <Image src={bentoMap} alt='Map Icon' width={32} height={32} />
                </button>

                {/* section tile */}
                <button onClick={handleMapPinnedClick} className='h-8 w-8 flex justify-center shadow items-center border  rounded-xl hover:scale-125 duration-500'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="12" width="7" height="8" rx="3" fill="#E3E3E3"></rect><rect x="4.5" y="12.5" width="6" height="7" rx="2.5" stroke="black" stroke-opacity="0.08"></rect><rect x="13" y="12" width="7" height="8" rx="3" fill="#E3E3E3"></rect><rect x="13.5" y="12.5" width="6" height="7" rx="2.5" stroke="black" stroke-opacity="0.08"></rect><rect x="4" y="4" width="12" height="5" rx="2.5" fill="url(#paint0_linear_7289_21481)"></rect><defs><linearGradient id="paint0_linear_7289_21481" x1="10" y1="4" x2="10" y2="9" gradientUnits="userSpaceOnUse"><stop stop-color="#5B5B5B"></stop><stop offset="1"></stop></linearGradient></defs></svg>
                </button>

                {/* section tile */}
                <button onClick={handleMapPinnedClick} className='h-8 w-auto text-xs px-2 text-nowrap flex justify-center shadow items-center border rounded-xl hover:scale-110 duration-500'>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default BentoDock;