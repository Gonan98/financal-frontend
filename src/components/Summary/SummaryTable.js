import React from 'react'

import SummaryItem from './SummaryItem';

export default function SummaryTable({ letters, summaryOperation }) {
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
                    letters.map((letter, i) => <SummaryItem key={letter._id} index={i + 1} {...summaryOperation(letter)} />)
                }
            </tbody>
        </table>
    )
}
