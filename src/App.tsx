import Category from "./components/Category";
import Pages from "./pages/Pages";
import {
  Link,
  NavLink,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Cuisine from "./pages/Cuisine";
import Search from "./components/Search";
import Searched from "./pages/Searched";
import RecipeDetails from "./pages/RecipeDetails";
import { GiKnifeFork } from "react-icons/gi";
import styled from "styled-components";
import PageTransition from "./components/PageTransition";

const Layout = () => {
  return (
    <>
      <Nav to={"/"}>
        <GiKnifeFork />
        <Logo>deliciouss</Logo>
      </Nav>
      <Search />
      <Category />
      <PageTransition>
        <Outlet />
      </PageTransition>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Pages />,
      },
      {
        path: "/cuisine/:type",
        element: <Cuisine />,
      },
      {
        path: ":type",
        element: <Cuisine />,
      },
      {
        path: "/searched/:search",
        element: <Searched />,
      },
      {
        path: "/recipe/:ID",
        element: <RecipeDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

const Nav = styled(Link)`
  display: flex;
  margin: 2rem 0;
  text-decoration: none;
  svg {
    fill: black;
    font-size: 2rem;
  }
`;

const Logo = styled.h2`
  margin-left: 0.5rem;
  color: black;
  font-weight: 400;
  text-decoration: none;
  font-size: 1.5rem;
  font-family: "Lobster", sans-serif;
`;

export default App;
