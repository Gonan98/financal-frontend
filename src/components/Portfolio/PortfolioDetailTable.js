import React from 'react';
import PortfolioDetailRow from './PortfolioDetailRow';

export default function PortfolioDetailTable({ details }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Razón</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Momento</th>
                </tr>
            </thead>
            <tbody>
                {
                    details.map(d => <PortfolioDetailRow key={d._id} {...d} />)
                }
            </tbody>
        </table>
    )
}
