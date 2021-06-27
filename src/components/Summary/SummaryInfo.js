import React from 'react'

export default function SummaryInfo({ portfolio }) {

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
        <div className="card-body">
            <ul>
                <li className="card-text"><strong>Fecha de descuento: </strong>{portfolio.discount_date?.split('T')[0]}</li>
                <li className="card-text"><strong>Tasa: </strong>{portfolio.rate * 100}%</li>
                <li className="card-text"><strong>Plazo: </strong>{termText[portfolio.term]}</li>
                {
                    portfolio.capitalization ?
                        <>
                            <li className="card-text"><strong>Tipo: </strong>Nominal</li>
                            <li className="card-text"><strong>Capitalizacion: </strong>{termText[portfolio.capitalization]}</li>
                        </>
                        :
                        <li className="card-text"><strong>Tipo: </strong>Efectiva</li>
                }
                <li className="card-text"><strong>Dias por año: </strong>{portfolio.days}</li>
            </ul>
        </div>
    )
}

