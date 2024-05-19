import User from '@/models/User';
import { hashPassword } from '@/utils/auth';
import connectDB from '@/utils/connectDB';

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
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
          return res
            .status(422)
            .json({ status: 'failed', message: 'user already exist' });
        }

        // hash password with bcrypt
        const hashedPass = await hashPassword(password);

        // creating new user
        const newUser = await User.create({
          email: email,
          password: hashedPass,
        });
        res.status(201).json({
          status: 'success',
          message: 'user created',
          data: newUser,
        });


        
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: 'failed', message: 'failed to create user' });
      }
  }
}
