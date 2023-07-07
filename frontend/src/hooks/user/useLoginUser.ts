import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../../config/axiosInstance'
import AuthContext from '../../context/AuthContext'

export interface LoginValues {
  email: string
  password: string
}

const useLoginUser = (): {
  onSubmit: (data: LoginValues) => void
  isLoading: boolean
} => {
  const { logIn, logOut } = useContext(AuthContext)

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async ({ email, password }: { email: string, password: string }) => {
      return await axiosInstance.post('/login', { email, password })
    },
    onSuccess: (data) => {
      const { user, token } = data?.data
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

  const onSubmit = (data: LoginValues): void => {
    const { email, password } = data
    login({ email, password })
  }

  return {
    onSubmit, isLoading
  }
}

export default useLoginUser
