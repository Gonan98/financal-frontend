import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import './LoginScreen.css';

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('bearer-token', data.token)
                console.log('Se guardó el token en el localStorage');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-info">Iniciar Sesion</button>
            </form>
            <br />
            <p>¿No tiene una cuenta? <Link to="/signup">Regístrese aquí</Link></p>
        </div>
    );
}
