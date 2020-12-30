import styled from "styled-components";

interface ITagProps {
  color: string;
}

export const Container = styled.li`
  background-color: ${(props) => props.theme.colors.tertiary};
  list-style: none;
  border-radius: 5px;
  margin: 10px 0;
  padding: 12px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s;

  position: relative;

  &:hover {
    /* opacity: 0.7; */
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;

    span {
      font-weight: 500;
      font-size: 22px;
    }
  }

  .right-container {
    flex-direction: row;
    align-items: center;
  }
`;

export const Tag = styled.div<ITagProps>`
  width: 13px;
  height: 60%;
  background-color: ${(props) => props.color};

  position: absolute;
  left: 0;
`;

export const ActionContainer = styled.div`
  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 16px;
    color: white;
    width: 35px;
    height: 35px;
    background-color: #e44c4e;
    border-radius: 100%;
    margin-left: 30px;

    &:hover {
      opacity: 0.7;
    }
  }
`;
