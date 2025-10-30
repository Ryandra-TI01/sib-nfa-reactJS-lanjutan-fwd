import API from "../_api";

export const getUsers = async () => {
  const { data } = await API.get("/users");
  return data;
};

export const getUserById = async (id) => {
  const { data } = await API.get(`/users/${id}`);
  return data;
};

export const createUser = async (payload) => {
  const { data } = await API.post("/users", payload);
  return data;
};

export const updateUser = async (id, payload) => {
  const { data } = await API.put(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await API.delete(`/users/${id}`);
  return data;
};
