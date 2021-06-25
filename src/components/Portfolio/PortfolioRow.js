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
    let termText = "";
    let capitalizationText = "-";

    switch (term) {
        case 1:
            termText = "Diaria";
            break;
        case 15:
            termText = "Quincenal";
            break;
        case 30:
            termText = "Mensual";
            break;
        case 60:
            termText = "Bimestral";
            break;
        case 90:
            termText = "Trimestral";
            break;
        case 120:
            termText = "Cuatrimestral";
            break;
        case 180:
            termText = "Semestral";
            break;
        case 360:
            termText = "Anual";
            break;
        default:
            termText = "Diaria";
            break;
    }

    switch (capitalization) {
        case 1:
            capitalizationText = "Diaria";
            break;
        case 15:
            capitalizationText = "Quincenal";
            break;
        case 30:
            capitalizationText = "Mensual";
            break;
        case 60:
            capitalizationText = "Bimestral";
            break;
        case 90:
            capitalizationText = "Trimestral";
            break;
        case 120:
            capitalizationText = "Cuatrimestral";
            break;
        case 180:
            capitalizationText = "Semestral";
            break;
        case 360:
            capitalizationText = "Anual";
            break;
        default:
            capitalizationText = "-";
            break;
    }

    return (
        <tr>
            <td>{index}</td>
            <td>{currency}</td>
            <td>{days}</td>
            <td>{discount_date.split("T")[0]}</td>
            <td>{rate * 100} %</td>
            <td>{termText}</td>
            <td>{capitalizationText}</td>
            <td>
                <Link className="btn btn-sm btn-info" to={`/letras/cartera/${_id}`}>
                    <i className="fas fa-plus-circle" />
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
