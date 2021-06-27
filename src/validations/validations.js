export const signUpValidation = (values) => {

    const errors = {};

    if (values.ruc.trim() === '') {
        errors.ruc = 'El RUC es requerido'
    } else if (!/^[0-9]+$/.test(values.ruc)) {
        errors.ruc = 'El RUC solo debe contener numeros'
    } else if (values.ruc.length !== 11) {
        errors.ruc = 'El RUC debe tener 11 digitos'
    }

    if (values.business_name.trim() === '') {
        errors.business_name = 'La razon social es requerida'
    } else if (values.business_name.length < 5) {
        errors.business_name = 'La razon social debe tener al menos 5 caracteres'
    } else if (!/^[a-zA-Z\s]+$/.test(values.business_name)) {
        errors.business_name = 'La razon social solo debe contener letras'
    }

    if (values.email.trim() === '') {
        errors.email = 'El email es requerido'
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
        errors.email = 'El email no es válido'
    }

    if (values.password.trim() === '') {
        errors.password = 'La contraseña es requerida'
    } else if (!/^[a-zA-Z0-9]+$/.test(values.password)) {
        errors.password = 'La contraseña solo puede tener letras y numeros'
    } else if (values.password.length < 5) {
        errors.password = 'La contraseña debe tener al menos 5 caracteres'
    }

    if (values.repeatedPassword.trim() === '') {
        errors.repeatedPassword = 'Debe completar este campo'
    } else if (values.repeatedPassword !== values.password) {
        errors.repeatedPassword = 'Las contraseñas no coinciden'
    }

    return errors;
}

export const signInValidation = (values) => {
    let errors = {};

    if (values.email.trim() === '') {
        errors.email = 'El email es requerido'
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
        errors.email = 'El email no es válido'
    }

    if (!values.password.trim()) {
        errors.password = 'La contraseña es requerida'
    }

    return errors;
}

export const addCustomerValidation = (values) => {
    let errors = {};

    if (values.ruc.trim() === '') {
        errors.ruc = 'El RUC es requerido'
    } else if (!/^[0-9]+$/.test(values.ruc)) {
        errors.ruc = 'El RUC solo debe contener numeros'
    } else if (values.ruc.length !== 11) {
        errors.ruc = 'El RUC debe tener 11 digitos'
    }

    if (values.business_name.trim() === '') {
        errors.business_name = 'La razon social es requerida'
    } else if (values.business_name.length < 5) {
        errors.business_name = 'La razon social debe tener al menos 5 caracteres'
    } else if (!/^[a-zA-Z\s]+$/.test(values.business_name)) {
        errors.business_name = 'La razon social solo debe contener letras'
    }

    if (values.firstname.trim() === '') {
        errors.firstname = 'El nombre es requerido'
    } else if (values.firstname.length < 3) {
        errors.firstname = 'El nombre debe contener al menos 3 caracteres'
    } else if (!/^[a-zA-Z\s]+$/.test(values.firstname)) {
        errors.firstname = 'El nombre solo debe contener letras'
    }

    if (values.lastname.trim() === '') {
        errors.lastname = 'El apellido es requerido'
    } else if (values.lastname.length < 2) {
        errors.lastname = 'El apellido debe contener al menos 2 caracteres'
    } else if (!/^[a-zA-Z\s]+$/.test(values.lastname)) {
        errors.lastname = 'El apellido solo debe contener letras'
    }

    if (values.phone.trim() === '') {
        errors.phone = 'El telefono es requerido'
    } else if (!/^[0-9]+$/.test(values.phone)) {
        errors.phone = 'El telefono solo debe contener numeros'
    } else if (values.phone.length !== 9) {
        errors.phone = 'El telefono debe tener 9 digitos'
    }

    if (values.address.trim() === '') {
        errors.address = 'La dirección es requerida'
    } else if (values.address.length < 10) {
        errors.address = 'La dirección debe contener al menos 10 caracteres'
    } else if (!/\w*[a-zA-Z]\w*/.test(values.address)) {
        errors.address = 'La dirección debe tener letras y numeros'
    }

    return errors;
}

export const createPortfolioValidation = (values) => {
    const errors = {};

    if (values.discountDate === '') {
        errors.discountDate = 'La fecha de descuento es obligatoria';
    } else {
        const date = new Date(values.discountDate);
        if (date <= Date.now()) {
            errors.discountDate = 'La fecha de descuento debe ser mañor a la fecha de hoy';
        }
    }

    if (values.rate === '') {
        errors.rate = 'La tasa es requerida';
    } else if (values.rate <= 0) {
        errors.rate = 'La tasa debe ser mayor a cero';
    }

    if (values.customerId === '') {
        errors.customerId = 'Debe seleccionar un cliente'
    }

    return errors;
}

export const createLetterValidation = (values, discountDate) => {

    const errors = {};

    const date3 = new Date(discountDate);

    if (values.issueDate === '') {
        errors.issueDate = 'La fecha de giro es requerida';
    } else {
        const date = new Date(values.issueDate);
        if (values.dueDate === '') {
            errors.dueDate = 'La fecha de vencimiento es requerida';
        } else {
            const date2 = new Date(values.dueDate);
            if (date >= date2) {
                errors.issueDate = 'La fecha de giro debe ser menor a la de vencimiento';
            } else if (date >= date3) {
                errors.issueDate = 'La fecha de giro debe ser menor a la de descuento';
            } else if (date2 <= date3) {
                errors.dueDate = 'La fecha de vencimiento debe ser mayor a la de descuento'
            }
        }
    }

    if (values.amount === '') {
        errors.amount = 'El monto es requerido';
    } else if (values.amount < 100) {
        errors.amount = 'El monto debe ser mayor o igual a 100';
    }

    if (values.retention < 0) {
        errors.retention = 'La debe ser mayor o igual a cero';
    }

    return errors;

}