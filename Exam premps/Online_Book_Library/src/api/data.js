import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function create(data) {
  return api.post(host + "/data/books/", data);
}

export async function getAll() {
  return api.get(host + "/data/books?sortBy=_createdOn%20desc");
}

export async function getById(id) {
  return api.get(host + "/data/books/" + id);
}

export async function update(id, data) {
  return api.put(host + "/data/books/" + id, data);
}

export async function dele(id) {
  return api.del(host + "/data/books/" + id);
}
