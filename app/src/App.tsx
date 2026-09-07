import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { OverviewPage } from './pages/OverviewPage';
import { StartHerePage } from './pages/StartHerePage';
import { FiguresPage } from './pages/FiguresPage';
import { ResearchIndexPage } from './pages/ResearchIndexPage';
import { ResearchDetailPage } from './pages/ResearchDetailPage';
import { DocsPage } from './pages/DocsPage';
import { VisualsPage } from './pages/VisualsPage';
import { EvidencePage } from './pages/EvidencePage';
import { TechnicalArchivePage } from './pages/TechnicalArchivePage';
import { SourcesPage } from './pages/SourcesPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

interface PageTransitionProps {
  children: ReactNode;
  isExhibit?: boolean;
}

const standardVariants: Variants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(4px)',
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const reducedMotionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function PageTransition({ children, isExhibit = false }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : standardVariants;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={isExhibit ? 'w-full exhibit-main' : 'mx-auto max-w-3xl px-6 py-12 prose-custom'}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route index element={<PageTransition isExhibit><HomePage /></PageTransition>} />
        <Route path="explore" element={<PageTransition isExhibit><HomePage /></PageTransition>} />
        <Route path="overview" element={<PageTransition><OverviewPage /></PageTransition>} />
        <Route path="start-here" element={<PageTransition><StartHerePage /></PageTransition>} />
        <Route path="figures" element={<PageTransition><FiguresPage /></PageTransition>} />
        <Route path="visuals" element={<PageTransition><VisualsPage /></PageTransition>} />
        <Route path="evidence" element={<PageTransition><EvidencePage /></PageTransition>} />
        <Route path="technical-archive" element={<PageTransition><TechnicalArchivePage /></PageTransition>} />
        <Route path="sources" element={<PageTransition><SourcesPage /></PageTransition>} />
        <Route path="research" element={<PageTransition><ResearchIndexPage /></PageTransition>} />
        <Route path="research/:id" element={<PageTransition><ResearchDetailPage /></PageTransition>} />
        <Route path="docs/:stage/:slug" element={<PageTransition><DocsPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}
