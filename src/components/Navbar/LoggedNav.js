import React from 'react'
import { Link } from 'react-router-dom'

export default function LoggedNav({ businessName, handleSignOut }) {
    return (
        <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/clientes">Clientes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/carteras/form">Registrar Cartera</Link>
                </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/">¡Bienvenido {businessName}!</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={handleSignOut}>Salir</Link>
                </li>
            </ul>
        </>
    )
}
