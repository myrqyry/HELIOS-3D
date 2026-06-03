import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const redirectMap = {
  'docs/abstract/': 'docs/established/abstract/',
  'docs/candidate-materials-and-mechanisms/': 'docs/established/candidate-materials-and-mechanisms/',
  'docs/literature-review/': 'docs/established/literature-review/',
  'docs/mathematics/': 'docs/established/mathematics/',
  'docs/glossary/': 'docs/established/glossary/',
  'docs/alternative-materials-and-methods/': 'docs/current/alternative-materials-and-methods/',
  'docs/open-questions/': 'docs/current/open-questions/',
  'docs/targets-comparators-and-projections/': 'docs/current/targets-comparators-and-projections/',
  'docs/claims-matrix/': 'docs/current/claims-matrix/',
  'docs/core-architecture/': 'docs/speculative/core-architecture/',
  'docs/proposed-fabrication-path-and-control/': 'docs/speculative/proposed-fabrication-path-and-control/',
  'docs/defensive-framework/': 'docs/speculative/defensive-framework/',
  'docs/pitch-deck-outline/': 'docs/speculative/pitch-deck-outline/',
  'docs/deployment/': 'docs/project-ops/deployment/',
};

export default defineConfig({
  site: 'https://myrqyry.github.io',
  base: '/HELIOS-3D',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [react(), mdx(), sitemap()],
  redirects: redirectMap,
  vite: {
    plugins: [tailwindcss()],
  },
});
