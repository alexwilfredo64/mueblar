export function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email) return 'El correo es obligatorio.'
    if (!regex.test(email)) return 'Ingresa un correo válido.'
    return null
}

export function validatePassword(password) {
    if (!password) return 'La contraseña es obligatoria.'
    if (password.length < 8) return 'Debe tener al menos 8 caracteres.'
    if (!/[A-Z]/.test(password)) return 'Debe incluir al menos una letra mayúscula.'
    if (!/[a-z]/.test(password)) return 'Debe incluir al menos una letra minúscula.'
    if (!/[0-9]/.test(password)) return 'Debe incluir al menos un número.'
    if (!/[^A-Za-z0-9]/.test(password)) return 'Debe incluir al menos un carácter especial (ej: @, #, $, !).'
    return null
}

export function validateName(name) {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/
    if (!name.trim()) return 'El nombre es obligatorio.'
    if (!regex.test(name)) return 'El nombre solo puede contener letras y espacios.'
    return null
}