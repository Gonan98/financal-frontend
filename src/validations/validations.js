export const rucValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '') {
        return `${fieldName} es requerido`
    }
    return null;
}