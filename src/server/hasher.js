import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;
const TOKEN_EXPIRATION = 60 * 60;
const TOKEN_SECRET = 'hola';

// export const makeHash = value => bcrypt.hashSync

export const matchHash = (plain, hash) => bcrypt.compareSync(plain, hash);

export const createToken = data =>
  jwt.sign(data, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION
  });
