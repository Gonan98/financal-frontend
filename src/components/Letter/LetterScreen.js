import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import LetterForm from './LetterForm';
import LetterTable from './LetterTable';

export default function LetterScreen({ history }) {

    const { carteraId } = useParams();
    const [refresh, setRefresh] = useState(false);

    const back = () => {
        history.goBack();
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <LetterForm setRefresh={setRefresh} />
            </div>
            <div className="col-md-8">
                <button className="btn btn-warning mb-3" onClick={back}>Volver</button>
                <LetterTable refresh={refresh} setRefresh={setRefresh} portfolioId={carteraId} />
            </div>
        </div>
    )
}
