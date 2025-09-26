import sanityClient from './sanityClient';
import groq from 'groq';

async function getFeaturedBlog() {
  return sanityClient.fetch(groq`*[_type == 'featuredsection']{
    featuredpost-> {
     _id,
      title,
      publishedAt,
      author -> {
        name,
        position,
        "slugAuthor": slug.current,
        "altAuthor": image.alt,
        "authorImage": image.asset -> url
      },
      "slug": slug.current,
      "alt": mainImage.alt,
      "mainImage": mainImage.asset->url,
    }
  }`);
}

async function getBlogs() {
  try {
    return await sanityClient.fetch(groq`*[_type == "post"] {
  "slug": slug.current,
    title,
    description,
    _id,
    publishedAt,
    "alt": mainImage.alt,
    "mainImage": mainImage.asset->url
}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getBlog(slug: string) {
  try {
    const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    _id,
    author -> {
        name,
        position,
        "slugAuthor": slug.current,
        "altAuthor": image.alt,
        "authorImage": image.asset -> url
      },
    body,
    description,
    publishedAt,
    "alt": mainImage.alt,
    "mainImage": mainImage.asset->url
}
    `;

    return await sanityClient.fetch(query, {
      slug,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAgent(slug: string) {
  try {
    const query = groq`
      *[_type == "agent" && slug.current == $slug][0] {
        _id,
        "slug": slug.current,
        fullname,
        scheduleurl,
        email,
        phone,
        license,
        npn,
        license_states,
        bio,
        publishedAt,
        "alt": headshot.alt,
        "headshot": headshot.asset->url
      }
    `;
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllAgents() {
  try {
    const query = groq`
      *[_type == "agent"] | order(fullname asc) {
        _id,
        "slug": slug.current,
        fullname,
        scheduleurl,
        email,
        phone,
        license,
        npn,
        license_states,
        bio,
        publishedAt,
        "alt": headshot.alt,
        "headshot": headshot.asset->url
      }
    `;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getBlogs, getBlog, getFeaturedBlog, getAgent, getAllAgents };
