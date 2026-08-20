import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';
import { generateSeoHtml } from './seo-plugin.js';

const rawPagesBasePath = process.env.PAGES_BASE_PATH || '';
const normalizedPagesBasePath = rawPagesBasePath.replace(/^\/+|\/+$/g, '');
const pagesBase = normalizedPagesBasePath ? `/${normalizedPagesBasePath}/` : '/';

const publicAssetDirectoryPattern = /(^|[^A-Za-z0-9._~-])\/(assets|cursors|fonts|images|sounds|textures|videos)\//g;
const publicRootFilePattern = /(^|[^A-Za-z0-9._~-])\/(favico\.png|og-image\.webp|vite\.svg)(?![A-Za-z0-9._~-])/g;
const publicAssetPlaceholder = '/__GITHUB_PAGES_PUBLIC_ASSET__/';

function githubPagesPublicAssetPaths(base) {
  if (base === '/') {
    return { name: 'github-pages-public-asset-paths' };
  }

  return {
    name: 'github-pages-public-asset-paths',
    enforce: 'pre',
    transform(code, id) {
      const isSourceModule = /[/\\]src[/\\]/.test(id) && /\.[cm]?[jt]sx?(?:$|\?)/.test(id);
      if (!isSourceModule) return null;

      const transformed = code
        .replace(publicAssetDirectoryPattern, `$1${publicAssetPlaceholder}$2/`)
        .replace(publicRootFilePattern, `$1${publicAssetPlaceholder}$2`);

      return transformed === code ? null : { code: transformed, map: null };
    },
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type === 'chunk') {
          output.code = output.code.replaceAll(publicAssetPlaceholder, base);
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: pagesBase,
  plugins: [githubPagesPublicAssetPaths(pagesBase), react(), viteCompression(), generateSeoHtml()],
  server: {
    proxy: {
      '/sanity-cdn': {
        target: 'https://cdn.sanity.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sanity-cdn/, '')
      }
    }
  }
})
