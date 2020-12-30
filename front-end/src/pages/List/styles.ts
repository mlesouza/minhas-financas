import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.main``;

export const Filters = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 30px;
  .tag-filter {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${(props) => props.theme.colors.white};

    margin: 0 10px;
    transition: opacity 0.3s;
    opacity: 0.4;
    &:hover {
      opacity: 0.7;
    }
  }

  .tag-filter-recurrent::after {
    content: "";
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${(props) => props.theme.colors.sucess};
  }

  .tag-filter-eventual::after {
    content: "";
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${(props) => props.theme.colors.warning};
  }

  .tag-actived {
    opacity: 1;
  }
`;

export const InfoTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  > span {
    font-weight: 500;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const RegisterButton = styled.a`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.logoColor};
  border: 2px solid ${(props) => props.theme.colors.logoColor};
  color: white;
  /* opacity: 0.7; */
  font-weight: 500;
  margin-bottom: 15px;
  text-decoration: none;
  &:hover {
    opacity: 0.7;
  }

  > svg {
    margin-right: 5px;
    font-size: 18px;
  }
`;
