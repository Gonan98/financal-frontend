import axios from "axios";
import React, { useState } from "react";

export default function CustomerForm({ setLoad, history }) {
    const [ruc, setRuc] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('/api/v1/customers', {
                ruc,
                business_name: businessName,
                firstname,
                lastname,
                phone,
                address,
            }, { headers: { authorization: localStorage.getItem('bearer-token') } })
            .then((data) => {
                resetForm();
                setLoad(true);
            })
            .catch(console.error);
    };

    const resetForm = () => {
        setRuc('');
        setBusinessName('');
        setFirstname('');
        setLastname('');
        setPhone('');
        setAddress('');
    }

    return (
        <div className="card mx-auto">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="customerRuc" className="form-label">
                            RUC:
                        </label>
                        <input
                            type="text"
                            id="customerRuc"
                            className="form-control"
                            required
                            value={ruc}
                            onChange={(e) => setRuc(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerBusinessName" className="form-label">
                            Razon Social:
                        </label>
                        <input
                            type="text"
                            id="customerBusinessName"
                            className="form-control"
                            required
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerFirstName" className="form-label">
                            Nombres:
                        </label>
                        <input
                            type="text"
                            id="customerFirstName"
                            className="form-control"
                            required
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerLastName" className="form-label">
                            Apellidos:
                        </label>
                        <input
                            type="text"
                            id="customerLastName"
                            className="form-control"
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerPhone" className="form-label">
                            Telefono:
                        </label>
                        <input
                            type="text"
                            id="customerPhone"
                            className="form-control"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customerAddress" className="form-label">
                            Dirección:
                        </label>
                        <input
                            type="text"
                            id="customerAddress"
                            className="form-control"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-info">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}
