import{r as o,a,j as r}from"./index-d-ClT2-m.js";function p(){const[e,c]=o.useState([]),t=a(s=>s.users.user);return o.useEffect(()=>{if(!t)return;(async()=>{try{const n=await(await fetch(`https://theatrum-server.onrender.com/api/subscriptions?userId=${t._id}`)).json();c(n)}catch(i){console.error("Failed to fetch subscriptions:",i)}})()},[t]),r.jsxs("div",{className:"subscriptions",children:[r.jsx("h1",{children:"Your Subscriptions"}),e.length>0?r.jsx("ul",{children:e.map(s=>r.jsxs("li",{children:[r.jsx("img",{src:s.logo,alt:s.name}),r.jsx("span",{children:s.name})]},s._id))}):r.jsx("p",{children:"You are not subscribed to any channels yet."})]})}export{p as default};
