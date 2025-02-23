"use strict";(self.webpackChunknz_vet_locum_network=self.webpackChunknz_vet_locum_network||[]).push([[254],{1306:function(e,n,t){t.d(n,{$F:function(){return r},PB:function(){return a}});function a(e){return"".concat("data-rr-ui-").concat(e)}function r(e){return"".concat("rrUi").concat(e)}},3808:function(e,n,t){t.d(n,{Z:function(){return r}});var a=Function.prototype.bind.call(Function.prototype.call,[].slice);function r(e,n){return a(e.querySelectorAll(n))}},2677:function(e,n,t){var a=t(9439),r=t(1413),c=t(5987),o=t(1694),l=t.n(o),i=t(2791),u=t(162),s=t(184),v=["as","bsPrefix","className"],f=["className"];var d=i.forwardRef((function(e,n){var t=function(e){var n=e.as,t=e.bsPrefix,a=e.className,o=(0,c.Z)(e,v);t=(0,u.vE)(t,"col");var i=(0,u.pi)(),s=(0,u.zG)(),f=[],d=[];return i.forEach((function(e){var n,a,r,c=o[e];delete o[e],"object"===typeof c&&null!=c?(n=c.span,a=c.offset,r=c.order):n=c;var l=e!==s?"-".concat(e):"";n&&f.push(!0===n?"".concat(t).concat(l):"".concat(t).concat(l,"-").concat(n)),null!=r&&d.push("order".concat(l,"-").concat(r)),null!=a&&d.push("offset".concat(l,"-").concat(a))})),[(0,r.Z)((0,r.Z)({},o),{},{className:l().apply(void 0,[a].concat(f,d))}),{as:n,bsPrefix:t,spans:f}]}(e),o=(0,a.Z)(t,2),i=o[0],d=i.className,b=(0,c.Z)(i,f),p=o[1],y=p.as,m=void 0===y?"div":y,x=p.bsPrefix,Z=p.spans;return(0,s.jsx)(m,(0,r.Z)((0,r.Z)({},b),{},{ref:n,className:l()(d,!Z.length&&x)}))}));d.displayName="Col",n.Z=d},2494:function(e,n,t){t.d(n,{Z:function(){return D}});var a=t(1413),r=t(5987),c=t(1694),o=t.n(c),l=t(2791),i=(t(2391),t(239)),u=t(3808);var s=t(3201),v=l.createContext(null);v.displayName="NavContext";var f=v,d=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return null!=e?String(e):n||null},b=l.createContext(null),p=l.createContext(null),y=t(1306),m=t(9439),x=t(9007),Z=t(5341),h=t(184),N=["as","active","eventKey"];function g(e){var n=e.key,t=e.onClick,a=e.active,r=e.id,c=e.role,o=e.disabled,i=(0,l.useContext)(b),u=(0,l.useContext)(f),s=(0,l.useContext)(p),v=a,d={role:c};if(u){c||"tablist"!==u.role||(d.role="tab");var m=u.getControllerId(null!=n?n:null),Z=u.getControlledId(null!=n?n:null);d[(0,y.PB)("event-key")]=n,d.id=m||r,!(v=null==a&&null!=n?u.activeKey===n:a)&&(null!=s&&s.unmountOnExit||null!=s&&s.mountOnEnter)||(d["aria-controls"]=Z)}return"tab"===d.role&&(d["aria-selected"]=v,v||(d.tabIndex=-1),o&&(d.tabIndex=-1,d["aria-disabled"]=!0)),d.onClick=(0,x.Z)((function(e){o||(null==t||t(e),null!=n&&i&&!e.isPropagationStopped()&&i(n,e))})),[d,{isActive:v}]}var C=l.forwardRef((function(e,n){var t=e.as,a=void 0===t?Z.ZP:t,r=e.active,c=e.eventKey,o=function(e,n){if(null==e)return{};var t,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)t=c[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,N),l=g(Object.assign({key:d(c,o.href),active:r},o)),i=(0,m.Z)(l,2),u=i[0],s=i[1];return u[(0,y.PB)("active")]=s.isActive,(0,h.jsx)(a,Object.assign({},o,u,{ref:n}))}));C.displayName="NavItem";var w=C,k=["as","onSelect","activeKey","role","onKeyDown"];var P=function(){},j=(0,y.PB)("event-key"),I=l.forwardRef((function(e,n){var t,a,r=e.as,c=void 0===r?"div":r,o=e.onSelect,i=e.activeKey,v=e.role,m=e.onKeyDown,x=function(e,n){if(null==e)return{};var t,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)t=c[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,k),Z=(0,l.useReducer)((function(e){return!e}),!1)[1],N=(0,l.useRef)(!1),g=(0,l.useContext)(b),C=(0,l.useContext)(p);C&&(v=v||"tablist",i=C.activeKey,t=C.getControlledId,a=C.getControllerId);var w=(0,l.useRef)(null),I=function(e){var n=w.current;if(!n)return null;var t=(0,u.Z)(n,"[".concat(j,"]:not([aria-disabled=true])")),a=n.querySelector("[aria-selected=true]");if(!a||a!==document.activeElement)return null;var r=t.indexOf(a);if(-1===r)return null;var c=r+e;return c>=t.length&&(c=0),c<0&&(c=t.length-1),t[c]},K=function(e,n){null!=e&&(null==o||o(e,n),null==g||g(e,n))};(0,l.useEffect)((function(){if(w.current&&N.current){var e=w.current.querySelector("[".concat(j,"][aria-selected=true]"));null==e||e.focus()}N.current=!1}));var O=(0,s.Z)(n,w);return(0,h.jsx)(b.Provider,{value:K,children:(0,h.jsx)(f.Provider,{value:{role:v,activeKey:d(i),getControlledId:t||P,getControllerId:a||P},children:(0,h.jsx)(c,Object.assign({},x,{onKeyDown:function(e){if(null==m||m(e),C){var n;switch(e.key){case"ArrowLeft":case"ArrowUp":n=I(-1);break;case"ArrowRight":case"ArrowDown":n=I(1);break;default:return}n&&(e.preventDefault(),K(n.dataset[(0,y.$F)("EventKey")]||null,e),N.current=!0,Z())}},ref:O,role:v}))})})}));I.displayName="Nav";var K=Object.assign(I,{Item:w}),O=t(162),E=["bsPrefix","active","disabled","eventKey","className","variant","action","as"],R=l.forwardRef((function(e,n){var t=e.bsPrefix,c=e.active,l=e.disabled,i=e.eventKey,u=e.className,s=e.variant,v=e.action,f=e.as,b=(0,r.Z)(e,E);t=(0,O.vE)(t,"list-group-item");var p=g((0,a.Z)({key:d(i,b.href),active:c},b)),y=(0,m.Z)(p,2),Z=y[0],N=y[1],C=(0,x.Z)((function(e){if(l)return e.preventDefault(),void e.stopPropagation();Z.onClick(e)}));l&&void 0===b.tabIndex&&(b.tabIndex=-1,b["aria-disabled"]=!0);var w=f||(v?b.href?"a":"button":"div");return(0,h.jsx)(w,(0,a.Z)((0,a.Z)((0,a.Z)({ref:n},b),Z),{},{onClick:C,className:o()(u,t,N.isActive&&"active",l&&"disabled",s&&"".concat(t,"-").concat(s),v&&"".concat(t,"-action"))}))}));R.displayName="ListGroupItem";var z=R,A=["className","bsPrefix","variant","horizontal","numbered","as"],S=l.forwardRef((function(e,n){var t,c=(0,i.Ch)(e,{activeKey:"onSelect"}),l=c.className,u=c.bsPrefix,s=c.variant,v=c.horizontal,f=c.numbered,d=c.as,b=void 0===d?"div":d,p=(0,r.Z)(c,A),y=(0,O.vE)(u,"list-group");return v&&(t=!0===v?"horizontal":"horizontal-".concat(v)),(0,h.jsx)(K,(0,a.Z)((0,a.Z)({ref:n},p),{},{as:b,className:o()(l,y,s&&"".concat(y,"-").concat(s),t&&"".concat(y,"-").concat(t),f&&"".concat(y,"-numbered"))}))}));S.displayName="ListGroup";var D=Object.assign(S,{Item:z})},9743:function(e,n,t){var a=t(1413),r=t(5987),c=t(1694),o=t.n(c),l=t(2791),i=t(162),u=t(184),s=["bsPrefix","className","as"],v=l.forwardRef((function(e,n){var t=e.bsPrefix,c=e.className,l=e.as,v=void 0===l?"div":l,f=(0,r.Z)(e,s),d=(0,i.vE)(t,"row"),b=(0,i.pi)(),p=(0,i.zG)(),y="".concat(d,"-cols"),m=[];return b.forEach((function(e){var n,t=f[e];delete f[e],n=null!=t&&"object"===typeof t?t.cols:t;var a=e!==p?"-".concat(e):"";null!=n&&m.push("".concat(y).concat(a,"-").concat(n))})),(0,u.jsx)(v,(0,a.Z)((0,a.Z)({ref:n},f),{},{className:o().apply(void 0,[c,d].concat(m))}))}));v.displayName="Row",n.Z=v},2391:function(e){var n=function(){};e.exports=n}}]);
//# sourceMappingURL=254.c5bd67da.chunk.js.map