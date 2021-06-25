import React from 'react'

import PortfolioRow from './PortfolioRow'

export default function PortfolioTable({ portfolios }) {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Moneda</th>
                    <th scope="col">Dias</th>
                    <th scope="col">Fecha de descuento</th>
                    <th scope="col">Tasa</th>
                    <th scope="col">Plazo</th>
                    <th scope="col">Capitalización</th>
                    <th scope="col">Letras</th>
                    <th scope="col">Resumen</th>
                </tr>
            </thead>
            <tbody>
                {
                    portfolios.map((p, i) => <PortfolioRow key={p._id} index={i + 1} {...p} />)
                }
            </tbody>
        </table>
    )
}
