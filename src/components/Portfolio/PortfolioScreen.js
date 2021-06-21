import React, { useState } from 'react'
import PortfolioForm from './PortfolioForm'
import PortfolioTable from './PortfolioTable'

export default function PortfolioScreen() {

    const [loadData, setLoadData] = useState(true);

    return (
        <div className="row">
            <div className="col-md-4">
                <PortfolioForm setLoadData={setLoadData} />
            </div>
            <div className="col-md-8">
                <PortfolioTable loadData={loadData} setLoadData={setLoadData} />
            </div>
        </div>
    )
}
