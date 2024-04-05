import { useState } from 'react'

const useForm = (initialValues:any, isLoadingInit?:boolean) => {
  const [cred, setCred] = useState(initialValues)
  const [isLoading, setIsLoading] = useState(isLoadingInit || false)
  const [errors, setErrors] = useState({...initialValues, general:""})

  const changeCred = (key:string, value:any) => {
    clearErrors()
    setCred({
      ...cred,
      [key]: value
    })
  }
  
  const clearCred = () => {
    clearErrors()
    setCred(initialValues)
  }
  
  const changeError = (key:string, value:any) => {
    setErrors({
      ...errors,
      [key]: value
    })
  }
  
  const clearErrors = () => {
    setErrors({...initialValues, general:""})
  }

  return {
    cred,
    changeCred,
    changeError,
    errors,
    isLoading,
    setIsLoading,
    clearErrors,
    clearCred
  }
}

export default useForm