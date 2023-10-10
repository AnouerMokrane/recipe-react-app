import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

type Cuisine = {
  id: number;
  title: string;
  image: string;
};

const Cuisine = () => {
  const { type } = useParams();
  const [cuisine, setCuisine] = useState<Cuisine[]>([]);

  const getCuisine = async (name: string | undefined) => {
    const data =
      await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&cuisine=${name}
  `);
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(type);
  }, [type]);

  return (
    <>
      <h2> {type} Cuisine </h2>
      <Grid>
        {cuisine
          ? cuisine.map((recipe) => (
              <Card key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}>
                  <img src={recipe.image} alt={recipe.title} />
                  <h4>{recipe.title} </h4>
                </Link>
              </Card>
            ))
          : "can't find any recipes"}
      </Grid>
    </>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
