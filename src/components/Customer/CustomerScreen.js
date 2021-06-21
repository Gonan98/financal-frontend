import React, { useState } from 'react'

import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';

export default function CustomerScreen() {

    const [load, setLoad] = useState(true);

    return (
        <div className="row">
            <div className="col-md-4">
                <CustomerForm setLoad={setLoad} />
            </div>
            <div className="col-md-8">
                <CustomerTable load={load} setLoad={setLoad} />
            </div>
        </div>
    )
}
