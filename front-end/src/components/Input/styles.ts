import styled from "styled-components";
import { Form as Unform } from "@unform/web";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Form = styled(Unform)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  input {
    width: 100%;
    margin-bottom: 15px;
    padding: 12px 16px;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    border-radius: 4px;
    /* border: 2px solid; */
    font-size: 15px;
    transition: border-color 0.2s;

    &::placeholder {
      color: ${(props) => props.theme.colors.white};
      opacity: 0.7;
    }

    &::-webkit-calendar-picker-indicator {
      filter: invert(${(props) => (props.theme.title === "dark" ? 1 : 0)});
      opacity: 1;
      outline: none;
    }

    &::-webkit-calendar-picker-indicator:hover {
      cursor: pointer;
    }
  }
  label {
    display: block;
    color: ${(props) => props.theme.colors.white};
    font-weight: 500;
    margin-bottom: 10px;
  }
`;
