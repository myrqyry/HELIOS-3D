import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it } from 'vitest';
import { AnimatedRoutes } from '../../App';
import { Layout } from '../../components/Layout';

describe('All Routes Rendering Test', () => {
  const routes = [
    '/',
    '/explore',
    '/overview',
    '/start-here',
    '/figures',
    '/visuals',
    '/evidence',
    '/technical-archive',
    '/sources',
    '/research',
    '/research/fgt-bilayer-dw',
    '/docs/established/abstract',
    '/docs/established/candidate-materials-and-mechanisms',
    '/docs/established/literature-review',
    '/docs/current/claims-matrix',
    '/docs/current/open-questions',
    '/docs/speculative/pitch-deck-outline',
  ];

  for (const route of routes) {
    it(`renders route ${route} without throwing`, () => {
      expect(() => {
        renderToStaticMarkup(
          <HelmetProvider>
            <MemoryRouter initialEntries={[route]}>
              <Layout>
                <AnimatedRoutes />
              </Layout>
            </MemoryRouter>
          </HelmetProvider>
        );
      }).not.toThrow();
    });
  }
});
