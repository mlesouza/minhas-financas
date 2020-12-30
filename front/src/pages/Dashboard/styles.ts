import styled from "styled-components";

interface IColProps {
  width: string;
}
export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12.5px;
`;

export const Col = styled.div<IColProps>`
  max-width: ${(props) => props.width};
  width: 100%;
  padding: 0 12.5px;
`;
