import{r as m,m as h,j as s}from"./app-BWG1ca1s.js";import{T as n,I as d}from"./TextInput-C3V-6X4s.js";import{I as c}from"./InputLabel-BV9w-rhu.js";import{P as v}from"./PrimaryButton-CwtaFLA7.js";import{z as g}from"./transition-jxwvrod6.js";function I({className:u=""}){const p=m.useRef(),i=m.useRef(),{data:e,setData:a,errors:o,put:w,reset:t,processing:x,recentlySuccessful:f}=h({current_password:"",password:"",password_confirmation:""}),j=r=>{r.preventDefault(),w(route("password.update"),{preserveScroll:!0,onSuccess:()=>t(),onError:l=>{l.password&&(t("password","password_confirmation"),p.current.focus()),l.current_password&&(t("current_password"),i.current.focus())}})};return s.jsxs("section",{className:u,children:[s.jsxs("header",{children:[s.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Update Password"}),s.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Ensure your account is using a long, random password to stay secure."})]}),s.jsxs("form",{onSubmit:j,className:"mt-6 space-y-6",children:[s.jsxs("div",{children:[s.jsx(c,{htmlFor:"current_password",value:"Current Password"}),s.jsx(n,{id:"current_password",ref:i,value:e.current_password,onChange:r=>a("current_password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"current-password"}),s.jsx(d,{message:o.current_password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(c,{htmlFor:"password",value:"New Password"}),s.jsx(n,{id:"password",ref:p,value:e.password,onChange:r=>a("password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s.jsx(d,{message:o.password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(c,{htmlFor:"password_confirmation",value:"Confirm Password"}),s.jsx(n,{id:"password_confirmation",value:e.password_confirmation,onChange:r=>a("password_confirmation",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s.jsx(d,{message:o.password_confirmation,className:"mt-2"})]}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(v,{disabled:x,children:"Save"}),s.jsx(g,{show:f,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:s.jsx("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})}export{I as default};
