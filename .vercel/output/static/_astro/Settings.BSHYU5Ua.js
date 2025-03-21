import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.C-1C7K5d.js";import{b as ie,P as m,c as b,a as ce,u as de,B as le}from"./button.DB3euxDd.js";import{C as P,a as I,b as E,c as _,d as M,L as x}from"./label.djoZmTif.js";import{u as F,c as D,a as j,b as ue,P as fe,d as pe}from"./index.DogxjsyZ.js";import{c as V,R as he,I as me,u as be}from"./index.Co2ShNjJ.js";import{I as A}from"./input.D_t8jYCD.js";import"./index.BeJBZjGA.js";function ve(t){const s=i.useRef({value:t,previous:t});return i.useMemo(()=>(s.current.value!==t&&(s.current.previous=s.current.value,s.current.value=t),s.current.previous),[t])}var w="Switch",[ge,Fe]=D(w),[xe,je]=ge(w),$=i.forwardRef((t,s)=>{const{__scopeSwitch:a,name:n,checked:r,defaultChecked:d,required:o,disabled:l,value:p="on",onCheckedChange:h,form:u,...c}=t,[f,ae]=i.useState(null),ne=ie(s,g=>ae(g)),y=i.useRef(!1),R=f?u||!!f.closest("form"):!0,[v=!1,oe]=F({prop:r,defaultProp:d,onChange:h});return e.jsxs(xe,{scope:a,checked:v,disabled:l,children:[e.jsx(m.button,{type:"button",role:"switch","aria-checked":v,"aria-required":o,"data-state":G(v),"data-disabled":l?"":void 0,disabled:l,value:p,...c,ref:ne,onClick:j(t.onClick,g=>{oe(re=>!re),R&&(y.current=g.isPropagationStopped(),y.current||g.stopPropagation())})}),R&&e.jsx(ye,{control:f,bubbles:!y.current,name:n,value:p,checked:v,required:o,disabled:l,form:u,style:{transform:"translateX(-100%)"}})]})});$.displayName=w;var L="SwitchThumb",B=i.forwardRef((t,s)=>{const{__scopeSwitch:a,...n}=t,r=je(L,a);return e.jsx(m.span,{"data-state":G(r.checked),"data-disabled":r.disabled?"":void 0,...n,ref:s})});B.displayName=L;var ye=t=>{const{control:s,checked:a,bubbles:n=!0,...r}=t,d=i.useRef(null),o=ve(a),l=ue(s);return i.useEffect(()=>{const p=d.current,h=window.HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(h,"checked").set;if(o!==a&&c){const f=new Event("click",{bubbles:n});c.call(p,a),p.dispatchEvent(f)}},[o,a,n]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:a,...r,tabIndex:-1,ref:d,style:{...t.style,...l,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function G(t){return t?"checked":"unchecked"}var H=$,Ce=B;const C=i.forwardRef(({className:t,...s},a)=>e.jsx(H,{className:b("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",t),...s,ref:a,children:e.jsx(Ce,{className:b("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")})}));C.displayName=H.displayName;var T="Tabs",[ke,De]=D(T,[V]),q=V(),[Ne,S]=ke(T),z=i.forwardRef((t,s)=>{const{__scopeTabs:a,value:n,onValueChange:r,defaultValue:d,orientation:o="horizontal",dir:l,activationMode:p="automatic",...h}=t,u=pe(l),[c,f]=F({prop:n,onChange:r,defaultProp:d});return e.jsx(Ne,{scope:a,baseId:be(),value:c,onValueChange:f,orientation:o,dir:u,activationMode:p,children:e.jsx(m.div,{dir:u,"data-orientation":o,...h,ref:s})})});z.displayName=T;var K="TabsList",O=i.forwardRef((t,s)=>{const{__scopeTabs:a,loop:n=!0,...r}=t,d=S(K,a),o=q(a);return e.jsx(he,{asChild:!0,...o,orientation:d.orientation,dir:d.dir,loop:n,children:e.jsx(m.div,{role:"tablist","aria-orientation":d.orientation,...r,ref:s})})});O.displayName=K;var U="TabsTrigger",W=i.forwardRef((t,s)=>{const{__scopeTabs:a,value:n,disabled:r=!1,...d}=t,o=S(U,a),l=q(a),p=J(o.baseId,n),h=Q(o.baseId,n),u=n===o.value;return e.jsx(me,{asChild:!0,...l,focusable:!r,active:u,children:e.jsx(m.button,{type:"button",role:"tab","aria-selected":u,"aria-controls":h,"data-state":u?"active":"inactive","data-disabled":r?"":void 0,disabled:r,id:p,...d,ref:s,onMouseDown:j(t.onMouseDown,c=>{!r&&c.button===0&&c.ctrlKey===!1?o.onValueChange(n):c.preventDefault()}),onKeyDown:j(t.onKeyDown,c=>{[" ","Enter"].includes(c.key)&&o.onValueChange(n)}),onFocus:j(t.onFocus,()=>{const c=o.activationMode!=="manual";!u&&!r&&c&&o.onValueChange(n)})})})});W.displayName=U;var X="TabsContent",Y=i.forwardRef((t,s)=>{const{__scopeTabs:a,value:n,forceMount:r,children:d,...o}=t,l=S(X,a),p=J(l.baseId,n),h=Q(l.baseId,n),u=n===l.value,c=i.useRef(u);return i.useEffect(()=>{const f=requestAnimationFrame(()=>c.current=!1);return()=>cancelAnimationFrame(f)},[]),e.jsx(fe,{present:r||u,children:({present:f})=>e.jsx(m.div,{"data-state":u?"active":"inactive","data-orientation":l.orientation,role:"tabpanel","aria-labelledby":p,hidden:!f,id:h,tabIndex:0,...o,ref:s,style:{...t.style,animationDuration:c.current?"0s":void 0},children:f&&d})})});Y.displayName=X;function J(t,s){return`${t}-trigger-${s}`}function Q(t,s){return`${t}-content-${s}`}var we=z,Z=O,ee=W,te=Y;const Te=we,se=i.forwardRef(({className:t,...s},a)=>e.jsx(Z,{ref:a,className:b("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",t),...s}));se.displayName=Z.displayName;const k=i.forwardRef(({className:t,...s},a)=>e.jsx(ee,{ref:a,className:b("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",t),...s}));k.displayName=ee.displayName;const N=i.forwardRef(({className:t,...s},a)=>e.jsx(te,{ref:a,className:b("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",t),...s}));N.displayName=te.displayName;function Ve(){const{user:t}=ce(),{toast:s}=de(),[a,n]=i.useState(!0),[r,d]=i.useState(!1),o=()=>{s({title:"Settings saved",description:"Your preferences have been updated"})};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold tracking-tight",children:"Settings"}),e.jsx("p",{className:"text-muted-foreground",children:"Manage your account settings and preferences."})]}),e.jsxs(Te,{defaultValue:"general",className:"space-y-4",children:[e.jsxs(se,{children:[e.jsx(k,{value:"general",children:"General"}),e.jsx(k,{value:"notifications",children:"Notifications"})]}),e.jsx(N,{value:"general",className:"space-y-4",children:e.jsxs(P,{children:[e.jsxs(I,{children:[e.jsx(E,{children:"Profile"}),e.jsx(_,{children:"Update your personal information."})]}),e.jsxs(M,{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(x,{htmlFor:"name",children:"Name"}),e.jsx(A,{id:"name",defaultValue:t?.name||"Demo User"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(x,{htmlFor:"email",children:"Email"}),e.jsx(A,{id:"email",defaultValue:t?.email||"demo@example.com",disabled:!0})]})]})]})}),e.jsx(N,{value:"notifications",className:"space-y-4",children:e.jsxs(P,{children:[e.jsxs(I,{children:[e.jsx(E,{children:"Notifications"}),e.jsx(_,{children:"Choose what you want to be notified about."})]}),e.jsxs(M,{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(C,{id:"notifications",checked:a,onCheckedChange:n}),e.jsx(x,{htmlFor:"notifications",children:"Enable notifications"})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(C,{id:"marketing",checked:r,onCheckedChange:d}),e.jsx(x,{htmlFor:"marketing",children:"Marketing emails"})]})]})]})})]}),e.jsx(le,{onClick:o,children:"Save changes"})]})}export{Ve as Settings};
