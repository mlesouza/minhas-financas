import React from "react";
import { Container } from "./styles";
import { BiSad } from "react-icons/bi";

interface INoDataProps {
  message: string;
}

const NoData: React.FC<INoDataProps> = ({ message }) => {
  return (
    <Container>
      <BiSad />
      <h3>{message}</h3>
    </Container>
  );
};

export default NoData;
