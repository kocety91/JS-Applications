import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll() {
  return await api.get(host + "/data/cars?sortBy=_createdOn%20desc");
}

export async function create(data) {
  return await api.post(host + "/data/cars", data);
}

export async function getById(id) {
  return await api.get(host + "/data/cars/" + id);
}

export async function edit(id, data) {
  return await api.put(host + "/data/cars/" + id, data);
}

export async function deleteCar(id) {
  return await api.del(host + "/data/cars/" + id);
}

export async function allCarsByOwnerId() {
  let userId = sessionStorage.getItem("userId");
  return await api.get(
    host +
      `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}

export async function search(year) {
  return await api.get(host + "/data/cars?where=year%3D" + year);
}
