import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schemas/blockContent';
import category from './schemas/category';
import posts from './schemas/posts';
import author from './schemas/author';
import featuredPost from './schemas/featuredPost';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [posts, author, category, blockContent, featuredPost],
};
