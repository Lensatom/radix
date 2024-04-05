import axios from "axios"

const Instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

export const GET = async (url:string, config?:any) => {
  const token = localStorage.getItem("accessToken")
  const headers = {
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "x-auth-token": token
  }
  try {
    const result = await Instance.get(url, {
      headers: {
        ...headers,
        ...config
      }
    })
    return result
  } catch (error) {
    return error
  }
}

export const POST = async (url:string, data:any, config?:any) => {
  const token = localStorage.getItem("accessToken")
  const headers = {
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "x-auth-token": token
  }
  try {
    const res = await Instance.post(url, data, {
      headers: {
        ...headers,
        ...config
      }
    })
    return res
  } catch (error) {
    return error
  }
}

export const PUT = async (url:string, data:any, config?:any) => {
  const token = localStorage.getItem("accessToken")
  const headers = {
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "x-auth-token": token
  }
  try {
    const res = await Instance.put(url, data, {
      headers: {
        ...headers,
        ...config
      }
    })
    return res
  } catch (error) {
    return error
  }
}