import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PortfolioForm() {
    const [rateType, setRateType] = useState("EFECTIVA");
    const [customers, setCustomers] = useState([]);

    const [currency, setCurrency] = useState("SOLES");
    const [days, setDays] = useState(360);
    const [discountDate, setDiscountDate] = useState("");
    const [rate, setRate] = useState(0);
    const [capitalization, setCapitalization] = useState();
    const [term, setTerm] = useState(1);
    const [customer, setCustomer] = useState("");

    useEffect(() => {
        axios
            .get("/api/v1/customers")
            .then((res) => {
                setCustomers(res.data.data);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (customers.length > 0) {
            setCustomer(customers[0]._id);
        }
    }, [customers]);

    useEffect(() => {
        if (rateType === "NOMINAL") {
            setCapitalization(1);
        } else {
            setCapitalization();
        }
    }, [rateType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/v1/portfolios", {
                currency,
                days,
                discount_date: discountDate,
                rate: rate / 100,
                capitalization,
                term,
                customer_id: customer,
            })
            .then((res) => {
                setDiscountDate("");
                setRate(0);
            })
            .catch(console.error);
    };

    return (
        <div className="card mx-auto" style={{ width: "20rem" }}>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="portfolioCurrency" className="form-label">
                                    Moneda:
                                </label>
                                <select
                                    className="form-select"
                                    id="portfolioCurrency"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value="SOLES">Soles</option>
                                    <option value="DOLARES">Dolares</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="portfolioDays" className="form-label">
                                    Dias por año:
                                </label>
                                <select
                                    className="form-select"
                                    id="portfolioDays"
                                    value={days}
                                    onChange={(e) => setDays(e.target.value)}
                                >
                                    <option value="360">360</option>
                                    <option value="365">365</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="portfolioDiscountDate" className="form-label">
                                    Fecha de descuento:
                                </label>
                                <input
                                    type="date"
                                    id="portfolioDiscountDate"
                                    value={discountDate}
                                    className="form-control"
                                    onChange={(e) => setDiscountDate(e.target.value)}
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <input
                                        type="radio"
                                        name="rateCheck"
                                        id="portfolioEffectiveRate"
                                        className="form-check-input"
                                        value="EFECTIVA"
                                        checked={rateType === "EFECTIVA"}
                                        onChange={(e) => setRateType(e.target.value)}
                                    />
                                    <label
                                        htmlFor="portfolioEffectiveRate"
                                        className="form-check-label"
                                    >
                                        Tasa Efectiva
                                    </label>
                                </div>
                                <div className="col">
                                    <input
                                        type="radio"
                                        name="rateCheck"
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
                            </div>
                            <div className="mb-3">
                                <label htmlFor="portfolioRate" className="form-label">
                                    Tasa (%):
                                </label>
                                <input
                                    type="number"
                                    id="portfolioRate"
                                    value={rate}
                                    className="form-control"
                                    onChange={(e) => setRate(e.target.value)}
                                />
                                <select
                                    className="form-select"
                                    id="portfolioTerm"
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
                            {rateType === "NOMINAL" && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="portfolioCapitalization"
                                        className="form-label"
                                    >
                                        Capitalización
                                    </label>
                                    <select
                                        className="form-select"
                                        id="portfolioCapitalization"
                                        value={capitalization}
                                        onChange={(e) => setCapitalization(e.target.value)}
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
                            )}
                            <div className="mb-3">
                                <label htmlFor="portfolioCustomer" className="form-label">
                                    Cliente:
                                </label>
                                <select
                                    className="form-select"
                                    id="portfolioCustomer"
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                >
                                    {customers.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.business_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}
