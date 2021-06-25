import React, { useState } from 'react'

import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';

export default function CustomerScreen() {

    const [refresh, setRefresh] = useState(false);

    return (
        <div className="row">
            <div className="col-md-4">
                <CustomerForm setLoad={setRefresh} />
            </div>
            <div className="col-md-8">
                <CustomerTable load={refresh} setLoad={setRefresh} />
            </div>
        </div>
    )
}
