(()=>{"use strict";var e={969:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getAll=t.getProducto=t.store=void 0;const n=r(o(292)),u=[];t.store=(e,t,o)=>{const r=new n.default((()=>{let e=1;for(let t=0;t<u.length;t++)u[t]._id>e&&(e=u[0]._id),console.log(u[t]._id);return console.log(e),console.log(u.length),console.log("////"),e++})(),e,t,o);return u.push(r),u},t.getProducto=e=>u.find((t=>t._id==e))||{error:"Producto no encontrado"},t.getAll=()=>u.length?u:{error:"no hay productos"}},607:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,n)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return n(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=u(o(860)),s=i(o(235)),d=o(969),a=(new s.default("Coder","House"),(0,l.default)()),c=(0,l.Router)();a.use(l.default.json()),a.use(l.default.urlencoded({extended:!0})),c.post("/",((e,t)=>{t.send((0,d.store)(e.body.title,e.body.price,e.body.thumbnail))})),c.get("/:id",((e,t)=>{t.send((0,d.getProducto)(parseInt(e.params.id)))})),c.get("/",((e,t)=>{t.send((0,d.getAll)())})),a.use("/api/productos",c),a.listen(8080,(()=>{console.log("conectado al puerto: 8080")}))},235:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t){this.fname=e,this.lname=t}getFullName(){return`${this.fname} ${this.lname}`}}},292:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t,o,r){this.id=e,this.title=t,this.price=o,this.thumbnail=r}get _id(){return this.id}}},860:e=>{e.exports=require("express")}},t={};!function o(r){var n=t[r];if(void 0!==n)return n.exports;var u=t[r]={exports:{}};return e[r].call(u.exports,u,u.exports,o),u.exports}(607)})();