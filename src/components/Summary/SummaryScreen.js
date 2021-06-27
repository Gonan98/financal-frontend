import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SummaryTable from './SummaryTable';
import SummaryInfo from './SummaryInfo';

export default function SummaryScreen() {

    const { id } = useParams();
    const [portfolio, setPortfolio] = useState({});
    const [letters, setLetters] = useState([]);

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
    }, [id]);

    console.log(letters);

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
        let receivedValue = netValue - letter.retention;

        //Calculo del valor entregado
        let deliveredValue = letter.amount - letter.retention;

        //Calculo de la TCEA
        let tcea = Math.pow(deliveredValue / receivedValue, portfolio.days / days);

        return {
            issueDate: letter.issue_date,
            amount: letter.amount.toFixed(2),
            dueDate: letter.due_date,
            days,
            retention: letter.retention.toFixed(2),
            effectiveRate: (effectiveRate * 100).toFixed(7),
            discountRate: (discountRate * 100).toFixed(7),
            discountValue: discountValue.toFixed(2),
            netValue: netValue.toFixed(2),
            receivedValue: receivedValue.toFixed(2),
            deliveredValue: deliveredValue.toFixed(2),
            tcea: (tcea * 100).toFixed(7)
        }
    }

    return (
        <div className="container">
            <div className="card">
                <h2 className="card-header">
                    Resumen de la cartera
                </h2>
                <SummaryInfo portfolio={portfolio} />
                <hr />
                <SummaryTable summaryOperation={summaryOperation} letters={letters} />
            </div>
        </div>
    )
}
