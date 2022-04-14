import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://uptor.vrealsoft.com/api',
  // baseURL: 'https://ad69-37-55-116-204.ngrok.io/api',
})

// here you can define constant's for project or inintial configuration for packages
// response middleware
api.interceptors.response.use(
  response => {
    // here you can check authorized user or not (401) or something global response functions
    return response
  },
  error => {
    // api error handler
    return Promise.reject(error)
  }
)
