import type { APIRoute } from 'astro';
import sanityClient from '../../utils/sanityClient';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { fullname, scheduleurl, email, phone, license, npn, license_states, bio, headshotUrl } = data;

    // crear el documento en Sanity
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

    return new Response(JSON.stringify(newAgent), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Error creating agent' }), {
      status: 500,
    });
  }
};
