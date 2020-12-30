import styled from "styled-components";

interface ILegendProps {
  color: string;
}

export const Container = styled.div`
  /* width: 100%; */
  margin: 10px 0;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.tertiary};
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  padding: 30px 20px;
`;

export const ChartContainer = styled.div`
  flex: 1;
  height: 180px;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  > h2 {
    margin-bottom: 20px;
  }
`;

export const LegendContainer = styled.ul`
  list-style: none;
  display: flex;
`;
export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;
  margin: 0 5px 15px 5px;
  > div {
    background-color: ${(props) => props.color};

    font-size: 14px;
    line-height: 40px;
    text-align: center;
    font-weight: 500;

    width: 40px;
    height: 40px;
    border-radius: 5px;
  }

  > span {
    margin-left: 10px;
  }
`;
