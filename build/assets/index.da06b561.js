import{j as M,L as $,a as b,r as o,u as B,b as H,B as U,R as q,c as I,d as z,e as O}from"./vendor.6ed18752.js";const W=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const h of d.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function n(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerpolicy&&(d.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?d.credentials="include":l.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(l){if(l.ep)return;l.ep=!0;const d=n(l);fetch(l.href,d)}};W();const e=M.exports.jsx,c=M.exports.jsxs,p=M.exports.Fragment;function E(t){return e(p,{children:e("button",{className:t.class,children:t.label})})}function f(t){var a,n,i;return e(p,{children:e("input",{onChange:t.handleChange,type:(a=t.type)!=null?a:"text",placeholder:t.placeholder,className:t.classes+" py-2 px-5 border border-gray-300 rounded-md outline-none focus:border-gray-500",value:t.value,required:(n=t.required)!=null?n:!1,disabled:(i=t.disabled)!=null?i:!1})})}function F({user:t}){function a(){localStorage.removeItem("token"),localStorage.removeItem("username"),location.href="/"}return c("div",{className:"w-full bg-slate-100 shadow-md px-10 py-3 flex justify-between",children:[c("div",{children:[e($,{to:"/",className:"mr-4",children:"Home"}),t?e($,{to:"/lists",children:"Lists"}):c(p,{children:[e($,{to:"/login",className:"mr-4",children:"Login"}),e($,{to:"/register",children:"Register"})]})]}),t?e("div",{children:e("button",{type:"button",onClick:a,children:"Logout"})}):null]})}const T={userId:"",username:""};async function V(){const t="http://localhost:8081",a=localStorage.getItem("token");if(a){const n=await b.post(`${t}/auth/verify?token=${a}`);T.userId=n.data.id,T.username=n.data.username}}function A({children:t}){const[a,n]=o.exports.useState(T.username);return V().then(()=>{n(T.username)}),c(p,{children:[e(F,{user:a}),e("div",{className:"p-5 w-full md:w-2/3 lg:w-2/3 xl:w-2/4 mx-auto mb-2 text-center",children:t})]})}function _(t){return t.show?e(p,{children:e("div",{className:`absolute top-5 left-1/2 -translate-x-1/2 px-10 py-4 bg-white rounded-md shadow-lg border cursor-pointer border-slate-400
        ${t.type==="success"?"text-green-600":""}
        ${t.type==="error"?"text-red-600":""}
        ${t.type==="info"?"text-sky-700":""}`,onClick:t.closeToast,children:t.text})}):e(p,{})}function K(){const[t,a]=o.exports.useState(""),[n,i]=o.exports.useState(""),[l,d]=o.exports.useState(""),[h,m]=o.exports.useState("success"),[g,x]=o.exports.useState(!1),w=(u,N,s)=>{d(u),m(N),x(s)},v=()=>{x(!1)},y="http://localhost:8081";return e(p,{children:c(A,{children:[e(_,{text:l,type:h,show:g,closeToast:v}),e("div",{className:"text-2xl mb-10",children:"Login to manage your lists."}),e("form",{className:"w-2/3 md:w-3/4 mx-auto",onSubmit:async u=>{u.preventDefault();const N={username:t,password:n},s=await b.post(`${y}/auth/login`,N).catch(r=>w(r.response.data.message,"error",!0));s&&(w(s.data.message,"success",!0),T.username=s.data.username,localStorage.setItem("token",s.data.token),localStorage.setItem("username",s.data.username),location.href="/")},children:c("div",{className:"flex flex-col space-y-2",children:[e(f,{handleChange:u=>a(u.target.value),placeholder:"Username.",value:t}),e(f,{type:"password",handleChange:u=>i(u.target.value),placeholder:"Password.",value:n}),e(E,{label:"Login",class:"button button-primary"})]})})]})})}function Y(){return e(p,{children:e(A,{children:"Page not found :("})})}const k={API:"http://localhost:8081",URL:"http://localhost:3030"};function G(){const[t,a]=o.exports.useState(""),[n,i]=o.exports.useState(""),[l,d]=o.exports.useState(""),[h,m]=o.exports.useState(""),[g,x]=o.exports.useState("success"),[w,v]=o.exports.useState(!1);return e(p,{children:c(A,{children:[e(_,{text:h,type:g,show:w,closeToast:()=>{v(!1)}}),e("div",{className:"text-2xl mb-10",children:"Register a new account."}),e("form",{className:"w-2/3 md:w-3/4 mx-auto",onSubmit:async u=>{u.preventDefault();const N={username:t,email:n,password:l};b.post(`${k.API}/auth/register`,N).then(s=>{m(s.data.message),v(!0),x("success")}).catch(s=>{m(s.response.data.message),v(!0),x("error")}),a(""),d(""),i("")},children:c("div",{className:"flex flex-col space-y-2",children:[e(f,{handleChange:u=>a(u.target.value),placeholder:"Username.",value:t,required:!0}),e(f,{handleChange:u=>i(u.target.value),placeholder:"Email.",value:n,required:!0}),e(f,{type:"password",handleChange:u=>d(u.target.value),placeholder:"Password.",value:l,required:!0}),e(E,{label:"Register",class:"button button-primary"})]})})]})})}function J(){return e(p,{children:e(A,{children:"Home page"})})}const L={Authorization:"Bearer "+localStorage.getItem("token")},D="http://localhost:8081";async function Q(){return(await b.get(`${D}/list`,{headers:L})).data}async function X(t){return(await b.get(`${D}/list/${t}`,{headers:L})).data}async function Z(t){return(await b.get(`${D}/share/l/${t}`)).data}function ee(t){return e("svg",{xmlns:"http://www.w3.org/2000/svg",className:`${t.classes}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})}function te(t){return e("svg",{xmlns:"http://www.w3.org/2000/svg",className:t.classes,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}function se(t){return e("svg",{xmlns:"http://www.w3.org/2000/svg",className:t.classes,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"})})}function ae(t){return e("svg",{xmlns:"http://www.w3.org/2000/svg",className:t.classes,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})})}function ne(t){return e("svg",{xmlns:"http://www.w3.org/2000/svg",className:t.classes,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"})})}function re(t){const[a,n]=o.exports.useState(t.isPrivate),[i,l]=o.exports.useState(!1),[d,h]=o.exports.useState(""),m=B();function g(){m(`/lists/${t._id}`)}async function x(){await b.put(`${k.API}/list/privacy/${t._id}`,{isPrivate:!a},{headers:L}),n(!a),h(`Made list ${a?"public":"private"}.`),l(!0)}function w(){l(!1)}function v(){l(!0),h("Copied shareable link to clipboard."),navigator.clipboard.writeText(`${k.URL}/lists/s/${t._id}`)}return c(p,{children:[i?e(_,{type:"info",text:d,show:i,closeToast:w}):null,c("div",{className:"p-3 rounded-md border border-slate-300 bg-slate-50 text-left mb-2",children:[c("div",{className:"flex space-x-3 relative",children:[c("div",{className:"absolute right-3 flex space-x-2",children:[e("button",{className:"button-plain p-1 rounded-full outline-none",onClick:x,children:a?e(ae,{classes:"w-4 h-4"}):e(se,{classes:"w-4 h-4"})}),e("button",{className:"button-success text-white p-1 rounded-full outline-none",onClick:()=>t.handleEdit(t._id),children:e(te,{classes:"w-4 h-4"})}),e("button",{className:"button-error text-white p-1 rounded-full outline-none",onClick:()=>t.handleDelete(t._id),children:e(ee,{classes:"w-4 h-4"})})]}),e("div",{className:"w-1/4",children:e("img",{src:t.cover,onClick:g,className:"cursor-pointer"})}),c("div",{className:"flex flex-col space-y-2",children:[e("div",{onClick:g,children:e("div",{className:"text-2xl cursor-pointer",children:t.title})}),c("div",{children:["Total: \xA3",t.total?t.total:"0"]}),c("div",{className:"text-sm",children:["Added on ",new Date(t.createdAt).toLocaleDateString()]})]})]}),e("div",{className:"mt-2 flex space-x-2",children:a?null:c(p,{children:[e(f,{type:"text",value:`${k.URL}/lists/s/${t._id}`,disabled:!0,classes:"w-full"}),e("button",{className:"button button-primary",onClick:v,children:e(ne,{classes:"w-5 h-5"})})]})})]})]})}function R(){return e(p,{children:c("svg",{className:"animate-spin h-6 w-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})})}function le(t){const[a,n]=o.exports.useState(""),[i,l]=o.exports.useState(""),d={title:a,cover:i,createdAt:new Date};function h(){if(!a||!i)return alert("fill all details");t.handleClick(d),n(""),l("")}return e("div",{children:c("form",{className:"flex flex-col space-y-2 mb-10",children:[e(f,{handleChange:m=>n(m.target.value),placeholder:"List title",value:a,required:!0}),e(f,{handleChange:m=>l(m.target.value),placeholder:"List cover",value:i,required:!0}),e("button",{className:"button button-primary mb-5",type:"button",onClick:h,children:"Add List"})]})})}function oe(t){addEventListener("keydown",i=>{i.key==="Escape"&&n()});function a(i){i.target.id==="bg"&&n()}function n(){t.handleModal()}return e("div",{id:"bg",className:"w-full h-full fixed bg-black bg-opacity-60 top-0 left-0 p-5",onClick:a,children:e("div",{className:"w-full md:w-2/3 lg:w-2/4 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-5 text-center",children:t.children})})}function ie(){const[t,a]=o.exports.useState(!0),[n,i]=o.exports.useState([]),[l,d]=o.exports.useState(!1),[h,m]=o.exports.useState();o.exports.useEffect(()=>{Q().then(r=>{i(r.lists),a(!1)})},[null]);async function g(r){const{data:S}=await b.post(`${k.API}/list`,r,{headers:L});i([S.list,...n])}async function x(r){await b.delete(`${k.API}/list/${r}`,{headers:L}),i(n.filter(S=>S._id!==r))}async function w(r){y(r.title),u(r.cover),m(r),d(!0)}const[v,y]=o.exports.useState(""),[C,u]=o.exports.useState("");async function N(){const{data:r}=await b.put(`${k.API}/list/${h._id}`,{editTitle:v,editCover:C},{headers:L}),S=r.list[0];n.map(P=>{P._id===S._id&&(P.title=S.title,P.cover=S.cover)}),s()}function s(){d(!1)}return c(p,{children:[c(A,{children:[e(le,{handleClick:g}),t?e("div",{className:"w-5 mx-auto",children:e(R,{})}):n.length===0?"You have no lists yet":n.map(r=>e(re,{_id:r._id,title:r.title,total:r.total,createdAt:r.createdAt,cover:r.cover,isPrivate:r.isPrivate,handleDelete:()=>x(r._id),handleEdit:()=>w(r)},r._id))]}),l?e(oe,{handleModal:s,children:c("div",{className:"flex flex-col space-y-2",children:[e("div",{className:"mb-4 text-xl",children:"Editing the list."}),e(f,{handleChange:r=>y(r.target.value),placeholder:"New list title",value:v,required:!0}),e(f,{handleChange:r=>u(r.target.value),placeholder:"New list cover",value:C,required:!0}),c("div",{className:"flex space-x-2",children:[e("button",{className:"button button-success",onClick:N,children:"Save"}),e("button",{className:"button button-plain",onClick:s,children:"Close"})]})]})}):null]})}function ce(t){return c("div",{className:"flex p-3 space-x-3 rounded-md border border-slate-300 bg-slate-50 text-left mb-2 relative",children:[e("button",{className:"absolute top-5 right-5",onClick:()=>t.handleDelete(t._id),children:"Delete"}),e("div",{className:"w-1/4",children:e("img",{src:t.image,className:"cursor-pointer"})}),c("div",{className:"flex flex-col space-y-2",children:[e("div",{className:"text-2xl cursor-pointer",children:e("a",{href:t.url,target:"_blank",children:t.title})}),c("div",{children:["\xA3 ",t.price]}),c("div",{className:"text-sm",children:["Added on ",new Date(t.createdAt).toLocaleDateString()]})]})]})}function j(t){const{id:a}=H(),[n,i]=o.exports.useState([]),[l,d]=o.exports.useState(!0);o.exports.useEffect(()=>{t.isShared?Z(a).then(s=>{i(s.items),d(!1)}):X(a).then(s=>{i(s.items),d(!1)})},[null]);const[h,m]=o.exports.useState(""),[g,x]=o.exports.useState(""),[w,v]=o.exports.useState(""),[y,C]=o.exports.useState("");async function u(s){if(s.preventDefault(),!h||!g||!w||!y)return alert("fill all details");const r={list:a,title:h,price:y,url:g,image:w,createdAt:new Date},{data:S}=await b.post(`${k.API}/item`,r,{headers:L});i([S.item,...n]),m(""),C(""),x(""),v("")}async function N(s){await b.delete(`${k.API}/item/${s}`,{headers:L}),i(n.filter(r=>r._id!==s))}return e(p,{children:c(A,{children:[t.isShared?null:e("div",{children:c("form",{className:"flex flex-col space-y-2 mb-10",children:[e(f,{placeholder:"Item name.",value:h,handleChange:s=>m(s.target.value)}),e(f,{placeholder:"Item url.",value:g,handleChange:s=>x(s.target.value)}),e("div",{className:"text-left",children:e(f,{type:"number",placeholder:"Price \xA3\xA3",value:y,handleChange:s=>C(s.target.value)})}),e(f,{placeholder:"Item image.",value:w,handleChange:s=>v(s.target.value)}),e("button",{className:"button button-primary",onClick:s=>u(s),children:"Add Item"})]})}),l?e("div",{className:"w-5 mx-auto",children:e(R,{})}):n.length===0?"There are no items on this list.":n.map(s=>e(ce,{title:s.title,price:s.price,url:s.url,image:s.image,createdAt:s.createdAt,handleDelete:()=>N(s._id)},s._id))]})})}function de(){return e(U,{children:c(q,{children:[e(I,{path:"/",element:e(J,{})}),e(I,{path:"/login",element:e(K,{})}),e(I,{path:"/register",element:e(G,{})}),e(I,{path:"/lists",element:e(ie,{})}),e(I,{path:"/lists/:id",element:e(j,{})}),e(I,{path:"/lists/s/:id",element:e(j,{isShared:"true"})}),e(I,{path:"*",element:e(Y,{})})]})})}z.render(e(O.StrictMode,{children:e(de,{})}),document.getElementById("root"));
