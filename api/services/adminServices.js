import { API_ADDRESS } from "@/constants/config";

const createQuestion = async (data) => {
  try {
    const response = await fetch(`${API_ADDRESS}/admin/items/questions`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
const updateQuestion = async (data) => {
  try {
    const response = await fetch(`${API_ADDRESS}/admin/items/questions`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
const getItems = async (queryAddress, pageNumber = 1,limit=5) => {
  const response = await fetch(
    `${API_ADDRESS}/admin/items?type=${queryAddress}&page=${pageNumber}&limit=${limit}`,
  );

  return response;
};
export { createQuestion, updateQuestion, getItems };
