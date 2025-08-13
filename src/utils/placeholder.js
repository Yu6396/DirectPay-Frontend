import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const placeholder = (label) => {
  switch (label) {
    case "firstName":
      return "FirstName"

    case "lastName":
      return "LastName"

    case "email":
      return "Email"

    case "password":
      return "Password"
    case "phone":
      return "Phone"

    default:
      return ""
  }
}



export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

