import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const DashBoardPage = () => {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/user').then((res) => res.json()).then((data) => {
      if (data.status !== 'success') {
        router.push('/users/signIn')
      }
    })
  }, []);

  return (
    <div>DashBoardPage</div>
  )

}

export default DashBoardPage