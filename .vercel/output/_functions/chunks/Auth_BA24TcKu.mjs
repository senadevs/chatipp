import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React__default from 'react';
import { u as useToast, a as useAuth, I as Input, B as Button } from './input_9xorTJV3.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, L as Label, e as CardFooter } from './label_CN2xJpoi.mjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chrome } from 'lucide-react';

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});
function Auth({ mode = "login" }) {
  const { toast } = useToast();
  const { login, register, loginWithGoogle, loginDemo } = useAuth();
  const [loading, setLoading] = React__default.useState(false);
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(authSchema)
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (mode === "login") {
        await login(data.email, data.password);
        toast({
          title: "Success",
          description: "Successfully logged in"
        });
      } else {
        await register(data.email, data.password);
        toast({
          title: "Success",
          description: "Registration successful"
        });
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: mode === "login" ? "Failed to log in" : "Failed to register",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to login with Google",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDemoLogin = () => {
    loginDemo();
    window.location.href = "/";
  };
  return /* @__PURE__ */ jsxs(Card, { className: "w-[350px] shadow-lg", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-1 pb-4", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: mode === "login" ? "Login" : "Register" }),
      /* @__PURE__ */ jsx(CardDescription, { children: mode === "login" ? "Enter your credentials to access your account" : "Create a new account" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-sm", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              ...registerForm("email"),
              className: `h-9 ${errors.email ? "border-destructive" : ""}`
            }
          ),
          errors.email && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive mt-1", children: errors.email.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "text-sm", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              ...registerForm("password"),
              className: `h-9 ${errors.password ? "border-destructive" : ""}`
            }
          ),
          errors.password && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive mt-1", children: errors.password.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative my-2", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "w-full border-t" }) }),
          /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-background px-2 text-muted-foreground", children: "Or continue with" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleGoogleLogin,
              disabled: loading,
              className: "h-9",
              children: [
                /* @__PURE__ */ jsx(Chrome, { className: "mr-2 h-4 w-4" }),
                "Google"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleDemoLogin,
              disabled: loading,
              className: "h-9",
              children: "Try Demo"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col gap-3 pt-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full h-9", disabled: loading, children: loading ? "Loading..." : mode === "login" ? "Sign In" : "Sign Up" }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-center space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: mode === "login" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "Don't have an account?",
            " ",
            /* @__PURE__ */ jsx("a", { href: "/register", className: "text-primary hover:underline", children: "Sign up" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Already have an account?",
            " ",
            /* @__PURE__ */ jsx("a", { href: "/login", className: "text-primary hover:underline", children: "Sign in" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: /* @__PURE__ */ jsx("a", { href: "/chat", className: "text-primary hover:underline", children: "Continue as guest" }) })
        ] })
      ] })
    ] })
  ] });
}

export { Auth as A };
