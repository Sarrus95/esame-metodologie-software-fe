import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  get(key: string){
    return localStorage.getItem(key);
  }

  set(key: string,value: string){
    return localStorage.setItem(key,value)
  }

  clear(){
    return localStorage.clear();
  }
}
