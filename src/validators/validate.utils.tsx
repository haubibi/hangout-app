import { getTextWidth } from "../utils/text/test.utils";


export interface IValidatorResult {
    isValid: boolean;
    message: string;
}




export const validateInputString = (name: string) =>  /^[A-Za-z\s]+$/.test(name);
export const validateStringLength= (name: string, maxlength: number) =>  name.length < maxlength;
export const validatePassword = (password: string) => password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);

/**
 * 
 * @param text text
 * @param maxWidth max width of the text
 * @param font font of the text
 * 
 * return boolean
 */
export const ifTextWidthValid = (
    text: string,
    maxWidth: number,
    font: string
):boolean => {
    console.log("font",  font)
    console.log("text width:",  getTextWidth(text, font))
    return getTextWidth(text, font) < maxWidth;
}