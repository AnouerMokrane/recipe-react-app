import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Search = () => {
  const [val, setVal] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`searched/${val}`);
  };
  return (
    <FormStyle onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <BiSearch />
      </div>
    </FormStyle>
  );
};

const FormStyle = styled.form`
  margin: 4rem auto;
  max-width: 600px;

  div {
    width: 100%;
    position: relative;
  }

  input {
    border: none;
    outline: none;
    color: white;
    font-size: 0.9rem;
    background: linear-gradient(35deg, #494949, #313131);
    width: 100%;
    padding: 0.7rem 2rem;
    border-radius: 0.8rem;
  }

  svg {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    fill: white;
    font-size: 1.2rem;
    margin-left: 0.6rem;
  }
`;

export default Search;
