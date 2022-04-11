import { makeAutoObservable } from 'mobx'
class Store {
  constructor() {
    makeAutoObservable(this)
  }

  token = false
  globalHeight = 0
  level = [
    { name: '观众', color: '#CFB287', mall: null },
    { name: '前锋', color: '#5896DE', mall: null },
    { name: '后卫', color: '#3DC1CB', mall: null },
    { name: '守门', color: '#FF9F3D', mall: null },
    { name: '助理教练', color: '#A068F1', mall: null },
    { name: '主教练', color: '#FF86B2', mall: null },
    { name: '主席', color: '#61C05A', mall: null },
  ]

  setGlobalHeight = data => {
    this.globalHeight = data
  }

  setToken = data => {
    this.token = data
  }
}

const store = new Store()
export default store
