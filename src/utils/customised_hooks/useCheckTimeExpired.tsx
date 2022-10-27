import { getMomentByDateAndTimeString, getCurrentMoment } from '../date/date.utils';
import {
    useState,
    useEffect
} from "react"

export const useCheckTimeExpired = ({
    startDate,
    startTime,
}) =>{
    const [isExpired, setIsExpired] = useState<Boolean>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    useEffect(()=>{
        let timer:any;
        setIsLoading(true);
        if(startTime && startDate){        
            const expiredTime = getMomentByDateAndTimeString(startDate, startTime);
            setIsLoading(false);
            const f = () =>{
                const currentTime = getCurrentMoment();
                const isExpired = currentTime.isAfter(expiredTime);
                setIsLoading(false);
                setIsExpired(isExpired);
                timer = setTimeout(f, 1000);
            }
            f();
        }
        return () => clearInterval(timer);
    },[startDate, startTime]);

    return {
        isExpired,
        isLoading,
    }
}