import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomeScreen from './components/Home/HomeScreen';
import LoginScreen from './components/Login/LoginScreen';
import RegisterScreen from './components/Register/RegisterScreen';
import StatementScreen from './components/Statement/StatementScreen';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/'>
                    <HomeScreen />
                </Route>
                <Route path='/enunciado'>
                    <StatementScreen />
                </Route>
                <Route path='/signin'>
                    <LoginScreen />
                </Route>
                <Route path='/signup'>
                    <RegisterScreen />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;