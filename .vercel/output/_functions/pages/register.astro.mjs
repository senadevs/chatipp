import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_34OhVmXJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/input_9xorTJV3.mjs';
import { A as Auth } from '../chunks/Auth_BA24TcKu.mjs';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Register" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container flex items-center justify-center py-8 min-h-[calc(100vh-8rem)]"> ${renderComponent($$result2, "Auth", Auth, { "mode": "register", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Rebe/Desktop/chati/src/components/Auth", "client:component-export": "Auth" })} </div> ` })}`;
}, "C:/Users/Rebe/Desktop/chati/src/pages/register.astro", void 0);

const $$file = "C:/Users/Rebe/Desktop/chati/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
