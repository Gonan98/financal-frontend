import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SummaryTable from './SummaryTable';
import SummaryInfo from './SummaryInfo';

export default function SummaryScreen() {

    const { id } = useParams();
    const [portfolio, setPortfolio] = useState({});
    const [letters, setLetters] = useState([]);
    const [details, setDetails] = useState([]);
    const [summaries, setSummaries] = useState([]);
    const [totalFinalCosts, setTotalFinalCosts] = useState(0);
    const [totalInitalCosts, setTotalInitalCosts] = useState(0);
    const [totalReceived, setTotalReceived] = useState(0);
    const [totalTCEA, setTotalTCEA] = useState(0);

    useEffect(() => {
        details.forEach(d => {
            if (d.moment === 'INICIAL') {
                setTotalInitalCosts(t => t + d.amount);
            } else if (d.moment === 'FINAL') {
                setTotalFinalCosts(t => t + d.amount);
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

    const summaryOperation = (letter) => {

        const dueDateParse = letter.due_date.split('T')[0].split('-');
        const discountDateParse = portfolio.discount_date.split('T')[0].split('-');

        // Calculo de dias
        const dueDateFormat = new Date(dueDateParse[0], dueDateParse[1] - 1, dueDateParse[2]);
        const discountDateFormat = new Date(discountDateParse[0], discountDateParse[1] - 1, discountDateParse[2]);
        const diffTime = dueDateFormat.getTime() - discountDateFormat.getTime();
        const days = diffTime / (1000 * 3600 * 24);

        // Calculo de la tasa efectiva
        let effectiveRate = 0;
        if (!portfolio.capitalization) {
            effectiveRate = Math.pow(1 + portfolio.rate, days / portfolio.term) - 1;
        } else {
            const m = portfolio.term / portfolio.capitalization;
            const n = days / portfolio.capitalization;
            effectiveRate = Math.pow(1 + (portfolio.rate / m), n) - 1;
        }

        // Calculo de la tasa descontada
        let discountRate = effectiveRate / (1 + effectiveRate);
        // Calculo del descuento
        let discountValue = letter.amount * discountRate;

        //Calculo del valor neto
        let netValue = letter.amount - discountValue;

        //Calculo del valor recibido
        let receivedValue = netValue - letter.retention - totalInitalCosts;

        //Calculo del valor entregado
        let deliveredValue = letter.amount - letter.retention + totalFinalCosts;

        //Calculo de la TCEA
        let tcea = Math.pow(deliveredValue / receivedValue, portfolio.days / days) - 1;

        return {
            issueDate: letter.issue_date,
            amount: letter.amount,
            dueDate: letter.due_date,
            days,
            retention: letter.retention,
            effectiveRate,
            discountRate,
            discountValue,
            netValue,
            receivedValue,
            deliveredValue,
            tcea
        }
    }

    return (
        <div className="container">
            <div className="card">
                <h2 className="card-header">
                    Resumen de la cartera
                </h2>
                <SummaryInfo
                    portfolio={portfolio}
                    totalInitalCosts={totalInitalCosts}
                    totalFinalCosts={totalFinalCosts}
                    totalReceived={totalReceived}
                    totalTCEA={totalTCEA}
                />
                <hr />
                <SummaryTable summaryOperation={summaryOperation} letters={letters} />
            </div>
        </div>
    )
}
