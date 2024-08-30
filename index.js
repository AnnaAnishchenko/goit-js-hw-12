import{a as m,S as v,i as n}from"./assets/vendor-YacmkDGs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const p=r=>`
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
  `;m.defaults.baseURL="https://pixabay.com/api/";const E="45552769-3540ba49dba2ab2d34c825df8",y=(r,t=1,s=15)=>{const o={params:{key:E,q:r,orientation:"horizontal",per_page:s,page:t,safesearch:"true"}};return m.get("",o)},u=document.querySelector(".js-search-form"),i=document.querySelector(".js-gallery"),h=document.querySelector(".js-loader"),c=document.querySelector(".js-load-more");let l=1,w="",f=0,g=new v(".js-gallery a",{captionsData:"alt",captionDelay:250});const b=()=>{h.style.display="block"},L=()=>{h.style.display="none"},S=async r=>{r.preventDefault(),l=1;const t=u.elements.user_query.value.trim();if(!t){n.error({title:"Error",message:"Please enter a search query!"});return}i.innerHTML="",c.classList.add("is-hidden"),b();try{const s=await y(t,l);if(console.log(s),s.data.hits.length===0){n.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!"}),u.reset();return}const o=s.data.hits.map(a=>p(a)).join("");i.innerHTML=o,g.refresh();const e=i.querySelector("li");f=e?e.getBoundingClientRect().height:0,s.data.totalHits>l*15&&c.classList.remove("is-hidden")}catch(s){console.log(s),n.error({title:"Error",message:`An error occurred: ${s.message}`})}finally{L()}},q=async r=>{l++,b();try{const t=await y(w,l),s=t.data.hits.map(o=>p(o)).join("");i.insertAdjacentHTML("beforeend",s),g.refresh(),scrollBy({top:f*2,behavior:"smooth"}),l===t.data.totalHits&&(c.classList.add("is-hidden"),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch(t){n.error({title:"Error",message:`An error occurred: ${t.message}`})}finally{L()}};u.addEventListener("submit",S);c.addEventListener("click",q);
//# sourceMappingURL=index.js.map
