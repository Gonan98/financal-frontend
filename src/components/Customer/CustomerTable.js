import axios from "axios";
import React, { useEffect, useState } from "react";

import CustomerRow from "./CustomerRow";

export default function CustomerTable({ load, setLoad }) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (load) {
            axios
                .get("/api/v1/customers", { headers: { authorization: localStorage.getItem('bearer-token') } })
                .then((res) => {
                    setCustomers(res.data.data);
                    setLoad(false);
                })
                .catch(console.error);
        }
    }, [load, setLoad]);

    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">RUC</th>
                        <th scope="col">Razon Social</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Carteras</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c, i) => (
                        <CustomerRow key={c._id} index={i + 1} {...c} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
