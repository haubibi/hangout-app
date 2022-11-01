import { useState, useEffect, useCallback } from 'react';
export const useBodyWidth = () => {
    const [bodyWidth, setBodyWidth] = useState<string>();
    const [direction, setDirection] = useState<'left'|'right'>();
    const setWidth = useCallback(()=>{
        let bodyWidth:string;
        // if(windowWidth <= maxWidth){
        if(document.body.scrollWidth <= window.innerWidth ){
            bodyWidth = 'auto';
        } else {
            bodyWidth = document.body.scrollWidth + "px";
        }
        setBodyWidth(bodyWidth);
    },[]);

    useEffect(()=>{
        const timer = setInterval(setWidth, 10);
        return () => {clearInterval(timer)}
    },[setWidth]);
    useEffect(()=>{
        setWidth();
    },[setWidth]);

    return {
        bodyWidth,
    }
};