import * as argon2 from 'argon2';

export const hashPassword = async (rawPass: string): Promise<string> => {
  try {
    const pass = await argon2.hash(rawPass);
    return pass;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const validatePassword = async (
  enteredPass: string,
  hashedPass: string
): Promise<boolean> => {
  try {
    return await argon2.verify(hashedPass, enteredPass);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
