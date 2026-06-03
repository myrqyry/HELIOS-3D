import { defineCollection } from 'astro:content';
import { docsSchema, figuresSchema } from './utils/schemas';

const docs = defineCollection({
  type: 'content',
  schema: docsSchema,
});

const figures = defineCollection({
  type: 'data',
  schema: figuresSchema,
});

export const collections = { docs, figures };
