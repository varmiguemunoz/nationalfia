import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schemas/blockContent';
import category from './schemas/category';
import posts from './schemas/post';
import author from './schemas/author';
import featuredPost from './schemas/featuredPost';
import agents from './schemas/agents';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [agents, posts, author, category, blockContent, featuredPost],
};
