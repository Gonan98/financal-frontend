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
            <td>{amount}</td>
            <td>{dueDate.split('T')[0]}</td>
            <td>{days}</td>
            <td>{retention}</td>
            <td>{effectiveRate}%</td>
            <td>{discountRate}%</td>
            <td>{discountValue}</td>
            <td>{netValue}</td>
            <td>{receivedValue}</td>
            <td>{deliveredValue}</td>
            <td>{tcea}%</td>
        </tr>
    )
}
