import axios from "axios";
import React, { useEffect, useState } from "react";

import CustomerRow from "./CustomerRow";

export default function CustomerTable({ refresh, setRefresh }) {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios
            .get("/api/v1/customers")
            .then((res) => {
                setCustomers(res.data.data);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (refresh) {
            axios
                .get("/api/v1/customers")
                .then((res) => {
                    setCustomers(res.data.data);
                    setRefresh(false);
                })
                .catch(console.error);
        }
    }, [refresh, setRefresh]);

    return (
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
    );
}
