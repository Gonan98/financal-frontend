import axios from "axios";
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { createLetterValidation } from "../../validations/validations";
import InvalidFeedback from '../ValidationFeedback/InvalidFeedback';

export default function LetterForm({ setRefresh, portfolio }) {

    const [formValues, handleInput, reset] = useForm({
        issueDate: "",
        dueDate: "",
        retention: 0,
        amount: 0,
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        setErrors(createLetterValidation(formValues, portfolio.discount_date))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            axios
                .post("/api/v1/letters", {
                    issue_date: formValues.issueDate,
                    due_date: formValues.dueDate,
                    retention: formValues.retention ? formValues.retention : 0,
                    amount: formValues.amount,
                    portfolio_id: portfolio._id,
                })
                .then((res) => {
                    setRefresh(true);
                    reset();
                })
                .catch(console.error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="issueDate" className="form-label">
                            Fecha de giro:
                        </label>
                        <input
                            type="date"
                            className={!errors.issueDate ? 'form-control' : 'form-control is-invalid'}
                            name="issueDate"
                            id="issueDate"
                            value={formValues.issueDate}
                            onChange={handleInput}
                        />
                        {errors.issueDate && <InvalidFeedback message={errors.issueDate} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label">
                            Fecha de vencimiento:
                        </label>
                        <input
                            type="date"
                            className={!errors.dueDate ? 'form-control' : 'form-control is-invalid'}
                            name="dueDate"
                            id="dueDate"
                            value={formValues.dueDate}
                            onChange={handleInput}
                        />
                        {errors.dueDate && <InvalidFeedback message={errors.dueDate} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="retention" className="form-label">
                            Retención:
                        </label>
                        <input
                            type="number"
                            className={!errors.retention ? 'form-control' : 'form-control is-invalid'}
                            name="retention"
                            id="retention"
                            value={formValues.retention}
                            onChange={handleInput}
                        />
                        {errors.retention && <InvalidFeedback message={errors.retention} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">
                            Monto (V. Nom):
                        </label>
                        <input
                            type="number"
                            className={!errors.amount ? 'form-control' : 'form-control is-invalid'}
                            name="amount"
                            id="amount"
                            value={formValues.amount}
                            onChange={handleInput}
                        />
                        {errors.amount && <InvalidFeedback message={errors.amount} />}
                    </div>
                    <button type="submit" className="btn btn-info" onClick={validate}>
                        Agregar
                    </button>
                </form>
            </div>
        </div>
    );
}
