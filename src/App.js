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
import PortfolioDetailScreen from './components/Portfolio/PortfolioDetailScreen';

const App = () => {

    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('/api/v1/auth/profile')
            .then(res => {
                setUser(res.data.data);
                setLogged(true);
            }).catch(err => {
                localStorage.removeItem('bearer-token');
                axios.defaults.headers.common.authorization = '';
            });
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
                    <Route path='/carteras/cliente/:id' component={PortfolioScreen} />
                    <Route path='/cartera/:id/detalles' component={PortfolioDetailScreen} />
                    <Route path='/carteras/form' component={PortfolioForm} />
                    <Route path='/letras/cartera/:id' component={LetterScreen} />
                    <Route path='/resumen/cartera/:id' component={SummaryScreen} />
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