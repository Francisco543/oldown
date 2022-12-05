import styled from "styled-components";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

const ContainerNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  align-items: center;
  background-color: #f5f4eb;
`;

const UlNavBar = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;
  align-items: center;
  margin-right: 150px;
  margin-bottom: 0px;
`;
const LiNavBar = styled.li`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const Logo = styled.img`
  justify-self: flex-start;
  width: 175px;
  height: 60px;
  margin-left: 50px;
  cursor: pointer;
`;

const NavBar = () => {
  return (
    <ContainerNav>
      <Link to="/">
        <Logo src={process.env.PUBLIC_URL + "/images/shopify-logo.png"} />
      </Link>
      <UlNavBar>
        <Link
          to={"/products"}
          style={{ textDecoration: "none", listStyle: "none", color: "black" }}
        >
          <LiNavBar>Productos</LiNavBar>
        </Link>
        <LiNavBar>Locales</LiNavBar>
        <LiNavBar>Promociones y Cuotas</LiNavBar>
        <LiNavBar>Gift Cards</LiNavBar>
      </UlNavBar>
      <CartWidget />
    </ContainerNav>
  );
};

export default NavBar;
