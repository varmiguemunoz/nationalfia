import sanityClient from './sanityClient';
import groq from 'groq';

async function getFeaturedBlog() {
  return sanityClient.fetch(groq`*[_type == 'featuredsection']{
    featuredpost-> {
     _id,
      title,
      description,
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
    return await sanityClient.fetch(groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  description,
  "slug": slug.current,
  publishedAt,
  "alt": mainImage.alt,
  "mainImage": mainImage.asset->url,
  "categories": category[]-> { _id, title }
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
    category[]-> { _id, title },
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

async function searchAgents({
  lastName,
  npn,
  license,
}: {
  lastName?: string | null;
  npn?: string | null;
  license?: string | null;
}) {
  const query = groq`
    *[_type == "agent" 
      && ($lastName == null || fullname match $lastName)
      && ($npn == null || npn == $npn)
      && ($license == null || license == $license)
    ] {
      _id,
      "slug": slug.current,
      fullname,
      email,
      phone,
      license,
      npn,
      license_states,
      "headshot": headshot.asset->url,
      "alt": headshot.alt,
      scheduleurl,
      publishedAt,
      bio
    }
  `;

  return sanityClient.fetch(query, {
    lastName: lastName ? `*${lastName}*` : null,
    npn: npn ?? null,
    license: license ?? null,
  });
}

export { getBlogs, getBlog, getFeaturedBlog, getAgent, getAllAgents, searchAgents };

// New: fetch all categories
async function getCategories() {
  try {
    const query = groq`*[_type == "categories"] | order(title asc) {
      _id,
      title,
      description
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// New: fetch blogs by specific category (by category document _id)
async function getBlogsByCategory(categoryId: string) {
  try {
    const query = groq`*[_type == "post" && $categoryId in category[]._ref] | order(publishedAt desc) {
      _id,
      title,
      description,
      "slug": slug.current,
      publishedAt,
      "alt": mainImage.alt,
      "mainImage": mainImage.asset->url,
      "categories": category[]-> { _id, title }
    }`;
    return await sanityClient.fetch(query, { categoryId });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getCategories, getBlogsByCategory };
