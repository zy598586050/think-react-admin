/**
 * sessionStorage二次封装
 */
 import config from "../config"
 export default {
     getStroage(){
         return window.sessionStorage.getItem(config.namespace) ? JSON.parse(window.sessionStorage.getItem(config.namespace) || '') : {}
     },
     setItem(key: string, val: string){
         let storage = this.getStroage()
         storage[key] = val
         window.sessionStorage.setItem(config.namespace,JSON.stringify(storage))
     },
     getItem(key: string){
         return this.getStroage()[key]
     },
     clearItem(key: string){
         let storage = this.getStroage()
         delete storage[key]
         window.sessionStorage.setItem(config.namespace,JSON.stringify(storage))
     },
     clearAll(){
         window.sessionStorage.clear()
     }
 }