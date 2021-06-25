import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SummaryItem from './SummaryItem';

export default function SummaryScreen() {

    const { carteraId } = useParams();
    const [portfolio, setPortfolio] = useState({});
    const [letters, setLetters] = useState([]);

    useEffect(() => {

        axios.get(`/api/v1/portfolios/${carteraId}`)
            .then(res => {
                setPortfolio(res.data.data);
            })
            .catch(console.error);

        axios.get(`/api/v1/letters/portfolio/${carteraId}`)
            .then(res => {
                setLetters(res.data.data);
            })
            .catch(console.error);

    }, [carteraId]);

    const summaryOperation = (letter) => {

        // Calculo de dias
        const dueDateFormat = new Date(letter.due_date);
        const discountDateFormat = new Date(portfolio.discount_date);
        const diffTime = dueDateFormat - discountDateFormat;
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">N°</th>
                        <th scope="col">Fecha de Giro</th>
                        <th scope="col">Valor Nominal</th>
                        <th scope="col">Fecha de Vencimiento</th>
                        <th scope="col">Dias</th>
                        <th scope="col">Retención</th>
                        <th scope="col">TE %</th>
                        <th scope="col">d %</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">Valor Neto</th>
                        <th scope="col">Valor Recibido</th>
                        <th scope="col">Valor Entregado</th>
                        <th scope="col">TCEA %</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        letters.map((letter, i) => <SummaryItem key={letter._id} index={i + 1} {...summaryOperation(letter)} />)
                    }
                </tbody>
            </table>
        </div>
    )
}
