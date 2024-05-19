const { hash, compare } = require('bcryptjs');

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password, hashedPass) {
  const isValid = await compare(password, hashedPass);
  return isValid;
}
export { hashPassword, verifyPassword };
