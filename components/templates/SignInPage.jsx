import { useRouter } from 'next/router';
import React, { useState } from 'react'

const SignInPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const saveHandler = async () => {
        const res = await fetch('/api/user/signIn', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": 'application/json' }
        });

        const data = await res.json();
        console.log(data);
        if (data.status === 'success') {
            router.push('/')
        }
        setEmail('')
        setPassword('')
    }

    return (
        <div className='form-container'>
            <h3>Sign In</h3>
            <div className='form-group' >
                <input
                    placeholder='Email'
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='form-group'>
                <input
                    placeholder='Password'
                    type="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

            </div>

            <button className='btn' onClick={saveHandler}>Sign In</button>
        </div>
    )
}

export default SignInPage