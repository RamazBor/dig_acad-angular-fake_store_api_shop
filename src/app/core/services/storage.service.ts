import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageSevice {
  private _storage = localStorage
  constructor() {

  }

  getLocalItem(key: string) {
    return JSON.parse(JSON.stringify(this._storage.getItem(key))) || undefined
  }

  setItem(key: string, value: number | string | Object) {
    const setValue = (value === typeof 'string') ? value : JSON.stringify(value)
    this._storage.setItem(key, setValue as string)
  }
  removeItem(key: string) {
    this._storage.removeItem(key)
  }
  itemExist(key: string): boolean {
    return !!this.getLocalItem(key)
  }

  clearAll() {
    this._storage.clear()
  }

}
