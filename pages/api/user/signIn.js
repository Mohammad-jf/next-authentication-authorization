import User from '@/models/User';
import { hashPassword, verifyPassword } from '@/utils/auth';
import connectDB from '@/utils/connectDB';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 'failed', message: 'Db connection failed' });
  }

  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60; //24 hours in seconds

  switch (req.method) {
    case 'POST':
      try {
        // check for valid data
        if (!email || !password) {
          return res
            .status(422)
            .json({ status: 'failed', message: 'invalid user credential' });
        }

        // check to see user exist or not
        const user = await User.findOne({ email: email });
        if (!user) {
          return res
            .status(404)
            .json({ status: 'failed', message: 'user doesnt exist' });
        }

        // comparing passwords
        const isValid = await verifyPassword(password, user.password);

        // check for valid password
        if (!isValid) {
          return res.status(422).json({
            status: 'failed',
            message: 'email or password is inCorrect',
          });
        }

        // create jwt token
        const token = sign({ email }, secretKey, { expiresIn: expiration });


        // initilize cookie info
        const serialized = serialize('token', token, {
          // just access in server
          httpOnly: true,
          maxAge: expiration,
          path: '/',
        });

        // send res and set http only cookie
        return res.status(200).setHeader('Set-Cookie', serialized).json({
          status: 'success',
          message: 'Logged in successfully',
          email,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: 'failed', message: 'failed to create user' });
      }
  }
}
