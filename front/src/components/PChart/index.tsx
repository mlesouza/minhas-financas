import React from "react";
import CountUp from "react-countup";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Container,
  SideLeft,
  Legend,
  LegendContainer,
  SideRight,
} from "./styles";

interface IPChartProps {
  data: {
    name: string;
    value: number;
    color: string;
    percent: number;
  }[];
}

const PChart: React.FC<IPChartProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        {data.map((indicator, index) => {
          return (
            <Legend key={index} color={indicator.color}>
              <div>
                <span>{`${indicator.percent}%`}</span>
              </div>
              <span>{indicator.name}</span>
            </Legend>
          );
        })}
      </LegendContainer>
    </SideLeft>
    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="percent">
            {data.map((indicator, index) => (
              <Cell key={index} fill={indicator.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default PChart;
