import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useForm } from "../../hooks/useForm";
import { signInValidation } from "../../validations/validations";
import InvalidFeedback from "../ValidationFeedback/InvalidFeedback";
import Alert from '../ValidationFeedback/Alert';

export default function LoginScreen({ history }) {
    const { setLogged } = useContext(UserContext);
    const [formValues, handleInputChange, resetForm] = useForm({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [requestError, setRequestError] = useState('');

    const validate = () => {
        setErrors(signInValidation(formValues));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0) {
            axios
                .post("/api/v1/auth/signin", formValues)
                .then((res) => {
                    axios.defaults.headers.common.authorization = res.data.token;
                    localStorage.setItem("bearer-token", res.data.token);
                    setLogged(true);
                    history.replace("/");
                })
                .catch(err => {
                    resetForm();
                    setRequestError(err.response.data.message);
                });
        }
    };

    return (
        <div className="card mx-auto" style={{ width: "20rem" }}>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="signInEmail" className="form-label">
                            Correo:
                        </label>
                        <input
                            type="email"
                            className={!errors.email ? 'form-control' : 'form-control is-invalid'}
                            id="signInEmail"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <InvalidFeedback message={errors.email} />}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="signInPassword" className="form-label">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            className={!errors.password ? 'form-control' : 'form-control is-invalid'}
                            id="signInPassword"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <InvalidFeedback message={errors.password} />}
                    </div>
                    <button type="submit" className="btn btn-info" onClick={validate}>
                        Iniciar Sesion
                    </button>
                </form>
                {requestError && <Alert type="danger" message={requestError} />}
                <br />
                <p>
                    ¿No tiene una cuenta? <Link to="/signup">Regístrese aquí</Link>
                </p>
            </div>
        </div>
    );
}
