import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomeScreen from './components/Home/HomeScreen';
import LoginScreen from './components/Login/LoginScreen';
import RegisterScreen from './components/Register/RegisterScreen';
import StatementScreen from './components/Statement/StatementScreen';
import UserContext from './context/UserContext';
import axios from 'axios';
import CustomerScreen from './components/Customer/CustomerScreen';
import PortfolioForm from './components/Portfolio/PortfolioForm';
import PortfolioScreen from './components/Portfolio/PortfolioScreen';
import LetterScreen from './components/Letter/LetterScreen';
import SummaryScreen from './components/Summary/SummaryScreen';

const App = () => {

    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const bearerToken = localStorage.getItem('bearer-token');
        if (bearerToken) {
            axios.defaults.headers.common['authorization'] = bearerToken;
            axios.get('/api/v1/auth/profile')
                .then(res => {
                    setUser(res.data.data);
                    setLogged(true);
                }).catch(err => {
                    localStorage.removeItem('bearer-token');
                });
        }
    }, []);

    useEffect(() => {
        if (logged) {
            axios.get('/api/v1/auth/profile')
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
                    <Route exact path='/carteras/cliente/:id' component={PortfolioScreen} />
                    <Route exact path='/carteras/form' component={PortfolioForm} />
                    <Route exact path='/letras/cartera/:carteraId' component={LetterScreen} />
                    <Route exact path='/resumen/cartera/:carteraId' component={SummaryScreen} />
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