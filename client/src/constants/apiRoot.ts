let apiRoot = ''

console.log('🚀 ~ import.meta.env:', import.meta.env)
console.log('🚀 ~ process.env:', process.env)

if (process.env.BUILD_MODE === 'dev') {
  if (process.env.BACKEND_URL !== undefined) {
    apiRoot = process.env.BACKEND_URL
  } else {
    console.error('BACKEND_URL is not defined in the environment variables.')
  }
}
if (process.env.BUILD_MODE === 'production') {
  // Todo
}

console.log('🚀 ~ apiRoot:', apiRoot)
export const API_ROOT = apiRoot
