import { createClient } from 'microcms-js-sdk'

import { microCMSApiKey, microCMSServiceDomain } from '@/config'

export const client = createClient({
  serviceDomain: microCMSServiceDomain,
  apiKey: microCMSApiKey
})
