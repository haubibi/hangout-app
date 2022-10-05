/**
 * 
 * @param text text string
 * @param font font type
 * return width of the text
 */
export const getTextWidth = (
    text: string, 
    font: string
): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font || getComputedStyle(document.body).font;
    return context.measureText(text).width;
}