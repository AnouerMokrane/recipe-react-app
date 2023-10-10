import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

type SearchItems = {
  id: number;
  title: string;
  image: string;
};

const Searched = () => {
  const { search } = useParams();
  const [searchItems, setSearchItems] = useState<SearchItems[]>([]);

  const getSearched = async (name: string | undefined) => {
    const data =
      await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${name}
  `);
    const recipes = await data.json();
    setSearchItems(recipes.results);
  };

  useEffect(() => {
    getSearched(search);
  }, [search]);

  return (
    <>
      <h2> {search}</h2>
      <Grid>
        {searchItems
          ? searchItems.map((recipe) => (
              <Card key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}>
                  <img src={recipe.image} alt={recipe.title} />
                  <h4>{recipe.title}</h4>
                </Link>
              </Card>
            ))
          : "can't find any recipes"}
      </Grid>
    </>
  );
};

const Grid = styled.div`
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

export default Searched;
