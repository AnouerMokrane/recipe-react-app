import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Details = {
  title: string;
  image: string;
};

const RecipeDetails = () => {
  const { ID: recipeId } = useParams();
  const [details, setDetails] = useState<Details>({} as Details);
  const [activeTab, setActiveTab] = useState("instructions");

  const getDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    getDetails();
  }, [recipeId]);

  return (
    <DetailsWrapper>
      <div>
        <h2>{details.title} </h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" ? (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        ) : (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}> {ingredient.original} </li>
            ))}
          </ul>
        )}
      </Info>
    </DetailsWrapper>
  );
};

const DetailsWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
    max-width: 550px;
  }
  ul {
    margin-top: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;

const Info = styled.div`
  margin-left: 10rem;
  p {
    margin-top: 2rem;
    line-height: 1.5;
  }
  a {
    color: black;
  }
  li {
    font-size: 1rem;
    line-height: 1.4;
    margin-top: 1rem;
  }
`;

export default RecipeDetails;
