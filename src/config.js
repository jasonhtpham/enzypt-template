const environment = 'production'

//put it in production before pushing

export const API_URL =
  environment === 'dev' ? 'http://localhost:3000' : 'https://api.enzypt.io'
export const NETWORK = environment === 'dev' ? 4 : 1
