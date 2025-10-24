import API from "../_api";

export const getBooks = async () => {
  const { data } = await API.get("/books");
  return data.data;
};

export const createBook = async (formData) => {
  try {
    const response = await API.post("/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error.response?.data || error.message);
    throw error;
  }
};
