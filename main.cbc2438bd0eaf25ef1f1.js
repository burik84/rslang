(()=>{"use strict";var n=function(){return n=void 0,t=void 0,o=function(){return function(n,t){var e,o,r,c,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return c={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function u(c){return function(u){return function(c){if(e)throw new TypeError("Generator is already executing.");for(;a;)try{if(e=1,o&&(r=2&c[0]?o.return:c[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,c[1])).done)return r;switch(o=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,o=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!((r=(r=a.trys).length>0&&r[r.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){a.label=c[1];break}if(6===c[0]&&a.label<r[1]){a.label=r[1],r=c;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(c);break}r[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(n,a)}catch(n){c=[6,n],o=0}finally{e=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}}(this,(function(n){switch(n.label){case 0:return[4,fetch("".concat("https://rs-lang-team17-be.herokuapp.com/","words")).then((function(n){return n.json()})).then((function(n){return console.log(n),n})).catch((function(n){console.log("Something went wrong",n.message)}))];case 1:return[2,n.sent()]}}))},new((e=void 0)||(e=Promise))((function(r,c){function a(n){try{i(o.next(n))}catch(n){c(n)}}function u(n){try{i(o.throw(n))}catch(n){c(n)}}function i(n){var t;n.done?r(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(a,u)}i((o=o.apply(n,t||[])).next())}));var n,t,e,o};document.addEventListener("DOMContentLoaded",(function(){console.log("Start script!"),console.log("Start App"),n()}))})();
//# sourceMappingURL=main.cbc2438bd0eaf25ef1f1.js.map