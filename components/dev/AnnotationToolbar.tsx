'use client';

import dynamic from 'next/dynamic';

/**
 * Agentation visual-feedback toolbar — DEVELOPMENT ONLY.
 *
 * Click the toolbar (bottom-right), then click any element on the page to
 * annotate it; annotations post to the local agentation-mcp server on :4747,
 * where the coding agent reads them over MCP. This closes the loop that has
 * been running through screenshots and prose so far.
 *
 * Two guards keep it out of production:
 *  — the module is only imported when NODE_ENV !== 'production', so the
 *    bundler tree-shakes the whole thing out of the build;
 *  — `ssr: false` so it never renders on the server (it reads window/DOM).
 *
 * `endpoint` is the agent-sync server. With no server running the toolbar
 * still works locally (copy-to-clipboard mode); it just won't sync.
 */
const Agentation =
  process.env.NODE_ENV !== 'production'
    ? dynamic(() => import('agentation').then((m) => m.Agentation), { ssr: false })
    : null;

export function AnnotationToolbar() {
  if (!Agentation) return null;
  return <Agentation endpoint="http://localhost:4747" />;
}
