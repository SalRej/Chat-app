import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../../config/axiosInstance'
import AuthContext from '../../context/AuthContext'

export interface RegistrationValues {
  email: string
  name: string
  password: string
  confirmPassword: string
}
const useRegisterUser = (): {
  onSubmit: (data: RegistrationValues) => void
  isLoading: boolean
} => {
  const { logIn, logOut } = useContext(AuthContext)

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: async ({ email, password, confirmPassword, name }: RegistrationValues) => {
      return await axiosInstance.post('/user', {
        email,
        password,
        confirmPassword,
        name
      })
    },
    onSuccess: (data) => {
      const { user, token } = data.data
      logIn(user, token)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Something went wrong, check your inputs', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })

      logOut()
    }
  })

  const onSubmit = (data: RegistrationValues): void => {
    const { email, password, confirmPassword, name } = data
    registerUser({
      email,
      name,
      password,
      confirmPassword
    })
  }

  return {
    onSubmit,
    isLoading
  }
}

export default useRegisterUser
