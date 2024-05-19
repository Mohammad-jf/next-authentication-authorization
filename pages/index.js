import Link from 'next/link';

export default function Home() {
  return (
    <>
      <button className='btn'>
        <Link href='/users/register'>Sign Up</Link>
      </button>
    </>
  )
}
