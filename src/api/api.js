import axios from 'axios';

let base = '';

export const requestLogin = params => {
  return axios.post(`${base}/login`, params).then(res => res.data);
};

export const getTodoList = params => {
  return axios.get(`${base}/todo/list`, {
    params: params
  });
};

export const getTodo = params => {
  return axios.get(`${base}/todo/listId`, {
    params: params
  });
};

export const addRecord = params => {
  return axios.post(`${base}/todo/addRecord`, params).then(res => res.data);
};

export const editTodo = params => {
  return axios.post(`${base}/todo/editTodo`, params).then(res => res.data);
};
export const editRecord = params => {
  return axios.post(`${base}/todo/editRecord`, params).then(res => res.data);
};

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
