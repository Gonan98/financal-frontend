import React, { useEffect, useState } from 'react'

import SummaryItem from './SummaryItem';

export default function SummaryTable({ letters, daysPerYear, rate, discountDate, term, capitalization, initialCost, finalCost, setTotalReceived, setTotalTCEA }) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const rows = [];
        letters.forEach(l => {
            const dueDateFormat = l.due_date.split('T')[0];
            const discountDateFormat = discountDate.split('T')[0];

            const dueDateParsed = new Date(dueDateFormat);
            const discountDateParsed = new Date(discountDateFormat);
            const diff = dueDateParsed.getTime() - discountDateParsed.getTime();
            const days = diff / (1000 * 3600 * 24);

            let effectiveRate = 0
            if (!capitalization) {
                effectiveRate = Math.pow(1 + rate, days / term) - 1;
            } else {
                const m = term / capitalization;
                const n = days / capitalization;
                effectiveRate = Math.pow(1 + (rate / m), n) - 1;
            }

            const discountRate = effectiveRate / (1 + effectiveRate);
            const discountValue = l.amount * discountRate;
            const netValue = l.amount - discountValue;
            const receivedValue = netValue - l.retention - initialCost;
            const deliveredValue = l.amount - l.retention + finalCost;
            const tcea = Math.pow(deliveredValue / receivedValue, daysPerYear / days) - 1;

            rows.push({
                issueDate: l.issue_date,
                amount: l.amount,
                dueDate: l.due_date,
                days,
                retention: l.retention,
                effectiveRate,
                discountRate,
                discountValue,
                netValue,
                receivedValue,
                deliveredValue,
                tcea
            });

            setTotalReceived(t => t + receivedValue);
        });

        setItems(rows);

    }, [letters, capitalization, daysPerYear, discountDate, rate, term, finalCost, initialCost, setTotalReceived]);

    useEffect(() => {
        let receivedTotal = 0;
        let deliveredTotal = 0;
        const minDays = Math.min(...items.map(i => i.days));
        letters.forEach(l => {
            let effectiveRate = 0
            if (!capitalization) {
                effectiveRate = Math.pow(1 + rate, minDays / term) - 1;
            } else {
                const m = term / capitalization;
                const n = minDays / capitalization;
                effectiveRate = Math.pow(1 + (rate / m), n) - 1;
            }

            const discountRate = effectiveRate / (1 + effectiveRate);
            const discountValue = l.amount * discountRate;
            const netValue = l.amount - discountValue;
            const receivedValue = netValue - l.retention - initialCost;
            const deliveredValue = l.amount - l.retention + finalCost;

            receivedTotal += receivedValue;
            deliveredTotal += deliveredValue;
        });

        const tcea = Math.pow(deliveredTotal / receivedTotal, daysPerYear / minDays) - 1;
        setTotalTCEA(tcea);

    }, [items, capitalization, daysPerYear, finalCost, initialCost, letters, rate, term, setTotalTCEA]);

    return (
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
                    items.map((item, i) => <SummaryItem key={i} index={i + 1} {...item} />)
                }
            </tbody>
        </table>
    )
}
