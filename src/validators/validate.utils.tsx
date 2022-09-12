export const validateInputString = (name: string) =>  /^[A-Za-z\s]+$/.test(name);
export const validateStringLength= (name: string, maxlength: number) =>  name.length < maxlength;
export const validatePassword = (password: string) => password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);


