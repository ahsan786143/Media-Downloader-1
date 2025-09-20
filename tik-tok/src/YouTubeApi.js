import axios from "axios";

const fetchYouTubeVideo = async (videoId) => {
  const options = {
    method: "GET",
    url: "https://youtube-media-downloader.p.rapidapi.com/v2/video/details",
    params: { videoId }, // Pass dynamic videoId
    headers: {
      "x-rapidapi-key": "c9e129ec1emsh76b1eafd155a001p1b3f69jsn837d0c69ba6c",
      "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchYouTubeVideo;
