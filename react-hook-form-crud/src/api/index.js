import api from "../http-common";

const getAll = (url) => {
  return api.get(url);
};

const getShow = (url, id) => {
  return api.get(`${url}/${id}`);
};

const create = (url, data) => {
  return api.post(url, data);
};

const update = (url, id, data) => {
  return api.put(`${url}/${id}`, data);
};

const deleteApi = (url, id) => {
  return api.delete(`${url}/${id}`);
};

export { getAll, getShow, create, update, deleteApi };
