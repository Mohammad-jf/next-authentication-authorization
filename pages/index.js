import Link from 'next/link';
import { useEffect, useState } from 'react';
import { verifyToken } from '@/utils/auth';

export default function Home({ isLogged }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isLogged);

  const signOutHandler = async () => {
    const res = await fetch('/api/user/signout', {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log(data);
    setIsLoggedIn(false);
  };

  // useEffect(() => {
  //   fetch('/api/user')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === 'success') {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     });
  // }, []);

  return (
    <>
      <h3>Authentication In Next.js Applications</h3>
      <div className='btn-group'>
        {isLoggedIn && (
          <>
            <Link href='/dashboard'>
              <button className='btn'>Dashboard</button>
            </Link>
            <button className='btn' onClick={signOutHandler}>
              Log Out
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link href='/users/register'>
              <button className='btn'>Sign Up</button>
            </Link>
            <Link href='/users/signIn'>
              <button className='btn'>Sign In</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;
  const tokenVerifyResult = verifyToken(token, secretKey);

  if (!tokenVerifyResult) {
    return {
      props: {
        isLogged: false,
      },
    };
  }

  return {
    props: {
      isLogged: true,
    },
  };
}
