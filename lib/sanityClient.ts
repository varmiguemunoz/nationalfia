import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5cd2hsgo',
  dataset: 'production',
  apiVersion: '2024-09-18',
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});

export default sanityClient;
