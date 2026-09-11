import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { visit } from 'unist-util-visit';

function remarkMathJax() {
  return (tree: unknown) => {
    visit(tree as never, (node: { type: string; value: string; position?: { start: { offset: number }; end: { offset: number } }; data?: Record<string, unknown> }) => {
      if (node.type === 'inlineMath' || node.type === 'math') {
        const len = node.value.length;
        const span = node.position ? node.position.end.offset - node.position.start.offset : 0;
        const isDisplay = node.type === 'math' || span >= len + 4;

        if (isDisplay) {
          node.data = {
            hName: 'span',
            hProperties: { className: ['math', 'math-display', 'block', 'my-4', 'text-center', 'overflow-x-auto'] },
            hChildren: [{ type: 'text', value: `$$${node.value}$$` }],
          };
        } else {
          node.data = {
            hName: 'span',
            hProperties: { className: ['math', 'math-inline'] },
            hChildren: [{ type: 'text', value: `$${node.value}$` }],
          };
        }
      }
    });
  };
}

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkMath, remarkMathJax],
      }),
    },
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
  },
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
  },
});
