import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getTodoList = params => { return axios.get(`${base}/todo/list`, { params: params }); };

export const getTodo = params => { return axios.get(`${base}/todo/listId`, { params: params }); };

export const addLocked = params => { return axios.post(`${base}/todo/addLocked`, params).then(res => res.data); };
export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };