import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export function Layout() {
  const { pathname } = useLocation();
  const isExhibitPage = pathname === '/' || pathname === '/explore';
  const showSidebar = !isExhibitPage;

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-obsidian-1 focus:px-4 focus:py-2 focus:text-amber focus:outline-none focus:ring-2 focus:ring-amber"
      >
        Skip to main content
      </a>
      <Header />
      <div className={`flex-1 ${showSidebar ? 'flex' : ''}`}>
        {showSidebar && <Sidebar />}
        <main id="main-content" className="flex-1 min-w-0">
          {isExhibitPage ? (
            <div className="w-full exhibit-main">
              <Outlet />
            </div>
          ) : (
            <article className="mx-auto max-w-3xl px-6 py-12 prose-custom">
              <Outlet />
            </article>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
