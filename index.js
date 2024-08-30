import{a as y,S as w,i as n}from"./assets/vendor-YacmkDGs.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const h=t=>`
  <li class="gallery-card">
  <a href="${t.largeImageURL}">
     <img class="gallery-img"
      src="${t.webformatURL}" 
      alt="${t.tags}" />
  </a>
    <div class="info">
      <p><b>Likes:</b> ${t.likes}</p>
      <p><b>Views:</b> ${t.views}</p>
      <p><b>Comments:</b> ${t.comments}</p>
      <p><b>Downloads:</b> ${t.downloads}</p>
    </div>
  </li>
  `;y.defaults.baseURL="https://pixabay.com/api/";const S="45552769-3540ba49dba2ab2d34c825df8",f=(t,r=1,o=15)=>{const a={params:{key:S,q:t,orientation:"horizontal",per_page:o,page:r,safesearch:"true"}};return y.get("",a)},m=document.querySelector(".js-search-form"),i=document.querySelector(".js-gallery"),g=document.querySelector(".js-loader"),d=document.querySelector(".js-load-more");let l=1,c="",b=0,p=0,L=new w(".js-gallery a",{captionsData:"alt",captionDelay:250});const v=()=>{g.style.display="block"},E=()=>{g.style.display="none"},q=async t=>{if(t.preventDefault(),l=1,c=m.elements.user_query.value.trim(),!c){n.error({title:"Error",message:"Please enter a search query!"});return}i.innerHTML="",d.classList.add("is-hidden"),v();try{const r=await f(c,l,29);if(console.log(r),r.data.hits.length===0){n.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!"}),m.reset();return}const o=r.data.hits.map(e=>h(e)).join("");i.innerHTML=o,L.refresh();const a=i.querySelector("li");b=a?a.getBoundingClientRect().height:0,p=r.data.totalHits,p>l*29&&d.classList.remove("is-hidden")}catch(r){console.log(r),n.error({title:"Error",message:`An error occurred: ${r.message}`})}finally{E()}},P=async t=>{l++,v();try{const o=(await f(c,l,29)).data.hits.map(e=>h(e)).join("");i.insertAdjacentHTML("beforeend",o),L.refresh(),scrollBy({top:b*2,behavior:"smooth"});const a=Math.ceil(p/29);l>=a&&(d.classList.add("is-hidden"),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch(r){n.error({title:"Error",message:`An error occurred: ${r.message}`})}finally{E()}};m.addEventListener("submit",q);d.addEventListener("click",P);
//# sourceMappingURL=index.js.map
