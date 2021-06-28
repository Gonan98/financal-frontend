import axios from "axios";
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { signUpValidation } from '../../validations/validations';
import InvalidFeedback from '../ValidationFeedback/InvalidFeedback';
import Alert from '../ValidationFeedback/Alert';

export default function RegisterScreen({ history }) {

    const [formValues, handleInputChange, resetForm] = useForm({
        ruc: '',
        business_name: '',
        email: '',
        password: '',
        repeatedPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [requestMessage, setRequestMessage] = useState('');

    const handleErrors = () => {
        setErrors(signUpValidation(formValues));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0) {
            axios
                .post("/api/v1/auth/signup", formValues)
                .then(() => {
                    history.replace("/signin");
                })
                .catch(err => {
                    resetForm();
                    setRequestMessage(err.response.data.message);
                });
        }
    };

    return (
        <div className="card mx-auto" style={{ width: "20rem", marginTop: '4rem' }}>
            <h3 className="card-header">
                Registrate
            </h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="ruc" className="form-label">
                            RUC:
                        </label>
                        <input
                            type="text"
                            className={!errors.ruc ? 'form-control' : 'form-control is-invalid'}
                            id="ruc"
                            name="ruc"
                            value={formValues.ruc}
                            onChange={handleInputChange}
                        />
                        {errors.ruc && <InvalidFeedback message={errors.ruc} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="businessName" className="form-label">
                            Razon social:
                        </label>
                        <input
                            type="text"
                            className={!errors.business_name ? 'form-control' : 'form-control is-invalid'}
                            id="businessName"
                            name="business_name"
                            value={formValues.business_name}
                            onChange={handleInputChange}
                        />
                        {errors.business_name && <InvalidFeedback message={errors.business_name} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Correo:
                        </label>
                        <input
                            type="email"
                            className={!errors.email ? 'form-control' : 'form-control is-invalid'}
                            id="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <InvalidFeedback message={errors.email} />}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            className={!errors.password ? 'form-control' : 'form-control is-invalid'}
                            id="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <InvalidFeedback message={errors.password} />}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="repeatPassword" className="form-label">
                            Repetir contraseña:
                        </label>
                        <input
                            type="password"
                            className={!errors.repeatedPassword ? 'form-control' : 'form-control is-invalid'}
                            id="repeatPassword"
                            name="repeatedPassword"
                            value={formValues.repeatedPassword}
                            onChange={handleInputChange}
                        />
                        {errors.repeatedPassword && <InvalidFeedback message={errors.repeatedPassword} />}
                    </div>
                    <button type="submit" className="btn btn-info" onClick={handleErrors}>
                        Registrarse
                    </button>
                </form>
                {requestMessage && <Alert type={'danger'} message={requestMessage} />}
            </div>
        </div>
    );
}
