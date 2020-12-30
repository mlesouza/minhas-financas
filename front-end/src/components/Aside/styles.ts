import styled from "styled-components";

export const Container = styled.div`
  grid-area: AS;
  padding-left: 20px;
  border-right: 1px solid ${(props) => props.theme.colors.gray};
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 70px;
`;

export const LogoImg = styled.img`
  height: 40px;
  width: 40px;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
  margin-left: 10px;

  > a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
  }
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
`;

export const MenuItemLink = styled.a`
  color: ${(props) => props.theme.colors.info};
  text-decoration: none;
  margin: 7px 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;

  > svg {
    margin-right: 5px;
    font-size: 18px;
  }

  &:hover {
    opacity: 0.7;
  }
`;
