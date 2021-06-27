import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LetterForm from './LetterForm';
import LetterTable from './LetterTable';

export default function LetterScreen({ history }) {

    const { id } = useParams();
    const [letters, setLetters] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [portfolio, setPortfolio] = useState({});

    useEffect(() => {
        axios.get(`/api/v1/portfolios/${id}`)
            .then(res => {
                setPortfolio(res.data.data);
            })
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        axios.get(`/api/v1/letters/portfolio/${id}`)
            .then(res => {
                setLetters(res.data.data);
            }).catch(console.error);
    }, [id]);

    useEffect(() => {
        if (refresh) {
            axios.get(`/api/v1/letters/portfolio/${id}`)
                .then(res => {
                    setLetters(res.data.data);
                    setRefresh(false);
                }).catch(console.error);
        }
    }, [id, refresh]);

    const back = () => {
        history.goBack();
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <LetterForm setRefresh={setRefresh} portfolio={portfolio} />
            </div>
            <div className="col-md-8">
                <button className="btn btn-warning mb-3" onClick={back}>Volver</button>
                <LetterTable letters={letters} />
            </div>
        </div>
    )
}
