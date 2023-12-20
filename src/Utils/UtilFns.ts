import { DEBUG_FLAG } from "../Game/GameManager";

/*
 * Return a at-most 2 decimal number for better display formation. 
 */
export function DisplayNumber(num: number): string {
    let tmp: string = num.toString();
    if (tmp.includes(".")) {
        if (tmp.charAt(tmp.length - 2) == '.') {
            return tmp;
        } else {
            return (Math.round(num * 100) / 100).toFixed(2);
        }
    } else {
        return tmp;
    }
}

export function DebugLogger(message: any) {
    if (DEBUG_FLAG) {
        console.log(message);
    }
}