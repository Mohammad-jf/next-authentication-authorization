import Link from 'next/link';

export default function Home() {
  const signOutHandler = async () => {
    const res = await fetch('/api/user/signout', {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <h3>Authentication In Next.js Applications</h3>
      <div className='btn-group'>
        <Link href='/dashboard'>
          <button className='btn'>Dashboard</button>
        </Link>
        <Link href='/users/register'>
          <button className='btn'>Sign Up</button>
        </Link>
        <Link href='/users/signIn'>
          <button className='btn'>Sign In</button>
        </Link>
        <button className='btn' onClick={signOutHandler}>
          Log Out
        </button>
      </div>
    </>
  );
}
