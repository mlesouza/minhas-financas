import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.tertiary};
  padding: 20px;
  border-radius: 5px;

  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    font-size: 40px;
    margin-right: 5px;
  }
  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }
`;
