import{a as d,S as p,i as n}from"./assets/vendor-YacmkDGs.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m=r=>`
  <li class="gallery-card">
  <a href="${r.largeImageURL}">
     <img class="gallery-img"
      src="${r.webformatURL}" 
      alt="${r.tags}" />
  </a>
    <div class="info">
      <p><b>Likes:</b> ${r.likes}</p>
      <p><b>Views:</b> ${r.views}</p>
      <p><b>Comments:</b> ${r.comments}</p>
      <p><b>Downloads:</b> ${r.downloads}</p>
    </div>
  </li>
  `;d.defaults.baseURL="https://pixabay.com/api/";const y="45552769-3540ba49dba2ab2d34c825df8",f=r=>{const s={params:{key:y,q:r,orientation:"horizontal",per_page:20,safesearch:"true"}};return d.get("",s)},i=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),u=document.querySelector(".js-loader");let h=new p(".js-gallery a",{captionsData:"alt",captionDelay:250});const g=()=>{u.style.display="block"},b=()=>{u.style.display="none"},L=async r=>{r.preventDefault();const s=i.elements.user_query.value.trim();if(!s){n.error({title:"Error",message:"Please enter a search query!"});return}c.innerHTML="",g();try{const o=await f(s);if(console.log(o),o.data.hits.length===0){n.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!"}),i.reset();return}const a=o.data.hits.map(e=>m(e)).join("");c.innerHTML=a,h.refresh()}catch(o){console.log(o),n.error({title:"Error",message:`An error occurred: ${o.message}`})}finally{b()}};i.addEventListener("submit",L);
//# sourceMappingURL=index.js.map
