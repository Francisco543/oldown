import { Box } from "@mui/material";
import React from "react";
import ItemListContainer from "./ItemListContainer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Landing = () => {
  return (
    <Box sx={{ marginTop: "100px" }}>
      <Carousel
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
      >
        <div>
          <img
            src={process.env.PUBLIC_URL + "/images/carousel1.jpg"}
            alt="..."
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/images/carousel2.jpg"}
            alt="..."
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/images/carousel3.jpg"}
            alt="..."
          />
        </div>
      </Carousel>
      <ItemListContainer isLanding={true} />
    </Box>
  );
};

export default Landing;
