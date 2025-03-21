import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_34OhVmXJ.mjs';
import 'kleur/colors';
import { c as cn, a as useAuth, u as useToast, I as Input, B as Button, $ as $$Layout } from '../chunks/input_9xorTJV3.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState } from 'react';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, L as Label } from '../chunks/label_CN2xJpoi.mjs';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TabsPrimitive from '@radix-ui/react-tabs';
export { renderers } from '../renderers.mjs';

const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;

const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage your account settings and preferences." })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "general", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "general", children: "General" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "notifications", children: "Notifications" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "general", className: "space-y-4", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Profile" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Update your personal information." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
            /* @__PURE__ */ jsx(Input, { id: "name", defaultValue: user?.name || "Demo User" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(Input, { id: "email", defaultValue: user?.email || "demo@example.com", disabled: true })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "notifications", className: "space-y-4", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Notifications" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Choose what you want to be notified about." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx(
              Switch,
              {
                id: "notifications",
                checked: notifications,
                onCheckedChange: setNotifications
              }
            ),
            /* @__PURE__ */ jsx(Label, { htmlFor: "notifications", children: "Enable notifications" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx(
              Switch,
              {
                id: "marketing",
                checked: marketing,
                onCheckedChange: setMarketing
              }
            ),
            /* @__PURE__ */ jsx(Label, { htmlFor: "marketing", children: "Marketing emails" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Button, { onClick: handleSave, children: "Save changes" })
  ] });
}

const $$Setting = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Settings" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-background"> <div class="container mx-auto py-10"> ${renderComponent($$result2, "Settings", Settings, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Rebe/Desktop/chati/src/components/Settings", "client:component-export": "Settings" })} </div> </div> ` })}`;
}, "C:/Users/Rebe/Desktop/chati/src/pages/setting.astro", void 0);

const $$file = "C:/Users/Rebe/Desktop/chati/src/pages/setting.astro";
const $$url = "/setting";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Setting,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
