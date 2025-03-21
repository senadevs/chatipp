import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { c as createExports } from './chunks/entrypoint_DX9R2CLX.mjs';
import { manifest } from './manifest_BiUOWxPN.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth.astro.mjs');
const _page2 = () => import('./pages/api/chat.astro.mjs');
const _page3 = () => import('./pages/chat.astro.mjs');
const _page4 = () => import('./pages/login.astro.mjs');
const _page5 = () => import('./pages/register.astro.mjs');
const _page6 = () => import('./pages/setting.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/auth.ts", _page1],
    ["src/pages/api/chat.ts", _page2],
    ["src/pages/chat.astro", _page3],
    ["src/pages/login.astro", _page4],
    ["src/pages/register.astro", _page5],
    ["src/pages/setting.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7c9140af-70e4-488e-8b19-8ea5a3a85844",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
