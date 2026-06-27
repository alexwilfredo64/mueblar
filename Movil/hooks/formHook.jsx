import { useState, useEffect } from "react"

class FormStore {
    constructor(initialValues = {}) {
        this.values = initialValues
        this.errors = {}
        this.rules = {}
        this.listeners = []
    }

    registerRules(name, rules) {
        this.rules[name] = rules
    }

    validateField(name, value) {
        const rules = this.rules[name]

        if ( !rules ) return true

        if (rules.required && !value) {
            this.errors[name] = { message: rules.required }
            return false
        }

        if ( rules.minLength && value.length < rules.minLength.value ) {
            this.errors[name] = { message: rules.minLength.message }
            return false
        }

        if ( rules.maxLength && value.length < rules.maxLength.value ) {
            this.errors[name] = { message: rules.maxLength.message }
            return false
        }

        if ( rules.pattern && !rules.pattern.value.test(value) ) {
            this.errors[name] = { message: rules.pattern.message }
            return false
        }

        if ( rules.validate && typeof rules.validate === "function" ) {
            const { result, message } = rules.validate(value)
            if(!result) {
                this.errors[name] = { message: message }
                return false
            }
        }

        delete this.errors[name]
        return true
    }

    setValues(name, newValue) {
        this.values[name] = newValue
        this.validateField(name, newValue)
        this.listeners.forEach(listener => listener({
            name,
            value: newValue,
            errors: {...this.errors }
        }))
    }

    subscribe(cb) {
        this.listeners.push(cb)
        return () => {
            this.listeners = this.listeners.filter(l => l !== cb)
        }
    }
}


export function useForm ({initialValues = {}}) {
    const [store] = useState(() => new FormStore(initialValues))
    const [errors, setErrors] = useState({})

    useEffect(() => {
        return store.subscribe((payload) => {
            setErrors(payload.errors)
        })
    }, [store])

    const handleSubmit = (onSubmitCallback) => {
        return () => {
            let isFormValid = true
            Object.keys(store.values).forEach((name) => {
                const isValid = store.validateField(name, store.values[name])
                if (!isValid) isFormValid = false
            })

            setErrors({ ...store.errors })

            if ( isFormValid ) {
                onSubmitCallback( store.values )
            }
        }
    }


    return {
        control: store,
        handleSubmit,
        errors
    }
}

export function Controller({ name, control, rules, render }) {
    const value = control.values[name] || ''

    useEffect(() => {
        if (rules) {
            control.registerRules(name, rules)
        }
    }, [name, control, rules])

    const onChangeText = (text) => {
        control.setValues(name, text)
    }

    return render({
        field: { value, onChangeText }
    })
}

export function useWatch ({ control, name, defaultValue = '' }) {
    const [currentValue, setCurrentValue] = useState(control.values[name] || defaultValue)

    useEffect(() => {
        const unsubscribe = control.subscribe((payload) => {
            if (payload.name === name) {
                setCurrentValue(payload.value)
            }
        })

        return () => unsubscribe()
    }, [control, name])

    return currentValue
}