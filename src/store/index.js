import { createStore } from 'vuex'

import helper from './helper'
import pupil from './modules/pupil'
import direction from './modules/direction'
import worker from './modules/worker'
import group from './modules/group'
import spending from './modules/spending'
import payment from './modules/payment'

export default createStore({
  state: {
    url:'http://localhost:5070',
    active:0,
    tog:true,
  },
  getters: {
    url(state){
      return state.url
    },
    tog(state){
      return state.tog
    },
    active(state){
      return state.active
    }
  },
  mutations: {
    active(state,payload){
      state.active = payload
    },
    tog(state,payload){
      state.tog = payload
    }
  },
  actions: {
    active(context,payload){
      context.commit('active',payload)
    },
    tog(context,payload){
      context.commit('tog',payload)
    }
  },
  modules: {
    helper,
    pupil,
    worker,
    direction,
    group,
    payment,
    spending
  }
})
