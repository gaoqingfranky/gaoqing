/**
 * token的封装
 */
import local from './local'


const LOGINTOKEN = 'USERTOKEN'

export  function GETTOKEN(){
   return local.get(LOGINTOKEN);
}

export function SETTOKEN(val) {
  local.set(LOGINTOKEN,val);
}

export function REMOVETOKEN() {
  local.remove(LOGINTOKEN)
}
