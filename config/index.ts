const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  MANUAL_PAYMENT_LINK: process.env.NEXT_PUBLIC_MANUAL_PAYMENT_LINK,
  SIGN_IN_URL: "/",
  LOGO: "data:image/png;base64,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",
}

export default config
