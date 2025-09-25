import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'b5z0ttxw',
  dataset: 'production',
  apiVersion: '2024-09-18',
  useCdn: true,
});

export default sanityClient;
