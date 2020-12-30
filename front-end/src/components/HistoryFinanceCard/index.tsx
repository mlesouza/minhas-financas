import React from "react";
import CountUp from "react-countup";
import { RiDeleteBinLine } from "react-icons/ri";
import { Container, Tag, ActionContainer } from "./styles";

interface IHistoryFinanceCardProps {
  id: string;
  tagColor: string;
  title: string;
  subtitle: string;
  amount: number;
  remove?: (id: string) => void;
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
  tagColor,
  title,
  subtitle,
  amount,
  id,
  remove,
}) => {
  return (
    <Container>
      <Tag color={tagColor} />
      <div>
        <span>{title}</span>
        <small>{subtitle}</small>
      </div>
      <div className="right-container">
        <h3>
          <CountUp
            end={amount}
            prefix={"R$ "}
            duration={1}
            separator="."
            decimal=","
            decimals={2}
            preserveValue={true}
          />
        </h3>
        <ActionContainer className="action">
          {remove && (
            <button title="deletar" onClick={() => remove(id)}>
              <RiDeleteBinLine />
            </button>
          )}
        </ActionContainer>
      </div>
    </Container>
  );
};

export default HistoryFinanceCard;
