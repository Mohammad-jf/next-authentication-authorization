import { verifyToken } from '@/utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') return;
  const secretKey = process.env.SECRET_KEY;

  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ status: 'failed', message: 'you are not logged in' });
  }

  const tokenVerifyResult = verifyToken(token, secretKey);

  if (tokenVerifyResult) {
    res.status(200).json({ status: 'success', data: tokenVerifyResult });
  } else {
    res.status(401).json({ status: 'failed', message: 'unAthorized' });
  }
}
