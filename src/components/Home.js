import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Home() {
  const [homePic, setHomePic] = useState();

  const getHomePictur = async () => {
    const response = await axios.get("http://2.bp.blogspot.com/-VgkUFCWuzDs/Vpu9yfSHLRI/AAAAAAAAAZw/gS36SrRGyyg/s1600/reutone_post0009.jpg");
    setHomePic(response.config.url);
  };

  useEffect(() => {
    getHomePictur()
  }, []) 
  return (
      <img id="home" src={homePic} alt="home" />
  );
}

export default Home;
