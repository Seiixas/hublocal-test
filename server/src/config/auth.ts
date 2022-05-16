import 'dotenv/config';

const secret = process.env.JWT_TOKEN;
const expiresIn = '1h';

export { secret, expiresIn };
