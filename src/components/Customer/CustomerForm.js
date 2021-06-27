import axios from "axios";
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { addCustomerValidation } from "../../validations/validations";
import InvalidFeedback from "../ValidationFeedback/InvalidFeedback";

export default function CustomerForm({ setRefresh }) {

    const [formValues, handleInputChange, resetForm] = useForm({
        ruc: '',
        business_name: '',
        firstname: '',
        lastname: '',
        phone: '',
        address: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        setErrors(addCustomerValidation(formValues));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0) {
            axios
                .post('/api/v1/customers', formValues)
                .then(res => {
                    resetForm();
                    setRefresh(true);
                })
                .catch(err => {
                    alert(err.response.data.message);
                });
        }
    };

    return (
        <div className="card mx-auto" style={{ width: '20rem' }}>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="customerRuc" className="form-label">
                            RUC:
                        </label>
                        <input
                            type="text"
                            id="customerRuc"
                            className={!errors.ruc ? 'form-control' : 'form-control is-invalid'}
                            name="ruc"
                            value={formValues.ruc}
                            onChange={handleInputChange}
                        />
                        {errors.ruc && <InvalidFeedback message={errors.ruc} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerBusinessName" className="form-label">
                            Razon Social:
                        </label>
                        <input
                            type="text"
                            id="customerBusinessName"
                            className={!errors.business_name ? 'form-control' : 'form-control is-invalid'}
                            name="business_name"
                            value={formValues.business_name}
                            onChange={handleInputChange}
                        />
                        {errors.business_name && <InvalidFeedback message={errors.business_name} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerFirstName" className="form-label">
                            Nombres:
                        </label>
                        <input
                            type="text"
                            id="customerFirstName"
                            className={!errors.firstname ? 'form-control' : 'form-control is-invalid'}
                            name="firstname"
                            value={formValues.firstname}
                            onChange={handleInputChange}
                        />
                        {errors.firstname && <InvalidFeedback message={errors.firstname} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerLastName" className="form-label">
                            Apellidos:
                        </label>
                        <input
                            type="text"
                            id="customerLastName"
                            className={!errors.lastname ? 'form-control' : 'form-control is-invalid'}
                            name="lastname"
                            value={formValues.lastname}
                            onChange={handleInputChange}
                        />
                        {errors.lastname && <InvalidFeedback message={errors.lastname} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerPhone" className="form-label">
                            Telefono:
                        </label>
                        <input
                            type="text"
                            id="customerPhone"
                            className={!errors.phone ? 'form-control' : 'form-control is-invalid'}
                            name="phone"
                            value={formValues.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <InvalidFeedback message={errors.phone} />}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customerAddress" className="form-label">
                            Dirección:
                        </label>
                        <input
                            type="text"
                            id="customerAddress"
                            className={!errors.address ? 'form-control' : 'form-control is-invalid'}
                            name="address"
                            value={formValues.address}
                            onChange={handleInputChange}
                        />
                        {errors.address && <InvalidFeedback message={errors.address} />}
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <button type="submit" className="btn btn-info" onClick={validate}>
                            Guardar
                        </button>
                        <button className="btn btn-secondary" onClick={resetForm}>
                            Limpiar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
