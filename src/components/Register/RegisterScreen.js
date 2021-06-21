import axios from 'axios';
import React, { useState } from 'react';

import './RegisterScreen.css'

export default function RegisterScreen({ history }) {

    const [ruc, setRuc] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const bearerToken = localStorage.getItem('bearer-token');
        axios.post('/api/v1/auth/signup', {
            ruc,
            business_name: businessName,
            email,
            password
        }, { headers: { authorization: bearerToken } }).then(res => {
            history.replace('/signin');
        }).catch(console.error);
    };

    return (
        <div className="card mx-auto">
            <div className="card-body">
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
                    <div className="mb-3">
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
        </div>
    )
}
