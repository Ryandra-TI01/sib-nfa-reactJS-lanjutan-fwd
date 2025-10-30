import API from "../_api";

export const getBooks = async () => {
  const { data } = await API.get("/books");
  return data;
};

export const createBook = async (payload) => {
  const response = await API.post("/books", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getBookById = async (id) => {
  const { data } = await API.get(`/books/${id}`);
  return data;
};

export const updateBook = async (id, payload) => {
  const data = await API.put(`/books/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteBook = async (id) => {
  const response = await API.delete(`/books/${id}`);
  return response;
};
