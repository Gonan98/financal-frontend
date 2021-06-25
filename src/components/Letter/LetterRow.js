import React from 'react'

export default function LetterRow({
    index,
    issue_date,
    due_date,
    retention,
    amount
}) {
    return (
        <tr>
            <td>{index}</td>
            <td>{issue_date.split('T')[0]}</td>
            <td>{due_date.split('T')[0]}</td>
            <td>{retention}</td>
            <td>{amount}</td>
        </tr>
    )
}
