import React from "react";
import {
  Container,
  ChartContainer,
  Header,
  LegendContainer,
  Legend,
} from "./styles";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import formatCurrency from "../../utils/formatCurrency";

interface IHistoryBoxProps {
  data: {
    month: string;
    amountEntry: number;
    amountOutput: number;
  }[];
  lineColorAmountEntry: string;
  lineColorAmountOutput: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
  data,
  lineColorAmountEntry,
  lineColorAmountOutput,
}) => (
  <Container>
    <Header>
      <h2>Histórico de saldo</h2>
      <LegendContainer>
        <Legend color={lineColorAmountEntry}>
          <div />
          <span>Entradas</span>
        </Legend>
        <Legend color={lineColorAmountOutput}>
          <div />
          <span>Saídas</span>
        </Legend>
      </LegendContainer>
    </Header>
    <ChartContainer>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 7, left: 7, bottom: 5 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3s" stroke="#b4b4b4" /> */}
          <XAxis dataKey="month" stroke="#b4b4b4" />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Line
            type="monotone"
            dataKey="amountEntry"
            name="Entradas"
            stroke={lineColorAmountEntry}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="amountOutput"
            name="Saídas"
            stroke={lineColorAmountOutput}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Container>
);

export default HistoryBox;
