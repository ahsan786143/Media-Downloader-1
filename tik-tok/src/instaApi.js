import axios from "axios";

const fetchInstaReel = async (url) => {
  const options = {
    method: "GET",
    url: "https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert",
    params: { url }, //  user input
    headers: {
      "x-rapidapi-key": "c9e129ec1emsh76b1eafd155a001p1b3f69jsn837d0c69ba6c", 
      "x-rapidapi-host":
        "instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Instagram API Error:", error);
    throw error;
  }
};

export default fetchInstaReel;
