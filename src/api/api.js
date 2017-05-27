import axios from 'axios';
export const requestLogin = params => {
  return axios.post(`/login`, params).then(res => res.data);
};

export const getTodoList = params => {
  return axios.get(`/todo/list`, {
    params: params
  });
};

export const getTodo = params => {
  return axios.get(`/todo/listId`, {
    params: params
  });
};

export const addRecord = params => {
  return axios.post(`/todo/addRecord`, params).then(res => res.data);
};

export const editTodo = params => {
  return axios.post(`/todo/editTodo`, params).then(res => res.data);
};
export const editRecord = params => {
  return axios.post(`/todo/editRecord`, params).then(res => res.data);
};

export const addTodo = params => {
  return axios.post(`/todo/addTodo`, params).then(res => res.data);
};

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
