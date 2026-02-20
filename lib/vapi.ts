import Vapi from '@vapi-ai/web'



const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
if (!publicKey) {
  throw new Error('NEXT_PUBLIC_VAPI_PUBLIC_KEY environment variable is not set')
}
const vapi = new Vapi(publicKey)

export default vapi