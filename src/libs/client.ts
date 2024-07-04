import { microCMSApiKey, microCMSServiceDomain } from '@/config';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: microCMSServiceDomain, 
  apiKey: microCMSApiKey,
});
