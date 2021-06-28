import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PortfolioDetailForm from './PortfolioDetailForm';
import PortfolioDetailTable from './PortfolioDetailTable';

export default function PortfolioDetailScreen() {

    const { id } = useParams();

    const [details, setDetails] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get(`/api/v1/details/portfolio/${id}`)
            .then(res => {
                setDetails(res.data.data);
            })
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        if (refresh) {
            axios.get(`/api/v1/details/portfolio/${id}`)
                .then(res => {
                    setDetails(res.data.data);
                    setRefresh(false);
                })
                .catch(console.error);
        }
    }, [id, refresh]);

    return (
        <div className="container" style={{ marginTop: '4rem' }}>
            <div className="row">
                <div className="col-md-4">
                    <PortfolioDetailForm setRefresh={setRefresh} portfolioId={id} />
                </div>
                <div className="col-md-8">
                    <PortfolioDetailTable details={details} />
                </div>
            </div>
        </div>
    )
}

