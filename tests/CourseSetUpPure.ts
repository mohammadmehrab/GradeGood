export function daysAndTimeChecks(start: string, end: string, days: string[]): boolean {
    const toInteger = (time: string): number => {
        const [hour, minutes] = time.split(":");
        const h = parseInt(hour,10);
        const m = parseInt(minutes,10);
        return h * 60 + m;
    }
    const timeRange = toInteger(end) - toInteger(start);
    if (days.length === 0 || days.length > 3){
        return false;
    }
    else{
        if (timeRange < 60 || timeRange > 180 || timeRange === 0){
            return false
        }    
    }
    return true;
}