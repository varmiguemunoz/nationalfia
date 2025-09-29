import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5cd2hsgo',
  dataset: 'production',
  apiVersion: '2024-09-18',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

export default sanityClient;
