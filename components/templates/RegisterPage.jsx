
import React, { useState } from 'react'

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const saveHandler = async () => {
        const res = await fetch('/api/user/register', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": 'application/json' }
        });

        const data = await res.json();
        console.log(data);
        setEmail('')
        setPassword('')
    }
    return (
        <div className='form-container'>
            <h3>Registration form</h3>
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

            <button className='btn' onClick={saveHandler}>Register</button>
        </div>
    )
}

export default RegisterPage