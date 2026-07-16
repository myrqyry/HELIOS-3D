import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { OverviewPage } from './pages/OverviewPage';
import { StartHerePage } from './pages/StartHerePage';
import { FiguresPage } from './pages/FiguresPage';
import { ResearchIndexPage } from './pages/ResearchIndexPage';
import { ResearchDetailPage } from './pages/ResearchDetailPage';
import { DocsPage } from './pages/DocsPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="start-here" element={<StartHerePage />} />
          <Route path="figures" element={<FiguresPage />} />
          <Route path="research" element={<ResearchIndexPage />} />
          <Route path="research/:id" element={<ResearchDetailPage />} />
          <Route path="docs/:stage/:slug" element={<DocsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
