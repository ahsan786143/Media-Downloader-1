import axios from 'axios'

const tiktokvideo=async(url , hd="0")=>{
  
const options = {
  method: 'GET',
  url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
  params: {
    url:url,
    hd:hd,  // "0" = normal, and "1" = hd
  },
  headers: {
    'x-rapidapi-key': 'c9e129ec1emsh76b1eafd155a001p1b3f69jsn837d0c69ba6c',
    'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com'
  }
};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		throw error;
	}
}



export default tiktokvideo