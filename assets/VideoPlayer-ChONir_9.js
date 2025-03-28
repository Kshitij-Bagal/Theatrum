import{r as d,b as k,j as e,u as C,L as $,c as F,f as O,F as R,a as M}from"./index-CQaYZTkb.js";/* empty css                  */function E({comment:r,onReply:m,onLike:i,onDislike:c}){const[a,h]=d.useState(!1),[v,j]=d.useState(""),l=()=>{v.trim()&&(m(r._id,v),j(""),h(!1))};return e.jsxs("div",{className:"comment",children:[e.jsxs("div",{className:"comment-content",children:[e.jsx("p",{children:r.text}),e.jsxs("div",{className:"comment-actions",children:[e.jsxs("button",{onClick:()=>i(r._id),children:["👍 ",r.likes]}),e.jsxs("button",{onClick:()=>c(r._id),children:["👎 ",r.dislikes]}),e.jsx("button",{onClick:()=>h(!a),children:"💬 Reply"})]}),a&&e.jsxs("div",{className:"reply-form",children:[e.jsx("input",{type:"text",value:v,onChange:u=>j(u.target.value),placeholder:"Write a reply..."}),e.jsx("button",{onClick:l,children:"Reply"})]})]}),r.replies&&r.replies.length>0&&e.jsx("div",{className:"replies",children:r.replies.map(u=>e.jsx(E,{comment:u,onReply:m,onLike:i,onDislike:c},u._id))})]})}function U({videoId:r}){const[m,i]=d.useState([]),[c,a]=d.useState(""),h=k(s=>s.users.user),v=h==null?void 0:h._id,j=h==null?void 0:h.username,l="https://youtubecloneserver-ro5i.onrender.com";d.useEffect(()=>{r&&fetch(`${l}/api/videos/${r}/comments`).then(s=>{if(!s.ok)throw new Error(`HTTP error! Status: ${s.status}`);return s.json()}).then(s=>i(s)).catch(s=>console.error("Error fetching comments:",s))},[r]);const u=async()=>{if(c.trim())try{const n=await(await fetch(`${l}/api/videos/${r}/comment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:v,username:j,text:c})})).json();i(n),a("")}catch(s){console.error("Error adding comment:",s)}},b=async(s,n)=>{try{if(!(await fetch(`${l}/api/videos/${r}/comment/${s}/reply`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:v,username:j,text:n})})).ok)throw new Error("Failed to add reply");const f=await fetch(`${l}/api/videos/${r}/comments`).then(g=>g.json());i(f)}catch(o){console.error("Error adding reply:",o)}},N=async s=>{try{await fetch(`${l}/api/videos/${r}/comment/${s}/like`,{method:"POST"}),i(n=>n.map(o=>o._id===s?{...o,likes:o.likes+1}:o))}catch(n){console.error("Error liking comment:",n)}},y=async s=>{try{await fetch(`${l}/api/videos/${r}/comment/${s}/dislike`,{method:"POST"}),i(n=>n.map(o=>o._id===s?{...o,dislikes:o.dislikes+1}:o))}catch(n){console.error("Error disliking comment:",n)}};return e.jsxs("div",{className:"comments-section",children:[e.jsx("h3",{children:"Comments"}),e.jsxs("div",{className:"add-comment",children:[e.jsx("input",{type:"text",value:c,onChange:s=>a(s.target.value),placeholder:"Add a comment..."}),e.jsx("button",{onClick:u,children:"Post"})]}),e.jsx("div",{className:"comments-list",children:m.length>0?m.map(s=>e.jsx(E,{comment:s,onReply:b,onLike:N,onDislike:y},s._id)):e.jsx("p",{children:"No comments yet. Be the first to comment!"})})]})}function A(){var u,b,N,y;const{videoId:r}=C(),m=k(s=>s.users.user),i=k(s=>{var n,o,f;return(f=(o=(n=s.channel)==null?void 0:n.channels)==null?void 0:o.flatMap(g=>g.videos))==null?void 0:f.find(g=>String(g._id)===r)}),c="https://youtubecloneserver-ro5i.onrender.com",a=k(s=>{var n,o;return(o=(n=s.channel)==null?void 0:n.channels)==null?void 0:o.find(f=>f._id===(i==null?void 0:i.channelId))});if(!i)return e.jsx("h2",{children:"Video not found in description"});if(!a)return e.jsx("h2",{children:"Channel not found in description"});const[h,v]=d.useState(i),j=()=>{alert(`You have Subscribed To ${a.title}`)},l=async s=>{try{const o=await(await fetch(`${c}/api/videos/${r}/${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:m._id})})).json();v(o)}catch(n){console.error(`Error updating ${s}:`,n)}};return e.jsxs("div",{className:"video-description",children:[e.jsx("h2",{className:"video-description-title",children:i.title}),e.jsxs("div",{className:"disc-header",children:[e.jsxs("div",{className:"uploader-info",children:[e.jsxs("div",{className:"channel-details",children:[e.jsx("img",{src:a.logo,alt:`${a.name} Logo`,className:"channel-logo"}),e.jsxs("div",{className:"channel-meta",children:[e.jsx($,{to:`/channel/${a._id}`,children:e.jsx("h3",{className:"channel-name",children:a.name})}),e.jsxs("span",{className:"subscribers",children:[a.subscribers.toLocaleString()," subscribers"]})]})]}),e.jsx("button",{onClick:j,className:"subscribe-btn",children:"Subscribe"})]}),e.jsxs("div",{className:"video-actions",children:[e.jsxs("div",{className:"like-dislike",children:[e.jsxs("button",{className:"like-btn",onClick:()=>l("like"),children:["👍 ",((u=h.likedBy)==null?void 0:u.length)||0]}),e.jsxs("button",{className:"dislike-btn",onClick:()=>l("dislike"),children:["👎 ",((b=h.dislikedBy)==null?void 0:b.length)||0]})]}),e.jsx("button",{children:"🔗 Share"}),e.jsx("button",{children:"⬇️ Download"})]})]}),e.jsxs("div",{className:"video-stats",children:[e.jsxs("span",{children:[i.views.toLocaleString()," views"]}),e.jsx("span",{children:new Date(i.uploadDate).toDateString()}),e.jsxs("span",{children:["#",(N=i.tags)==null?void 0:N.join(" #")]})]}),e.jsxs("div",{className:"video-description-text",children:[e.jsx("p",{children:i.description}),e.jsx("div",{className:"video-links",children:(y=i.links)==null?void 0:y.map((s,n)=>e.jsx("a",{href:s.url,target:"_blank",rel:"noopener noreferrer",children:s.text},n))})]})]})}function H(){var S,w;const r=F(),{channelId:m,videoId:i}=C(),c=d.useRef(null),[a,h]=d.useState(null),[v,j]=d.useState(0),[l,u]=d.useState(!1),[b,N]=d.useState(!1),y="https://youtubecloneserver-ro5i.onrender.com";d.useEffect(()=>{r(O())},[r]);const s=k(t=>{var p,x;return(x=(p=t.channel)==null?void 0:p.channels)==null?void 0:x.find(V=>String(V._id)===m)}),n=(S=s==null?void 0:s.videos)==null?void 0:S.find(t=>String(t._id)===i),o=(w=s==null?void 0:s.videos)==null?void 0:w.filter(t=>t._id!==i);d.useEffect(()=>{(async()=>{try{const p=await fetch(`${y}/api/channels/${m}`);if(!p.ok)throw new Error("Failed to fetch channel");const x=await p.json();h(x)}catch(p){console.error("Error fetching channel:",p)}})()},[m]),d.useEffect(()=>{if(!c.current)return;const t=c.current,p=()=>j(c.current.duration),x=()=>j(c.current.currentTime);return c.current.addEventListener("loadedmetadata",p),c.current.addEventListener("timeupdate",x),()=>{t&&(t.removeEventListener("loadedmetadata",p),t.removeEventListener("timeupdate",x))}},[n]),d.useEffect(()=>{if(!n)return;const t=JSON.parse(sessionStorage.getItem("watchedVideos"))||[];if(!t.some(x=>x.id===i)){const x=[{id:i,title:n.title,timestamp:new Date().toLocaleString()},...t];sessionStorage.setItem("watchedVideos",JSON.stringify(x.slice(0,10)))}},[n,i]);const f=t=>{c.current&&(c.current.currentTime+=t)},g=()=>{u(t=>!t),document.documentElement.classList.toggle("theater-active")},T=async()=>{try{await fetch(`${y}/api/videos/${n._id}/view`,{method:"POST"})}catch(t){console.error("Failed to update view count:",t)}},_=()=>{N(t=>!t),document.body.classList.toggle("focus-mode-active",!b)},D=t=>{c.current&&(c.current.playbackRate=t)};if(!s)return e.jsx("div",{children:"Channel not found"});if(!n)return e.jsx("div",{children:"Video not found"});const L=`${y}/stream-video/${n._id}`,P=({video:t})=>e.jsx("div",{className:"video-card",children:e.jsxs($,{to:`/${a==null?void 0:a._id}/${t._id}`,className:"video-link",children:[e.jsx("img",{src:t.thumbnailUrl,alt:t.title,className:"thumbnail"}),e.jsxs("div",{className:"card-content",children:[e.jsx("div",{className:"channel-avatar",children:e.jsx("img",{src:(a==null?void 0:a.logo)||"default-logo.png",alt:"Channel Avatar"})}),e.jsxs("div",{className:"video-info",children:[e.jsx("h3",{className:"video-title",children:t.title}),e.jsx("span",{className:"channel-name",children:(a==null?void 0:a.name)||"Unknown Channel"}),e.jsxs("div",{className:"video-stats",children:[e.jsxs("span",{children:[e.jsx(R,{})," ",t.views||0," views"]}),e.jsxs("span",{children:[e.jsx(M,{})," ",t.likes||0," likes"]})]})]})]})]})});return e.jsxs("div",{className:`video-container ${l?"theater-mode":""}`,children:[e.jsxs("div",{className:"vid-section",children:[e.jsxs("div",{className:"video-player",children:[e.jsx("video",{ref:c,src:L||n.url,controls:!0,autoPlay:!0,onPlay:T,preload:"metadata",style:{width:"100%"}}),e.jsxs("div",{className:"controls",children:[e.jsx("button",{className:"th-m-btn",onClick:g,children:l?"Exit Theater":"Theater Mode"}),e.jsx("button",{onClick:_,children:b?"Normal Mode":"Dim Background"}),e.jsx("button",{onClick:()=>f(-10),children:"⏪"}),e.jsx("button",{onClick:()=>f(10),children:"⏩"}),e.jsxs("select",{onChange:t=>D(parseFloat(t.target.value)),defaultValue:"1",children:[e.jsx("option",{value:"0.5",children:"0.5x"}),e.jsx("option",{value:"1",children:"1x"}),e.jsx("option",{value:"1.5",children:"1.5x"}),e.jsx("option",{value:"2",children:"2x"})]})]})]}),e.jsx(A,{video:n}),e.jsx(U,{videoId:i})]}),e.jsx("div",{className:`recommended-videos ${l?"thmode":"normalmode"}`,style:{flexDirection:l?"row":"column"},children:o.map(t=>e.jsx(P,{video:t},t._id))})]})}export{H as default};
