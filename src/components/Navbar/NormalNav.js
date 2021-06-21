import React from 'react'
import { Link } from 'react-router-dom'

export default function NormalNav() {
    return (
        <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/enunciado">Enunciado</Link>
                </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/signin">Iniciar Sesión</Link>
                </li>
            </ul>
        </>
    )
}
