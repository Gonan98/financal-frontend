import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SummaryTable from './SummaryTable';
import SummaryInfo from './SummaryInfo';

export default function SummaryScreen() {

    const { id } = useParams();
    const [portfolio, setPortfolio] = useState({});
    const [letters, setLetters] = useState([]);
    const [details, setDetails] = useState([]);
    const [initialCosts, setInitialCosts] = useState(0);
    const [finalCosts, setFinalCosts] = useState(0);
    const [recibirTotal, setRecibirTotal] = useState(0);
    const [tceaTotal, setTceaTotal] = useState(0);

    useEffect(() => {
        details.forEach(d => {
            if (d.moment === 'INICIAL') {
                setInitialCosts(t => t + d.amount);
            } else if (d.moment === 'FINAL') {
                setFinalCosts(t => t + d.amount);
            }
        })
    }, [details]);

    useEffect(() => {
        axios.get(`/api/v1/portfolios/${id}`)
            .then(res => {
                setPortfolio(res.data.data);
            })
            .catch(console.error);

        axios.get(`/api/v1/letters/portfolio/${id}`)
            .then(res => {
                setLetters(res.data.data);
            })
            .catch(console.error);

        axios.get(`/api/v1/details/portfolio/${id}`)
            .then(res => {
                setDetails(res.data.data);
            })
            .catch(console.error);
    }, [id]);

    return (
        <div className="container">
            <div className="card">
                <h2 className="card-header">
                    Resumen de la cartera
                </h2>
                <SummaryInfo
                    portfolio={portfolio}
                    initialCost={initialCosts}
                    finalCost={finalCosts}
                    totalReceived={recibirTotal}
                    totalTCEA={tceaTotal}
                />
                <hr />
                <SummaryTable
                    letters={letters}
                    rate={portfolio.rate}
                    discountDate={portfolio.discount_date}
                    term={portfolio.term}
                    capitalization={portfolio.capitalization}
                    initialCost={initialCosts}
                    finalCost={finalCosts}
                    daysPerYear={portfolio.days}
                    setTotalReceived={setRecibirTotal}
                    setTotalTCEA={setTceaTotal}
                />
            </div>
        </div>
    )
}
