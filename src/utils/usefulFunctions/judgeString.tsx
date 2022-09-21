export const patternChinese = new RegExp("[\u4E00-\u9FA5]+");
export const patternCharacter= new RegExp("[A-Za-z]+");


export const checkIsChinese = (str:string): boolean => patternChinese.test(str);