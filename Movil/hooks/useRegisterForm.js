import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'

import { registerUser, loginUser } from '../services/authService'
import { mapAuthError } from '../constants/authErrors'

export function useRegisterForm() {
  const router = useRouter()
  const [requestError, setRequestError] = useState(null)

  const form = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  // Limpia el error de servidor en cuanto el usuario vuelve a escribir.
  const clearServerError = () => {
    if (requestError) setRequestError(null)
  }

  const submit = form.handleSubmit(async ({ name, lastName, email, password }) => {
    setRequestError(null)

    try {
      await registerUser(name, lastName, email, password)
      await loginUser(email, password)
      router.replace('/(main)/home')
    } catch (err) {
      setRequestError(mapAuthError(err))
    }
  })

  return {
    form,
    requestError,
    clearServerError,
    submit,
    isSubmitting: form.formState.isSubmitting,
  }
}
