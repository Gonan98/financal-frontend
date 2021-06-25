import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

import PortfolioTable from './PortfolioTable';

export default function PortfolioScreen() {

    const { id } = useParams();
    const [customer, setCustomer] = useState({});
    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        axios.get(`/api/v1/customers/${id}`)
            .then(res => setCustomer(res.data.data))
            .catch(console.error);

        axios.get(`/api/v1/portfolios/customer/${id}`)
            .then(res => setPortfolios(res.data.data))
            .catch(console.error);
    }, [id]);

    return (
        <div className="container">
            <h2>Carteras de {customer.business_name}</h2>
            <Link className="btn btn-warning" to='/'>Volver</Link>
            <PortfolioTable portfolios={portfolios} />
        </div>
    )
}
