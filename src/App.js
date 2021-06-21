import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomeScreen from './components/Home/HomeScreen';
import LoginScreen from './components/Login/LoginScreen';
import RegisterScreen from './components/Register/RegisterScreen';
import StatementScreen from './components/Statement/StatementScreen';
import UserContext from './context/UserContext';
import PortfolioScreen from './components/Portfolio/PortfolioScreen';
import axios from 'axios';
import CustomerScreen from './components/Customer/CustomerScreen';

const App = () => {

    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const bearerToken = localStorage.getItem('bearer-token');
        if (bearerToken) {
            axios.get('/api/v1/auth/profile', { headers: { authorization: bearerToken } })
                .then(res => {
                    setUser(res.data.data);
                    setLogged(true);
                }).catch(console.error);
        }
    }, []);

    useEffect(() => {
        if (logged) {
            const bearerToken = localStorage.getItem('bearer-token');
            axios.get('/api/v1/auth/profile', { headers: { authorization: bearerToken } })
                .then(res => {
                    setUser(res.data.data);
                }).catch(err => {
                    setUser({});
                });
        }
    }, [logged]);

    return (
        <UserContext.Provider value={{ user, setUser, logged, setLogged }}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/enunciado' component={StatementScreen} />
                    <Route path='/signin' component={LoginScreen} />
                    <Route path='/signup' component={RegisterScreen} />
                    <Route path='/carteras' component={PortfolioScreen} />
                    {
                        !logged ? <Route path='/' component={HomeScreen} /> : <Route path='/' component={CustomerScreen} />
                    }
                    <Redirect to='/' />
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;