import React from 'react'

export default function SummaryItem({
    index,
    issueDate,
    amount,
    dueDate,
    days,
    retention,
    effectiveRate,
    discountRate,
    discountValue,
    netValue,
    receivedValue,
    deliveredValue,
    tcea
}) {

    return (
        <tr>
            <td>{index}</td>
            <td>{issueDate.split('T')[0]}</td>
            <td>{(amount).toFixed(2)}</td>
            <td>{dueDate.split('T')[0]}</td>
            <td>{days}</td>
            <td>{(retention).toFixed(2)}</td>
            <td>{(effectiveRate * 100).toFixed(7)}%</td>
            <td>{(discountRate * 100).toFixed(7)}%</td>
            <td>{(discountValue).toFixed(2)}</td>
            <td>{(netValue).toFixed(2)}</td>
            <td>{(receivedValue).toFixed(2)}</td>
            <td>{(deliveredValue).toFixed(2)}</td>
            <td>{(tcea * 100).toFixed(7)}%</td>
        </tr>
    )
}
