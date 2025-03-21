import { c as createComponent, b as createAstro, a as renderTemplate, r as renderComponent, g as renderSlot, h as renderHead, i as addAttribute } from './astro/server_34OhVmXJ.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { ChevronRight, Check, Circle, Settings, LogOut, Sun, Moon, Github } from 'lucide-react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';
import { persist } from 'zustand/middleware';
/* empty css                        */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const supabaseUrl = "https://your-project.supabase.co";
const supabaseAnonKey = "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const demoUser = {
  id: "demo-user",
  email: "demo@example.com",
  name: "Demo User",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
};
const useAuth = create()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      setSession: (session) => set({ session, isAuthenticated: !!session }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        set({
          user: data.user,
          session: data.session,
          isAuthenticated: true
        });
      },
      loginWithGoogle: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback`
          }
        });
        if (error) throw error;
      },
      register: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) throw error;
        set({
          user: data.user,
          session: data.session,
          isAuthenticated: true
        });
      },
      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, isAuthenticated: false });
      },
      loginDemo: () => {
        set({
          user: demoUser,
          session: { demo: true },
          isAuthenticated: true
        });
      }
    }),
    {
      name: "auth-storage"
    }
  )
);

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

function UserNav() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "Successfully logged out of your account"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "relative h-8 w-8 rounded-full", children: /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8", children: [
      /* @__PURE__ */ jsx(AvatarImage, { src: user?.avatar_url || "", alt: user?.name || "User" }),
      /* @__PURE__ */ jsx(AvatarFallback, { children: user?.name?.[0] || "U" })
    ] }) }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-none", children: user?.name || "Demo User" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs leading-none text-muted-foreground", children: user?.email || "demo@example.com" })
      ] }) }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "/settings", className: "cursor-pointer flex items-center", children: [
        /* @__PURE__ */ jsx(Settings, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Settings" })
      ] }) }),
      /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: handleLogout, className: "cursor-pointer", children: [
        /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Log out" })
      ] })
    ] })
  ] });
}

function Header() {
  const { isAuthenticated } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setIsDark(theme === "dark");
  }, []);
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };
  if (!mounted) return null;
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container flex h-14 items-center justify-between", children: [
    /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: "Chat App" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      isAuthenticated ? /* @__PURE__ */ jsx(UserNav, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "/login", children: "Sign In" }) }),
        /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "/register", children: "Sign Up" }) })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: toggleTheme,
          className: "h-8 w-8",
          children: isDark ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" })
        }
      )
    ] })
  ] }) });
}

function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Chat App. All rights reserved."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://github.com",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "text-muted-foreground hover:text-foreground transition-colors",
        children: /* @__PURE__ */ jsx(Github, { className: "h-5 w-5" })
      }
    ) })
  ] }) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", '</head> <body class="flex flex-col min-h-screen"> ', ' <main class="flex-1"> ', " </main> ", " <script>\n      const theme = (() => {\n        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {\n          return localStorage.getItem('theme');\n        }\n        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {\n          return 'dark';\n        }\n        return 'light';\n      })();\n      \n      if (theme === 'dark') {\n        document.documentElement.classList.add('dark');\n      } else {\n        document.documentElement.classList.remove('dark');\n      }\n\n      window.localStorage.setItem('theme', theme);\n    <\/script> </body> </html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Rebe/Desktop/chati/src/components/Header", "client:component-export": "Header" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Rebe/Desktop/chati/src/components/Footer", "client:component-export": "Footer" }));
}, "C:/Users/Rebe/Desktop/chati/src/layouts/Layout.astro", void 0);

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

export { $$Layout as $, Button as B, Input as I, useAuth as a, cn as c, useToast as u };
