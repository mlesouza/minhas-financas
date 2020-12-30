import styled from "styled-components";

interface IColProps {
  width: string;
}

interface IRowProps {
  justifyContent?: string;
  alignItems?: string;
}

export const Container = styled.div``;

export const Content = styled.main`
  background-color: ${(props) => props.theme.colors.tertiary};
  display: flex;
  flex-wrap: wrap;
  border-radius: 7px;
  padding: 30px 20px;
`;

export const Row = styled.div<IRowProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const Col = styled.div<IColProps>`
  width: ${(props) => props.width};
  padding: 0 10px;
`;

export const FormSelect = styled.div`
  select {
    width: 100%;
    padding: 12px 16px;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    border-radius: 4px;
    /* border: 2px solid; */
    font-size: 15px;
  }

  label {
    display: block;
    color: ${(props) => props.theme.colors.white};
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

export const FormButton = styled.button`
  margin-right: 10px;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.logoColor};
  border: 2px solid ${(props) => props.theme.colors.logoColor};
  color: white;
  font-weight: 500;

  &:hover {
    opacity: 0.7;
  }
`;

export const ButtonBack = styled.button`
  margin-right: 15px;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  border-radius: 7px;
  background-color: transparent;
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;

  &:hover {
    opacity: 0.7;
  }
`;
