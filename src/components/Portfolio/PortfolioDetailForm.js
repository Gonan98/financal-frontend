import axios from "axios";
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { createDetailValidation } from "../../validations/validations";
import InvalidFeedback from '../ValidationFeedback/InvalidFeedback';

export default function PortfolioDetailForm({ setRefresh, portfolioId }) {

    const [values, handleChange, reset] = useForm({
        reason: "PORTES",
        amount: 0,
        moment: "INICIAL",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        setErrors(createDetailValidation(values));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            axios
                .post("/api/v1/details", {
                    reason: values.reason,
                    amount: values.amount,
                    moment: values.moment,
                    portfolio_id: portfolioId
                })
                .then((res) => {
                    reset();
                    setRefresh(true);
                })
                .catch(err => {
                    console.log(err.response.data);
                });
        }
    };

    return (
        <div className="card mx-auto">
            <h3 className="card-header">
                Costes Gastos
            </h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Motivo</label>
                        <select
                            className="form-select"
                            name="reason"
                            value={values.reason}
                            onChange={handleChange}
                        >
                            <option value="PORTES">Portes</option>
                            <option value="FOTOCOPIAS">Fotocopias</option>
                            <option value="COMISIONES">Comisiones</option>
                            <option value="GASTOS ADMINISTRATIVOS">
                                Gastos administrativos
                            </option>
                            <option value="SEGURO">Seguro</option>
                            <option value="OTROS GASTOS">Otros gastos</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Monto</label>
                        <input
                            type="number"
                            className={!errors.amount ? 'form-control' : 'form-control is-invalid'}
                            name="amount"
                            value={values.amount}
                            onChange={handleChange}
                        />
                        {errors.amount && <InvalidFeedback message={errors.amount} />}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Momento</label>
                        <select
                            className="form-select"
                            name="moment"
                            value={values.moment}
                            onChange={handleChange}
                        >
                            <option value="INICIAL">Inicial</option>
                            <option value="FINAL">Final</option>
                        </select>
                    </div>
                    <input type="submit" className="btn btn-primary" onClick={validate} />
                </form>
            </div>
        </div >
    );
}
