(()=>{"use strict";var e={770:function(e,r,t){t(658),t(97);var n,i=t(513);function o(){return{progressing:!1,explicit:void 0}}let a=e=>{var r,t,n;return(null===(r=e.output)||void 0===r?void 0:r.number)&&(null===(t=navigator.clipboard)||void 0===t||t.writeText(e.output.number)),console.log("copy"),{...e,output:{...e.output,copied:!0,progress:(null===(n=e.output)||void 0===n?void 0:n.progress)??o()}}};var l=((n={}).Linear="Linear Javascript",n.LinearRs="Linear Rust",n);let s=(e,r)=>{let t=r.target.value,n=""!==t,i=n?Number.parseInt(t,10):void 0;return{...e,input:{...e.input,raw:t,valid:n,int:i}}},u=(e,r)=>({...e,input:{...e.input,algorithm:r}}),c=(e,r)=>[u,r.target.value],p=(e,r,t)=>(0,i.h)("nav",{class:"no-space"},[(0,i.h)("div",{class:`field border left-round max ${e.valid?"":"invalid"}`},[(0,i.h)("input",{type:"number",oninput:s,value:e.raw,id:"number-input"}),e.valid?(0,i.h)("span",{class:"helper"},(0,i.fL)("Which n-th fibonacci?")):(0,i.h)("span",{class:"error"},(0,i.fL)("Not an natural number!"))]),function(e){let r=[];for(let t in l){let n=l[t];r.push((0,i.h)("option",{selected:n===e?"selected":void 0},(0,i.fL)(n)))}return(0,i.h)("div",{class:"field border no-round"},[(0,i.h)("select",{onchange:c},r),(0,i.h)("label",{},(0,i.fL)("Algorithm"))])}(e.algorithm),(0,i.h)("button",{class:`border right-round large ${e.listenCancel?"error-text":"fill"}`,onclick:e.listenCancel?t:r},e.listenCancel?(0,i.fL)("Cancel"):(0,i.fL)("Go"))]);function d(){return new Worker(new URL(t.p+t.u("588"),t.b))}let h=d(),v=document.querySelector("#root");if(!v)throw Error("Failed getting root of html document.");let f=(e,r)=>({...e,input:{...e.input,listenCancel:!1},output:{...e.output,progress:o(),number:r.number,duration:r.duration,copied:!1}}),m=(e,r)=>({...e,input:{...e.input,listenCancel:!1},output:{...e.output,progress:o(),error:r,copied:!1}}),b=e=>[{...e,input:{...e.input,listenCancel:!0},output:{progress:{progressing:!0},nthNumber:e.input.raw,copied:!1}},r=>{if(e.input.int){h.onmessage=e=>{let{result:t,duration:n}=e.data;r([f,{number:t,duration:n}])};let t={n:e.input.int,algorithm:e.input.algorithm};h.postMessage(t)}else r([m,"Input invalid."])}],g=()=>(h.terminate(),h=d(),[m,"Canceled calculation."]),L=()=>{var e;null===(e=document.getElementById("number-input"))||void 0===e||e.focus()},y=[e=>{let r=r=>{let t=document.getElementById("number-input")??!0;"Enter"===r.key&&t&&e(b)};return addEventListener("keydown",r),()=>removeEventListener("keydown",r)},void 0],w=[e=>{let r=r=>{"Escape"===r.key&&e(g)};return addEventListener("keydown",r),()=>removeEventListener("keydown",r)},void 0];(0,i.l2)({view:e=>(0,i.h)("div",{},[(0,i.h)("main",{class:"responsive"},[(0,i.h)("div",{class:"space"}),(0,i.h)("h1",{class:"small"},(0,i.fL)("Fibonacci Calculator")),(0,i.h)("div",{class:"space"}),p(e.input,b,g),(0,i.h)("div",{class:"medium-space"}),e.output?function(e){var r,t,n;let o;let l=e.nthNumber?`${e.nthNumber}th number in fibonacci sequence`:"",s=e.duration&&Math.round(e.duration)?`calculated in ${function(e){let r=Math.round(e),t=Math.floor(r/1e3),n=Math.floor(t/3600),i=Math.floor(t%3600/60),o=t%60,a=r%1e3;return(n?`${n}h `:"")+(i?`${i}min `:"")+(o?`${o}s `:"")+(a?`${a}ms`:"")}(e.duration)}`:"",u=`${l}${l&&s?", ":""}${s}`;return t=e.progress,(r={value:`${e.number??""}`,helper:u,error:e.error,copied:e.copied}).error?o=(0,i.h)("span",{class:"error"},(0,i.fL)(r.error)):r.helper&&(o=(0,i.h)("span",{class:"helper"},(0,i.fL)(r.helper))),n=(0,i.h)("div",{},[(0,i.h)("div",{class:`field textarea round border extra ${r.error?"invalid":""}`},[(0,i.h)("textarea",{value:r.value,wrap:"hard",readonly:"true",style:{wordBreak:"break-all"}}),o]),r.error?void 0:(0,i.h)("div",{class:"right-align"},(0,i.h)("button",{class:"circle slow-ripple",onclick:a},(0,i.h)("i",{},r.copied?(0,i.fL)("check"):(0,i.fL)("content_copy"))))]),t.progressing?t.explicit?(0,i.h)("progress",{value:t.explicit.current,max:t.explicit.max}):(0,i.h)("div",{class:"center-align"},[(0,i.h)("div",{class:"large-space"}),(0,i.h)("progress",{class:"circle large"})]):n}(e.output):void 0]),(0,i.h)("footer",{class:"fixed"},(0,i.h)("nav",{class:"center-align"},[(0,i.h)("a",{href:"https://github.com/WyvernIXTL/fibonacci-toy-website/"},[(0,i.h)("i",{class:"small-padding"},(0,i.fL)("gite")),(0,i.h)("span",{},(0,i.fL)("Source"))]),(0,i.h)("a",{href:"./WEBSITE-LICENSES.txt"},[(0,i.h)("i",{class:"small-padding"},(0,i.fL)("license")),(0,i.h)("span",{},(0,i.fL)("Licenses"))])]))]),init:[{calculating:!1,input:{raw:"",int:void 0,valid:!0,algorithm:l.LinearRs,listenCancel:!1},output:void 0},()=>{requestAnimationFrame(L)}],subscriptions:e=>[y,w],node:v})}},r={};function t(n){var i=r[n];if(void 0!==i)return i.exports;var o=r[n]={exports:{}};return e[n](o,o.exports,t),o.exports}t.m=e,t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.u=e=>"static/js/async/"+e+".0974e898.js",t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e=[];t.O=function(r,n,i,o){if(n){o=o||0;for(var a=e.length;a>0&&e[a-1][2]>o;a--)e[a]=e[a-1];e[a]=[n,i,o];return}for(var l=1/0,a=0;a<e.length;a++){for(var n=e[a][0],i=e[a][1],o=e[a][2],s=!0,u=0;u<n.length;u++)(!1&o||l>=o)&&Object.keys(t.O).every(function(e){return t.O[e](n[u])})?n.splice(u--,1):(s=!1,o<l&&(l=o));if(s){e.splice(a--,1);var c=i();void 0!==c&&(r=c)}}return r}})(),t.p="./",t.rv=()=>"1.2.7",(()=>{t.b=document.baseURI||self.location.href;var e={980:0};t.O.j=r=>0===e[r];var r=(r,n)=>{var i,o,[a,l,s]=n,u=0;if(a.some(r=>0!==e[r])){for(i in l)t.o(l,i)&&(t.m[i]=l[i]);if(s)var c=s(t)}for(r&&r(n);u<a.length;u++)o=a[u],t.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return t.O(c)},n=self.webpackChunkfibonacci_toy_website=self.webpackChunkfibonacci_toy_website||[];n.forEach(r.bind(null,0)),n.push=r.bind(null,n.push.bind(n))})(),t.ruid="bundler=rspack@1.2.7";var n=t.O(void 0,["172"],function(){return t(770)});n=t.O(n)})();