"use client"
import React, { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface WrapperProps {
    children: ReactNode; // Accept children as props
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <RecoilRoot>
            {children} {/* Render the children */}
        </RecoilRoot>
    );
};

export default Wrapper;
