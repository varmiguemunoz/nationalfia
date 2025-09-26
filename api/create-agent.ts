import type { VercelRequest, VercelResponse } from '@vercel/node';

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5cd2hsgo',
  dataset: 'production',
  apiVersion: '2024-09-18',
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullname, scheduleurl, email, phone, license, npn, license_states, bio, headshotUrl } = req.body;

    const newAgent = await sanityClient.create({
      _type: 'agent',
      fullname,
      slug: {
        _type: 'slug',
        current: fullname
          .toLowerCase()
          .normalize()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9\-]+/g, '')
          .replace(/^-+|-+$/g, '')
          .slice(0, 96),
      },
      scheduleurl,
      email,
      phone,
      license,
      npn,
      license_states,
      bio,
      headshot: headshotUrl
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: headshotUrl,
            },
          }
        : undefined,
      publishedAt: new Date().toISOString(),
    });

    return res.status(201).json(newAgent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating agent' });
  }
}
