import React from 'react'

export default function PortfolioDetailRow({
    reason,
    amount,
    moment
}) {
    return (
        <tr>
            <td>{reason}</td>
            <td>{amount}</td>
            <td>{moment}</td>
        </tr>
    )
}
