import axios from "axios";
import React, { useEffect, useState } from "react";
import { createPortfolioValidation } from "../../validations/validations";
import InvalidFeedBack from '../ValidationFeedback/InvalidFeedback';

export default function PortfolioForm() {
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [currency, setCurrency] = useState('SOLES');
    const [days, setDays] = useState(360);
    const [discountDate, setDiscountDate] = useState('');
    const [rate, setRate] = useState(0);
    const [term, setTerm] = useState(1);
    const [capitalization, setCapitalization] = useState(0);
    const [rateType, setRateType] = useState('EFECTIVA');

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get('/api/v1/customers')
            .then((res) => {
                setCustomers(res.data.data);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (rateType === 'NOMINAL') {
            setCapitalization(1);
        } else {
            setCapitalization(0);
        }
    }, [rateType]);

    const validate = () => {
        setErrors(createPortfolioValidation({ discountDate, rate, customerId }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            axios
                .post("/api/v1/portfolios", {
                    currency,
                    days,
                    discount_date: discountDate,
                    rate: rate / 100,
                    capitalization: capitalization > 0 ? capitalization : undefined,
                    term,
                    customer_id: customerId,
                })
                .then((res) => {
                    setDiscountDate('');
                    setRate(0);
                })
                .catch(err => {
                    alert(err.response.data.message);
                });
        }
    };

    return (
        <div className="card mx-auto" style={{ width: '32rem', marginTop: '8rem' }}>
            <h3 className="card-header">Registro de cartera</h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="portfolioCurrency" className="form-label">
                                Moneda:
                            </label>
                            <select
                                className="form-select"
                                id="portfolioCurrency"
                                name="currency"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                <option value="SOLES">Soles</option>
                                <option value="DOLARES">Dolares</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="portfolioDays" className="form-label">
                                Dias por año:
                            </label>
                            <select
                                className="form-select"
                                id="portfolioDays"
                                name="days"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                            >
                                <option value="360">360</option>
                                <option value="365">365</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label htmlFor="portfolioDiscountDate" className="form-label">
                                Fecha de descuento:
                            </label>
                            <input
                                type="date"
                                id="portfolioDiscountDate"
                                name="discount_date"
                                value={discountDate}
                                className={!errors.discountDate ? 'form-control' : 'form-control is-invalid'}
                                onChange={(e) => setDiscountDate(e.target.value)}
                            />
                            {errors.discountDate && <InvalidFeedBack message={errors.discountDate} />}
                        </div>
                        <div className="col-md-6">
                            <input
                                type="radio"
                                name="rateType"
                                id="portfolioEffectiveRate"
                                className="form-check-input"
                                value="EFECTIVA"
                                checked={rateType === 'EFECTIVA'}
                                onChange={(e) => setRateType(e.target.value)}
                            />
                            <label
                                htmlFor="portfolioEffectiveRate"
                                className="form-check-label"
                            >
                                Tasa Efectiva
                            </label>
                        </div>
                        <div className="col-md-6">
                            <input
                                type="radio"
                                name="rateType"
                                id="portfolioNominalRate"
                                className="form-check-input"
                                value="NOMINAL"
                                onChange={(e) => setRateType(e.target.value)}
                            />
                            <label
                                htmlFor="portfolioNominalRate"
                                className="form-check-label"
                            >
                                Tasa Nominal
                            </label>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="portfolioRate" className="form-label">
                                Tasa (%):
                            </label>
                            <input
                                type="number"
                                id="portfolioRate"
                                name="rate"
                                value={rate}
                                className={!errors.rate ? 'form-control' : 'form-control is-invalid'}
                                onChange={(e) => setRate(e.target.value)}
                            />
                            {errors.rate && <InvalidFeedBack message={errors.rate} />}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="portfolioTerm" className="form-label">
                                Plazo:
                            </label>
                            <select
                                className="form-select"
                                id="portfolioTerm"
                                name="term"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            >
                                <option value="1">Diaria</option>
                                <option value="15">Quincenal</option>
                                <option value="30">Mensual</option>
                                <option value="60">Bimestral</option>
                                <option value="90">Trimestral</option>
                                <option value="120">Cuatrimestral</option>
                                <option value="180">Semestral</option>
                                <option value="360">Anual</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label
                                htmlFor="portfolioCapitalization"
                                className="form-label"
                                hidden={rateType === 'EFECTIVA'}
                            >
                                Capitalización:
                            </label>
                            <select
                                className="form-select"
                                id="portfolioCapitalization"
                                name="capitalization"
                                value={capitalization}
                                onChange={(e) => setCapitalization(e.target.value)}
                                hidden={rateType === 'EFECTIVA'}
                            >
                                <option value="1">Diaria</option>
                                <option value="15">Quincenal</option>
                                <option value="30">Mensual</option>
                                <option value="60">Bimestral</option>
                                <option value="90">Trimestral</option>
                                <option value="120">Cuatrimestral</option>
                                <option value="180">Semestral</option>
                                <option value="360">Anual</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label htmlFor="portfolioCustomer" className="form-label">
                                Cliente:
                            </label>
                            <select
                                className={!errors.customerId ? 'form-control' : 'form-control is-invalid'}
                                id="portfolioCustomer"
                                name="customer_id"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                            >
                                <option style={{ display: "none" }}>Seleccione un cliente...</option>
                                {customers.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.business_name}
                                    </option>
                                ))}
                            </select>
                            {errors.customerId && <InvalidFeedBack message={errors.customerId} />}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning mt-3" onClick={validate}>
                        Registrar
                    </button>
                </form>
            </div>
        </div >
    );
}
