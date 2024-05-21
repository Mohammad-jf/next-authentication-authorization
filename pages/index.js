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
      <button className='btn'>
        <Link href='/dashboard'>Admin Panel</Link>
      </button>
      <button className='btn'>
        <Link href='/users/register'>Sign Up</Link>
      </button>
      <button className='btn'>
        <Link href='/users/signIn'>Sign In</Link>
      </button>
      <button className='btn' onClick={signOutHandler}>
        Sign Out
      </button>
    </>
  );
}
