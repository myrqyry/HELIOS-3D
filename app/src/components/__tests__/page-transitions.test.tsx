import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { PageTransition, AnimatedRoutes } from '../../App';
import { Layout } from '../Layout';

describe('Framer Motion page transition animations', () => {
  it('renders standard route wrapped with prose-custom styling', () => {
    const markup = renderToStaticMarkup(
      <PageTransition isExhibit={false}>
        <div>Overview Content</div>
      </PageTransition>
    );

    expect(markup).toContain('prose-custom');
    expect(markup).toContain('Overview Content');
  });

  it('renders exhibit route wrapped with exhibit-main full-width styling', () => {
    const markup = renderToStaticMarkup(
      <PageTransition isExhibit={true}>
        <div>Cosmos 3D Stage</div>
      </PageTransition>
    );

    expect(markup).toContain('exhibit-main');
    expect(markup).toContain('Cosmos 3D Stage');
  });

  it('renders animated routes seamlessly within Layout on /explore', () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter initialEntries={['/explore']}>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </MemoryRouter>
    );

    expect(markup).toContain('exhibit-main');
    expect(markup).toContain('HELIOS-3D');
  });

  it('renders animated routes within Layout on /evidence with persistent sidebar', () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter initialEntries={['/evidence']}>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </MemoryRouter>
    );

    expect(markup).toContain('prose-custom');
    expect(markup).toContain('Evidence');
    expect(markup).toContain('Established Basis');
  });
});
