"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const TopAnime = () => {
  // variable to store the api infomation
  const [getPopular, setGetPopular] = useState([]);
  // variable to add a loading when the api is being fetched
  const [isLoading, setIsLoading] = useState(true);

  // what to do after the page render
  useEffect(() => {
    fetchData();
  }, []);

  // fetch the api
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/top/anime`);
      // checks if the response is successful
      if (!response.ok) {
        throw new Error(
          `Error fetching recommendations: ${response.status} - ${response.statusText}`
        );
      }
      // parse the response as JSON
      const data = await response.json();
      // shows only 20 anime
      const slicedData = data.data.slice(0, 25);
      setGetPopular(slicedData);
      // loading is set to false once fetched
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      // false in case of an error
      setIsLoading(false);
    }
  };

  // from react slick
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1290,
        settings: {
          arrows: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-auto container px-2 my-20">
      <h1 className="border-l-4 pl-2 border-orange-600 font-bold text-2xl my-4">
        Popular Among The Fans
      </h1>
      <Slider {...settings} variableWidth={true}>
        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          getPopular.map((x, index) => (
            <div key={`${x.mal_id}-${index}`} className="px-2">
              <Link href={`/anime/${x.mal_id}`}>
                <img
                  src={x.images.jpg.large_image_url}
                  alt={x.title}
                  className="h-96"
                />
              <h3 className="w-52 my-2">
                {x.title.length > 20 ? `${x.title.slice(0, 20)}...` : x.title}
              </h3>
              </Link>
            </div>
          ))
        )}
      </Slider>
      <div className="mt-6">
        <Link
          href="/popular"
          className="border border-white uppercase font-bold p-2 px-4 duration-300 hover:border-orange-500 hover:text-orange-500 text-lg"
        >
          Browse more
        </Link>
      </div>
    </div>
  );
};
