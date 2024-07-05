import { createClient } from 'microcms-js-sdk'

import { microCMSApiKey, microCMSServiceDomain } from '@/config'

if (!microCMSServiceDomain) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required')
}

if (!microCMSApiKey) {
  throw new Error('MICROCMS_API_KEY is required')
}

export const client = createClient({
  serviceDomain: microCMSServiceDomain,
  apiKey: microCMSApiKey
})
