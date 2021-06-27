import React from "react";
import { Link } from "react-router-dom";

export default function PortfolioRow({
    index,
    _id,
    days,
    discount_date,
    rate,
    currency,
    term,
    capitalization,
}) {

    const termText = {
        1: 'Diaria',
        15: 'Quincenal',
        30: 'Mensual',
        60: 'Bimestral',
        90: 'Trimestral',
        120: 'Cuatrimestral',
        180: 'Semestral',
        360: 'Anual'
    };

    return (
        <tr>
            <td>{index}</td>
            <td>{currency}</td>
            <td>{days}</td>
            <td>{discount_date.split("T")[0]}</td>
            <td>{(rate * 100).toFixed(0)} %</td>
            <td>{termText[term]}</td>
            <td>{termText[capitalization]}</td>
            <td>
                <Link className="btn btn-sm btn-info" to={`/letras/cartera/${_id}`}>
                    <i className="fas fa-plus" />
                </Link>
            </td>
            <td>
                <Link
                    className="btn btn-sm btn-danger"
                    to={`/resumen/cartera/${_id}`}
                >
                    <i className="fas fa-file-alt" />
                </Link>
            </td>
        </tr>
    );
}
