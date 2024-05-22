import { verifyPassword, verifyToken } from '@/utils/auth';
import connectDB from '@/utils/connectDB';
import User from '@/models/User';

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

  const { token } = req.cookies;
  const { name, lastName, password } = req.body.data;
  const secretKey = process.env.SECRET_KEY;

  switch (req.method) {
    case 'POST':
      try {
        // check to see token exist
        if (!token) {
          return res
            .status(401)
            .json({ status: 'failed', message: 'you are not logged in' });
        }

        // verify token
        const tokenVerifyResult = verifyToken(token, secretKey);

        // check to see if token is correct
        if (!tokenVerifyResult) {
          return res
            .status(401)
            .json({ status: 'failed', message: 'unAthorized' });
        }

        // find user base on token
        const user = await User.findOne({ email: tokenVerifyResult.email });

        if (!user) {
          return res
            .status(404)
            .json({ status: 'failed', message: 'user not found' });
        }

        // check for valid data
        if (!name || !lastName || !password) {
          return res
            .status(422)
            .json({ status: 'failed', message: 'invalid user credential' });
        }

        // comparing passwords
        const isValid = await verifyPassword(password, user.password);

        // check for valid password
        if (!isValid) {
          return res.status(422).json({
            status: 'failed',
            message: 'password is inCorrect',
          });
        }

        user.name = name;
        user.lastName = lastName;
        await user.save();
        res.status(200).json({
          status: 'success',
          message: 'user updated successfully',
          user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
          },
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: 'failed', message: 'failed to create user' });
      }
  }
}
