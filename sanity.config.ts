import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { schema } from './src/sanity/schema';

export default defineConfig({
  name: 'national-fia',
  title: 'National Federation of Insurance Agents',
  basePath: '/admin',
  projectId: '5cd2hsgo',
  dataset: 'production',
  cdn: true,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: '2024-09-18' })],
});
