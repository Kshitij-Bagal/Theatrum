import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchVideos } from "./redux/videoSlice";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Sidebar from "./components/Sidebar";

import "./App.css";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Browse = lazy(() => import("./pages/Browse"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const History = lazy(() => import("./pages/History"));
const Upload = lazy(() => import("./pages/Upload"));
const Profile = lazy(() => import("./pages/Profile"));
const VideoPlayer = lazy(() => import("./pages/VideoPlayer"));
const Channel = lazy(() => import("./pages/Channel"));
const LoginSignup = lazy(() => import("./pages/LoginSignup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UChannel = lazy(() => import("./pages/UserChannel"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Settings= lazy(()=>import("./pages/Setting") )

// Loading fallback component
const Loading = () => <div className="loading">Loading...</div>;
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);
  return (
    <BrowserRouter basename="/YouTubeClone/">
      <ScrollToTop />
      <div className="app">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="page-content">
            <Suspense
              fallback={<div className="loading-screen">Loading...</div>}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse/:type" element={<Browse />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/History" element={<History />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/:channelId/:videoId" element={<VideoPlayer />} />
                <Route path="/user-channel/:userId" element={<UChannel />} />
                <Route path="/channel/:id" element={<Channel />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/login-signup" element={<LoginSignup />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
