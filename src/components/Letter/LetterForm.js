import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export default function LetterForm({ setRefresh }) {
    const { carteraId } = useParams();

    const [formValues, handleInput, reset] = useForm({
        issueDate: "",
        dueDate: "",
        retention: 0,
        amount: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        axios
            .post("/api/v1/letters", {
                issue_date: formValues.issueDate,
                due_date: formValues.dueDate,
                retention: formValues.retention,
                amount: formValues.amount,
                portfolio_id: carteraId,
            })
            .then((res) => {
                setRefresh(true);
                reset();
            })
            .catch(console.error);
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
                            className="form-control"
                            name="issueDate"
                            id="issueDate"
                            value={formValues.issueDate}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label">
                            Fecha de vencimiento:
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            name="dueDate"
                            id="dueDate"
                            value={formValues.dueDate}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="retention" className="form-label">
                            Retención:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="retention"
                            id="retention"
                            value={formValues.retention}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">
                            Monto (V. Nom):
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="amount"
                            id="amount"
                            value={formValues.amount}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="checkbox" className="form-check-input" />
                        <label htmlFor="checkFotocopias" className="form-check-label">
                            Fotocopias
                        </label>
                    </div>
                    <div className="mb-3">
                        <input type="checkbox" className="form-check-input" />
                        <label htmlFor="checkFotocopias" className="form-check-label">
                            Portes
                        </label>
                    </div>
                    <div className="mb-3">
                        <input type="checkbox" className="form-check-input" />
                        <label htmlFor="checkFotocopias" className="form-check-label">
                            Gastos administrativos
                        </label>
                    </div>
                    <div className="mb-3">
                        <input type="checkbox" className="form-check-input" />
                        <label htmlFor="checkFotocopias" className="form-check-label">
                            Comisiones
                        </label>
                    </div>
                    <div className="mb-3">
                        <input type="checkbox" className="form-check-input" />
                        <label htmlFor="checkFotocopias" className="form-check-label">
                            Seguro
                        </label>
                    </div>
                    <button type="submit" className="btn btn-info">
                        Agregar
                    </button>
                </form>
            </div>
        </div>
    );
}
