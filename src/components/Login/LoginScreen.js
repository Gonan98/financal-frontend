import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function LoginScreen({ history }) {

    const { setLogged } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/v1/auth/signin', {
            email,
            password
        }).then(res => {
            axios.defaults.headers.common['authorization'] = res.data.token;
            localStorage.setItem('bearer-token', res.data.token);
            setLogged(true);
            history.replace('/');
        }).catch(console.error);
    };

    return (
        <div className="card mx-auto" style={{ width: '20rem' }}>
            <div className="card-body">
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
        </div>
    );
}
