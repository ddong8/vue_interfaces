import axios from '@/libs/api.request'
export const getItems = (data) => {
   
    return axios.request({
      url: '/api/items',
      data,
      method: 'post'
    })
  }
export const get_synthesis_steps = (data) => {
    return axios.request({
      url: '/api/get_synthesis_steps',
      data,
      method: 'post'
    })
  }