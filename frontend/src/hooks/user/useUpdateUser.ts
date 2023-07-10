import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../../config/axiosInstance'
import AuthContext from '../../context/AuthContext'
import { useContext } from 'react'

export interface UpdateUserData {
  email?: string
  name?: string
  password?: string
  confirmPassword?: string
  image: any
}
const useUpdateUser = (): {
  onSubmit: (data: UpdateUserData) => void
  handleFileInputChange: (event: any) => void
  isLoading: boolean
} => {
  const { setUser } = useContext(AuthContext)
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiosInstance.put('/user', formData)
    },
    onSuccess: (data) => {
      setUser(data?.data)
    },
    onError: (error) => {
      console.log('error', error)
    }
  })

  const onSubmit = (data: UpdateUserData): any => {
    const { email, name, password, confirmPassword, image } = data
    const formData = new FormData()

    formData.append('email', email as string)
    formData.append('name', name as string)
    formData.append('password', password as string)
    formData.append('confirmPassword', confirmPassword as string)
    formData.append('image', image)
    updateUser(formData)
  }

  const handleFileInputChange = (event: any): void => {
    event.preventDefault()
    const fileInput = event.target.files[0]

    const formData = new FormData()
    formData.append('image', fileInput)
    updateUser(formData)
  }

  return {
    onSubmit,
    handleFileInputChange,
    isLoading
  }
}

export default useUpdateUser
