import React, { useState } from 'react';

export default function RegisterScreen() {

    const [ruc, setRuc] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ruc,
                business_name: businessName,
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="ruc" className="form-label">RUC:</label>
                    <input type="text" className="form-control" id="ruc" value={ruc} onChange={e => setRuc(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="businessName" className="form-label">Razon social:</label>
                    <input type="text" className="form-control" id="businessName" value={businessName} onChange={e => setBusinessName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="repeatPassword" className="form-label">Repetir contraseña:</label>
                    <input type="password" className="form-control" id="repeatPassword" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-info">Registrarse</button>
            </form>
        </div>
    )
}
