// import React, { useState, ChangeEvent, KeyboardEvent, FocusEvent } from 'react';

// interface RowTitleProps {
//     title: string;
//     onChange: (newTitle: string) => void; // Callback to handle title change
// }

// const RowTitle: React.FC<RowTitleProps> = ({ title, onChange }) => {

//     const [isEditing, setIsEditing] = useState(false);
//     const [currentTitle, setCurrentTitle] = useState(title);

//     const handleDoubleClick = () => {
//         setIsEditing(true);
//     };

//     const handleBlur = () => {
//         setIsEditing(false);
//         onChange(currentTitle);
//     };

//     const handleKeyDown = (e: { key: string; }) => {
//         if (e.key === 'Enter') {
//             setIsEditing(false);
//             onChange(currentTitle);
//         }
//     };

//     return (
//         <div
//             className="w-full h-full flex items-center px-4 bg-gray-100 cursor-move"
//             style={{ height: '40px' }} // Set a custom height here
//             onDoubleClick={handleDoubleClick}
//         >
//             {isEditing ? (
//                 <input
//                     type="text"
//                     value={currentTitle}
//                     onChange={(e) => setCurrentTitle(e.target.value)}
//                     onBlur={handleBlur}
//                     onKeyDown={handleKeyDown}
//                     className="w-full p-1 text-lg font-semibold"
//                     style={{ height: '30px' }} // Adjust input height to fit within the row
//                     autoFocus
//                 />
//             ) : (
//                 <h3 className="text-lg font-semibold">{currentTitle}</h3>
//             )}
//         </div>
//     );
// };

// export default RowTitle;