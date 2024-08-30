import{a as p,S as E,i as n}from"./assets/vendor-YacmkDGs.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const y=r=>`
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
  `;p.defaults.baseURL="https://pixabay.com/api/";const S="45552769-3540ba49dba2ab2d34c825df8",h=(r,a=1,t=15)=>{const o={params:{key:S,q:r,orientation:"horizontal",per_page:t,page:a,safesearch:"true"}};return p.get("",o)},u=document.querySelector(".js-search-form"),i=document.querySelector(".js-gallery"),g=document.querySelector(".js-loader"),c=document.querySelector(".js-load-more");let l=1,q="",f=0,m=0,b=new E(".js-gallery a",{captionsData:"alt",captionDelay:250});const L=()=>{g.style.display="block"},v=()=>{g.style.display="none"},w=async r=>{r.preventDefault(),l=1;const a=u.elements.user_query.value.trim();if(!a){n.error({title:"Error",message:"Please enter a search query!"});return}i.innerHTML="",c.classList.add("is-hidden"),L();try{const t=await h(a,l,29);if(console.log(t),t.data.hits.length===0){n.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!"}),u.reset();return}const o=t.data.hits.map(s=>y(s)).join("");i.innerHTML=o,b.refresh();const e=i.querySelector("li");f=e.querySelector("li")?e.getBoundingClientRect().height:0,m=t.data.totalHits,m>l*29&&c.classList.remove("is-hidden")}catch(t){console.log(t),n.error({title:"Error",message:`An error occurred: ${t.message}`})}finally{v()}},P=async r=>{l++,L();try{const t=(await h(q,l,29)).data.hits.map(e=>y(e)).join("");i.insertAdjacentHTML("beforeend",t),b.refresh(),scrollBy({top:f*2,behavior:"smooth"});const o=Math.ceil(m/29);l>=totalPage&&(c.classList.add("is-hidden"),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch(a){n.error({title:"Error",message:`An error occurred: ${a.message}`})}finally{v()}};u.addEventListener("submit",w);c.addEventListener("click",P);
//# sourceMappingURL=index.js.map
