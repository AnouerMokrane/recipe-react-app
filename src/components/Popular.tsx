import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { Link } from "react-router-dom";

type Popular = {
  id: number;
  title: string;
  image: string;
};

const Popular = () => {
  const [popular, setPopular] = useState<Popular[]>([]);
  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=9
      `
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };
  useEffect(() => {
    getPopular();
  }, []);
  return (
    <>
      {popular ? (
        <Wrapper>
          <h3>Popular Picks</h3>
          <Splide
            options={{
              perPage: 4,
              arrows: false,
              pagination: false,
              grag: "free",
              gap: "3rem",
            }}
          >
            {popular.map((recipe) => (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={`recipe/${recipe.id}`}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            ))}
          </Splide>
        </Wrapper>
      ) : null}
    </>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 22rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, 0);
    width: 100%;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
