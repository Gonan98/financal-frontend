import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

import NormalNav from './NormalNav';
import LoggedNav from './LoggedNav';
import axios from 'axios';

export default function Navbar() {

    const { user, logged, setLogged, setUser } = useContext(UserContext);

    const signOut = () => {
        delete axios.defaults.headers.common['authorization'];
        localStorage.removeItem('bearer-token');
        setLogged(false);
        setUser({});
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid px-4">
                <Link className="navbar-brand" to="/">Financal App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        !logged ? <NormalNav /> : <LoggedNav businessName={user.business_name} handleSignOut={signOut} />
                    }
                </div>
            </div>
        </nav>
    );
}
