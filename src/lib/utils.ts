import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isSuccesscode = (code:number) => {
  return (code >= 200 && code < 300)
}

export const getImageQuery = (title:string) => {
  let imageQuery = ""
  const arr = title.split(" ")
  for (let i = 0; i < arr.length; i++) {
    imageQuery += imageQuery ? `+${arr[i]}` : arr[i]
  }
  return imageQuery
}

export const imageBoxStyle = (url:string) => {
  const imageBox = {
    backgroundImage: `url(${url})`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  }
  return imageBox
}