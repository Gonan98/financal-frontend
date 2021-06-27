import React from 'react'

import LetterRow from './LetterRow';

export default function LetterTable({ letters }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Fecha de emisión</th>
                    <th scope="col">Fecha de vencimiento</th>
                    <th scope="col">Retencion</th>
                    <th scope="col">Monto</th>
                </tr>
            </thead>
            <tbody>
                {
                    letters.map((l, i) => <LetterRow key={l._id} index={i + 1} {...l} />)
                }
            </tbody>
        </table>
    )
}
