import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as renderScript } from '../chunks/astro/server_34OhVmXJ.mjs';
import 'kleur/colors';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { u as useToast, a as useAuth, c as cn, B as Button, I as Input, $ as $$Layout } from '../chunks/input_9xorTJV3.mjs';
import { S as ScrollArea, H as HoverCard, a as HoverCardTrigger, b as HoverCardContent } from '../chunks/hover-card_B7bHlHqE.mjs';
import { ChevronRight, ChevronLeft, MessageSquare, Bot, Paperclip, Send, Check, Copy, FileText, Music, Film, Image } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Highlight, themes } from 'prism-react-renderer';
export { renderers } from '../renderers.mjs';

const AI_MODELS = [
  {
    value: "gpt-4",
    label: "GPT-4",
    description: "Most capable model, best for complex tasks",
    icon: "✨"
  },
  {
    value: "gpt-3.5-turbo",
    label: "GPT-3.5",
    description: "Fast and efficient for most tasks",
    icon: "⚡"
  },
  {
    value: "gemini-pro",
    label: "Gemini",
    description: "Google's most advanced AI model",
    icon: "🌟"
  },
  {
    value: "claude-3",
    label: "Claude 3",
    description: "Exceptional at analysis and writing",
    icon: "🎯"
  },
  {
    value: "mistral-large",
    label: "Mistral",
    description: "Open-source model with strong capabilities",
    icon: "🚀"
  },
  {
    value: "mixtral-8x7b",
    label: "Mixtral",
    description: "Powerful open-source mixture of experts",
    icon: "🔮"
  }
];
const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity",
        onClick: handleCopy,
        children: copied ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      Highlight,
      {
        theme: themes.nightOwl,
        code: children.trim(),
        language: language || "text",
        children: ({ className, style, tokens, getLineProps, getTokenProps }) => /* @__PURE__ */ jsxs("pre", { className: "overflow-x-auto p-4 rounded-lg", style: {
          ...style,
          backgroundColor: "var(--code-bg)",
          marginTop: "1rem",
          marginBottom: "1rem"
        }, children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsx("span", { style: { color: "var(--code-meta)", fontSize: "0.875rem" }, children: language }) }),
          tokens.map((line, i) => /* @__PURE__ */ jsxs("div", { ...getLineProps({ line }), style: { display: "table-row" }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              display: "table-cell",
              paddingRight: "1rem",
              color: "var(--code-line-number)",
              userSelect: "none",
              width: "1%",
              whiteSpace: "nowrap"
            }, children: i + 1 }),
            /* @__PURE__ */ jsx("span", { style: { display: "table-cell" }, children: line.map((token, key) => /* @__PURE__ */ jsx("span", { ...getTokenProps({ token }) }, key)) })
          ] }, i))
        ] })
      }
    )
  ] });
};
const FilePreview = ({ file, type }) => {
  const icon = {
    "image": /* @__PURE__ */ jsx(Image, { className: "h-5 w-5" }),
    "application/pdf": /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }),
    "video": /* @__PURE__ */ jsx(Film, { className: "h-5 w-5" }),
    "audio": /* @__PURE__ */ jsx(Music, { className: "h-5 w-5" })
  }[type.split("/")[0]] || /* @__PURE__ */ jsx(Paperclip, { className: "h-5 w-5" });
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-2 rounded-md bg-muted", children: [
    icon,
    /* @__PURE__ */ jsx("span", { className: "text-sm truncate max-w-[200px]", children: file.name })
  ] });
};
const MessageAttachment = ({ attachment }) => {
  switch (attachment.type) {
    case "image":
      return /* @__PURE__ */ jsx("div", { className: "mt-2 rounded-lg overflow-hidden max-w-sm", children: /* @__PURE__ */ jsx("img", { src: attachment.url, alt: "attachment", className: "w-full h-auto" }) });
    case "pdf":
      return /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: attachment.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-2 p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors",
          children: [
            /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: attachment.name })
          ]
        }
      ) });
    case "video":
      return /* @__PURE__ */ jsx("div", { className: "mt-2 max-w-sm", children: /* @__PURE__ */ jsxs("video", { controls: true, className: "w-full rounded-lg", children: [
        /* @__PURE__ */ jsx("source", { src: attachment.url, type: "video/mp4" }),
        "Your browser does not support the video tag."
      ] }) });
    case "audio":
      return /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs("audio", { controls: true, className: "w-full", children: [
        /* @__PURE__ */ jsx("source", { src: attachment.url, type: "audio/mpeg" }),
        "Your browser does not support the audio tag."
      ] }) });
    default:
      return null;
  }
};
function Chat({ isPublic = false }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const messagesEndRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [chatMode, setChatMode] = useState("chat");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleFileSelect = (e) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to send files",
        variant: "destructive"
      });
      return;
    }
    const selectedFiles = Array.from(e.target.files || []);
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 50 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Total file size cannot exceed 50MB",
        variant: "destructive"
      });
      return;
    }
    setFiles((prev) => [...prev, ...selectedFiles]);
  };
  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;
    const formData = new FormData();
    formData.append("message", input.trim());
    if (isAuthenticated) {
      files.forEach((file) => formData.append("files", file));
    }
    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: /* @__PURE__ */ new Date(),
      attachments: isAuthenticated ? files.map((file) => ({
        type: file.type.split("/")[0],
        url: URL.createObjectURL(file),
        name: file.name
      })) : void 0
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFiles([]);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: data.message || "Lo siento, hubo un error en la respuesta.",
        sender: "bot",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "Lo siento, hubo un error en la conexión.",
        sender: "bot",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const scrollToMessage = (messageId) => {
    setSelectedMessageId(messageId);
    const messageElement = document.getElementById(`message-${messageId}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
      messageElement.classList.add("bg-accent/50");
      setTimeout(() => {
        messageElement.classList.remove("bg-accent/50");
      }, 2e3);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-[calc(100vh-8rem)] w-full flex bg-background relative rounded-lg border", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "bg-card border-r border-border transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-12" : "w-64",
          "relative h-full"
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-3 border-b border-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: cn("font-semibold text-sm", sidebarCollapsed && "hidden"), children: "Chat History" }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => setSidebarCollapsed(!sidebarCollapsed),
                className: "h-8 w-8",
                children: sidebarCollapsed ? /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "p-2 space-y-1", children: [
            messages.map((msg) => /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                className: cn(
                  "w-full justify-start text-left p-2 h-auto",
                  sidebarCollapsed && "hidden",
                  selectedMessageId === msg.id && "bg-accent"
                ),
                onClick: () => scrollToMessage(msg.id),
                children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 w-full", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: msg.timestamp.toLocaleTimeString() }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: msg.sender === "user" ? "You" : "Bot" })
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm truncate", children: [
                    msg.content.substring(0, 30),
                    msg.content.length > 30 && "..."
                  ] })
                ] })
              },
              msg.id
            )),
            messages.length === 0 && /* @__PURE__ */ jsx("p", { className: cn("text-sm text-muted-foreground p-2", sidebarCollapsed && "hidden"), children: "No messages yet" })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsx(ScrollArea, { className: "flex-1 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto py-4 space-y-6", children: [
        messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center text-muted-foreground", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Welcome to the chat!" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Start a conversation by sending a message." })
        ] }),
        messages.map((message) => /* @__PURE__ */ jsx(
          "div",
          {
            id: `message-${message.id}`,
            className: cn(
              "flex w-full transition-colors duration-300 rounded-lg p-2",
              message.sender === "user" ? "justify-end" : "justify-start"
            ),
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "rounded-lg px-4 py-2 max-w-[90%] transition-all",
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                ),
                children: [
                  message.sender === "bot" ? /* @__PURE__ */ jsx("div", { className: "markdown-content", children: /* @__PURE__ */ jsx(
                    ReactMarkdown,
                    {
                      remarkPlugins: [remarkGfm],
                      components: {
                        code: ({ node, inline, className, children, ...props }) => {
                          if (inline) {
                            return /* @__PURE__ */ jsx("code", { className: "bg-muted px-1.5 py-0.5 rounded-md text-sm", ...props, children });
                          }
                          const match = /language-(\w+)/.exec(className || "");
                          const language = match ? match[1] : "text";
                          return /* @__PURE__ */ jsx(CodeBlock, { language, children: String(children).replace(/\n$/, "") });
                        }
                      },
                      children: message.content
                    }
                  ) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm break-words", children: message.content }),
                    message.attachments?.map((attachment, index) => /* @__PURE__ */ jsx(MessageAttachment, { attachment }, index))
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs opacity-50 mt-1 block", children: message.timestamp.toLocaleTimeString() })
                ]
              }
            )
          },
          message.id
        )),
        /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto space-y-4", children: [
        files.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: files.map((file, index) => /* @__PURE__ */ jsx(FilePreview, { file, type: file.type }, index)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative inline-flex h-9 rounded-full border bg-muted p-1 hover:bg-muted/80", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: cn(
                  "relative inline-flex items-center gap-2 rounded-full px-3 text-sm transition-colors",
                  chatMode === "chat" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                ),
                onClick: () => setChatMode("chat"),
                children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: cn(
                  "relative inline-flex items-center gap-2 rounded-full px-3 text-sm transition-colors",
                  chatMode === "agent" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                ),
                onClick: () => setChatMode("agent"),
                children: /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: AI_MODELS.map((model) => /* @__PURE__ */ jsxs(HoverCard, { children: [
            /* @__PURE__ */ jsx(HoverCardTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setSelectedModel(model.value),
                className: cn(
                  "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm transition-colors",
                  selectedModel === model.value ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                ),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "mr-1", children: model.icon }),
                  model.label
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(HoverCardContent, { className: "w-64", children: /* @__PURE__ */ jsx("div", { className: "flex justify-between space-x-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold", children: model.label }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: model.description })
            ] }) }) })
          ] }, model.value)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: isPublic ? "Send a message as guest..." : "Type a message...",
              value: input,
              onChange: (e) => setInput(e.target.value),
              onKeyDown: handleKeyPress,
              className: "flex-1"
            }
          ),
          !isPublic && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                ref: fileInputRef,
                onChange: handleFileSelect,
                multiple: true,
                accept: "image/*,application/pdf,video/*,audio/*",
                className: "hidden"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => fileInputRef.current?.click(),
                children: /* @__PURE__ */ jsx(Paperclip, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { onClick: handleSend, size: "icon", children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }) })
        ] }),
        isPublic && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
          /* @__PURE__ */ jsx("a", { href: "/login", className: "text-primary hover:underline", children: "Sign in" }),
          " ",
          "to send files and access all features"
        ] })
      ] }) })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  Astro2.cookies.get("sb-token")?.value;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Chat Interface" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4"> <div id="auth-check"> ${renderComponent($$result2, "Chat", Chat, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Rebe/Desktop/chati/src/components/Chat", "client:component-export": "default" })} </div> </div> ${renderScript($$result2, "C:/Users/Rebe/Desktop/chati/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/Rebe/Desktop/chati/src/pages/index.astro", void 0);

const $$file = "C:/Users/Rebe/Desktop/chati/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
