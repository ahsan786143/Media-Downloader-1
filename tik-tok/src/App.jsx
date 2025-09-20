import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import { Routes, Route,  } from "react-router-dom";
import TiktokStories from './components/TiktokStories/TiktokStories.jsx'
import YouTubeDownloader from './components/YouTubeDownloader/YouTubeDownloader.jsx';
import InstagramReel from './components/InstagramReel/InstagramReel.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import SignupPage from './components/SignupPage/SignupPage.jsx'
import Footer from './components/Footer/Footer.jsx';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.jsx';
import ContactPage from './components/ContactPage/ContactPage.jsx';


function App() {

  return (
    <>
     <Navbar/>

     <Routes>
        <Route path="/" element={<TiktokStories />} />
        <Route path="/tiktokstories" element={<TiktokStories />} />
        <Route path="/youtubedownloader" element={<YouTubeDownloader />} />
        <Route path="/instagramreel" element={<InstagramReel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />   
        <Route path="/privacypolicy" element={<PrivacyPolicy />} /> 
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer/>

  
    </>
  )
}

export default App
