import config from "@/config"
import { LS_TOKEN } from "@/constants"
import { ClassValue, clsx } from "clsx"
import { jwtDecode } from "jwt-decode"
import isArray from "lodash/isArray"
import isString from "lodash/isString"
import omitBy from "lodash/omitBy"
export * from "./sweetalertConfig"

export const cn = (...classes: ClassValue[]) => clsx(classes)

export const isBrowser = () => typeof window !== "undefined"

export const handleSingout = () => {
  localStorage.removeItem(LS_TOKEN)
  const isAdmin = window.location.pathname.startsWith("/admin")
  window.location.href = config.SIGN_IN_URL
}

// convert to normal case
export const toNormalCase = (string: any) => {
  if (typeof string !== "string") return
  const result = string
    .toLowerCase() // Convert the string to lowercase
    .replace(/[^A-Za-z0-9]/gi, " ")
    .replace(/([A-Z])/g, " $1")
    .trim()
  return result.charAt(0).toUpperCase() + result.slice(1)
}

// Capitalize only the first letter of the string
export const capitalizeFirst = (string: any) => toNormalCase(string)

// To Lower Case
export const toLowerCase = (string: any) => (typeof string === "string" ? string.toLowerCase() : string)

export const isUrl = (string: string) => {
  try {
    new URL(string)
  } catch (_) {
    return false
  }

  return true
}

export const getRandomFromArray = (numbers = []) => numbers[Math.floor(Math.random() * numbers.length)]

export const formatPrice = (price = 0) => price.toFixed(2)

export const formatCurrency = (price = 0, currency = "BDT") => `${currency} ${formatPrice(price)}`

export const formatNumberWithPadding = (number: number, minimumDigits = 2) =>
  number.toString().padStart(minimumDigits, "0")

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "INCOMPLETE":
      return "dark"
    case "DECLINED":
      return "danger"
    case "APPROVED":
      return "primary"
    case "REVERSED":
      return "light"
    case "REFUNDED":
      return "info"
    case "CANCELLED":
      return "danger"
    default:
      return "warning"
  }
}

export const formatSearch = (searchKey: string) => searchKey.trim().replace(/\s+/g, "%")

export const formatParams = (params: any) => omitBy(params, value => value == null || value === "")

export const getRandomNumber = () => Math.floor(Math.random() * 100000)

// getNavItems
export const getNavItems = (navItems: any, permissions: any) => {
  const filteredNavItems = navItems.filter((item: any) => {
    if (item.permissions) {
      return item.permissions.some((permission: any) => permissions.includes(permission))
    }

    return true
  })

  return filteredNavItems
}

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode(token)
    return decoded
  } catch (error) {
    return null
  }
}

export const getOptions = (list: { data: any[] }, label: string, value: string) => {
  return (list?.data || [])?.map(item => ({
    value: item[value],
    label: item[label],
  }))
}

export const getErrorMessage = (error: any) => {
  const errorDetail = error?.data?.detail
  if (isString(errorDetail)) return errorDetail
  if (isArray(errorDetail)) {
    const [firstError] = errorDetail
    const { loc, msg } = firstError
    const field = loc[loc.length - 1]
    // return `${field}: ${msg}`
    console.log(`🔥 | field:`, field)
    return msg
  }
  return "Something went wrong"
}
