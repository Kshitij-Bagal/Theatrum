import{u as y,r as l,j as e,L as w,F as N,a as C}from"./index-DHCM1GNd.js";function b(){const{type:c}=y(),[i,j]=l.useState([]),[p,x]=l.useState({}),[d,h]=l.useState(!0),[o,m]=l.useState(null),u="https://youtubecloneserver-ro5i.onrender.com";l.useEffect(()=>{(async()=>{try{h(!0),m(null);const n=await fetch(`${u}/api/videos/types/${encodeURIComponent(c)}`),t=await n.json();if(!n.ok)throw new Error(t.message||"Failed to load videos");j(t);const a=[...new Set(t.map(r=>r.channelId))];a.length&&f(a)}catch(n){m(n.message||"Error fetching videos")}finally{h(!1)}})()},[c]);const f=async s=>{try{const n=await Promise.all(s.map(a=>fetch(`${u}/api/channels/${a}`).then(r=>r.json()))),t=s.reduce((a,r,g)=>(a[r]=n[g],a),{});x(a=>({...a,...t}))}catch(n){console.error("Error fetching channels:",n)}},v=({video:s})=>{const n=p[s.channelId]||{};return e.jsx("div",{className:"video-card",children:e.jsxs(w,{to:`/${s.channelId}/${s._id}`,className:"video-link",children:[e.jsx("img",{src:s.thumbnailUrl,alt:s.title,className:"thumbnail"}),e.jsxs("div",{className:"card-content",children:[e.jsx("div",{className:"channel-avatar",children:e.jsx("img",{src:n.logo||"default-logo.png",alt:"Channel Avatar"})}),e.jsxs("div",{className:"video-info",children:[e.jsx("h3",{className:"video-title",children:s.title}),e.jsx("span",{className:"channel-name",children:n.name||"Unknown Channel"}),e.jsxs("div",{className:"video-stats",children:[e.jsxs("span",{children:[e.jsx(N,{})," ",s.views||0," views"]}),e.jsxs("span",{children:[e.jsx(C,{})," ",s.likes||0," likes"]})]})]})]})]})})};return e.jsxs("div",{className:"browse",children:[e.jsxs("h1",{children:["Browse: ",c]}),d&&e.jsx("p",{children:"Loading videos..."}),o&&e.jsx("p",{className:"error",children:o}),!d&&!o&&i.length===0&&e.jsx("p",{children:"No videos found."}),e.jsx("div",{className:"video-grid",children:i.map(s=>e.jsx(v,{video:s},s._id))})]})}export{b as default};
