import axios from 'axios';
import React, { useEffect, useState } from 'react'

import LetterRow from './LetterRow';

export default function LetterTable({ refresh, setRefresh, portfolioId }) {

    const [letters, setLetters] = useState([]);

    useEffect(() => {
        axios.get(`/api/v1/letters/portfolio/${portfolioId}`)
            .then(res => {
                setLetters(res.data.data);
            }).catch(console.error);
    }, [portfolioId]);

    useEffect(() => {
        if (refresh) {
            axios.get(`/api/v1/letters/portfolio/${portfolioId}`)
                .then(res => {
                    setLetters(res.data.data);
                    setRefresh(false);
                }).catch(console.error);
        }
    }, [portfolioId, refresh, setRefresh]);

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
