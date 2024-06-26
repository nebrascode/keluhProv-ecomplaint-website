import axios from "axios";

const token = sessionStorage.getItem("token");

export const getNews = async () => {
  try {
    const response = await axios.get(
      "https://capstone-dev.mdrizki.my.id/api/v1/news",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = response.data.data;

    // Check if response data is empty or null
    if (!responseData || responseData.length === 0) {
      // Force reload the page if data is not found
      window.location.reload();
    }

    return responseData;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};

export const getNewsDetail = async (newsId) => {
  try {
    const response = await axios.get(
      `https://capstone-dev.mdrizki.my.id/api/v1/news/${newsId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newsDetail = response.data.data;

    // Check if news detail is null or undefined
    if (!newsDetail) {
      // Force reload the page if news detail is not found
      window.location.reload();
    }

    return newsDetail;
  } catch (error) {
    console.error(`Error fetching news detail for id ${newsId}:`, error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};

export const deleteNews = async (newsId) => {
  try {
    const token = sessionStorage.getItem("token");
    await axios.delete(
      `https://capstone-dev.mdrizki.my.id/api/v1/news/${newsId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return newsId;
  } catch (error) {
    console.error(`Error deleting news with ID ${newsId}:`, error);
    throw error;
  }
};
