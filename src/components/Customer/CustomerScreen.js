import React, { useState } from 'react'

import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';

export default function CustomerScreen() {

    const [refresh, setRefresh] = useState(false);

    return (
        <div className="container" style={{ marginTop: '4rem' }}>
            <div className="row">
                <div className="col-md-4">
                    <CustomerForm setRefresh={setRefresh} />
                </div>
                <div className="col-md-8">
                    <CustomerTable refresh={refresh} setRefresh={setRefresh} />
                </div>
            </div>
        </div>
    )
}
