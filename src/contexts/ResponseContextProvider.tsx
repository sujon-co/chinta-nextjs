/* eslint-disable prefer-rest-params */
import React, { createContext, useContext, useEffect, useState } from 'react';

export const SizeContext = createContext({
    size: 6,
    width: 0,
    height: 0,
    isDesktop: true,
    isMobile: true,

});

interface IProps {
    children: React.ReactNode;
}

const SizeContextProvider = ({ children }: IProps) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [size, setSize] = useState<number>(6);
    const [isMobile, setIsMobile] = useState<boolean>(true);
    const [isDesktop, setIsDesktop] = useState<boolean>(true);

    function debounce(fn: any, ms: any) {
        let timer: any;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                // @ts-ignore
                fn.apply(this, arguments);
            }, ms);
        };
    }

    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            setWidth(window.innerWidth);
        }, 0);

        setHeight(window.innerHeight);

        window.addEventListener('resize', debouncedHandleResize);

        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, []);

    useEffect(() => {
        if (width <= 575) {
            setSize(3);
            setIsMobile(true);
            setIsDesktop(false);
        } else if (width >= 576 && width < 767) {
            setSize(3);
            setIsMobile(true);
            setIsDesktop(false);
        } else if (width >= 768 && width < 991) {
            setSize(4);
            setIsMobile(false);
            setIsDesktop(true);
        } else if (width >= 992 && width < 1199) {
            setSize(6);
            setIsMobile(false);
            setIsDesktop(true);
        } else {
            setSize(6);
            setIsMobile(false);
            setIsDesktop(true);
        }
    }, [width]);

    return (
        // @ts-ignore
        <SizeContext.Provider value={{ size, width, isDesktop, isMobile, height }}>
            {children}
        </SizeContext.Provider>
    );
};

export const useSizeContext = () => useContext(SizeContext);

export default SizeContextProvider;
