import { API_ADDRESS } from "@/constants/config";

const createItem = async (data, itemType) => {
  try {
    const response = await fetch(`${API_ADDRESS}/admin/items/singleItem`, {
      method: "POST",
      body: JSON.stringify({ ...data, itemType }),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
const updateItem = async (data, itemType) => {
  try {
    const response = await fetch(`${API_ADDRESS}/admin/items/singleItem`, {
      method: "PUT",
      body: JSON.stringify({ ...data, itemType }),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
const deleteItem = async (itemType, itemId) => {
  try {
    const response = await fetch(`${API_ADDRESS}/admin/items/singleItem`, {
      method: "DELETE",
      body: JSON.stringify({ itemType, itemId }),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log("deleteItem  : ", error.message);
  }
};
const getItems = async (queryAddress, pageNumber = 1, limit = 5) => {
  try {
    const response = await fetch(
      `${API_ADDRESS}/admin/items?type=${queryAddress}&page=${pageNumber}&limit=${limit}`,
    );

    return response;
  } catch (err) {
    return err.message;
  }
};
export { createItem, updateItem, getItems,deleteItem };
