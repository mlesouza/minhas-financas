import React, { useEffect, useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import { Container, Content, Row, Col } from "./styles";

import listOfMonths from "../../utils/months";
// import gains from "../../repositories/gains";
// import expenses from "../../repositories/expenses";
import { motion } from "framer-motion";
import MessageBox from "../../components/MessageBox";

import happyImage from "../../assets/happy.svg";
import sadImage from "../../assets/sad.svg";
import grinningImage from "../../assets/grinning.svg";
import PChart from "../../components/PChart";
import HistoryBox from "../../components/HistoryBox";
import AxiosService from "../../services/axios.service";
import IInvoice from "../../interfaces/invoice.interface";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1)
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear())
  );
  const [gains, setGains] = useState<IInvoice[]>([]);
  const [expenses, setExpenses] = useState<IInvoice[]>([]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const totalGains = useMemo(() => {
    let total = 0;
    const dataFiltered = gains.filter((gain) => {
      const date = new Date(gain.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    for (let data of dataFiltered) {
      total += Number(data.amount);
    }
    return total;
  }, [monthSelected, yearSelected, gains]);

  const totalExpenses = useMemo(() => {
    let total = 0;
    const dataFiltered = expenses.filter((expense) => {
      const date = new Date(expense.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    for (let data of dataFiltered) {
      total += Number(data.amount);
    }
    return total;
  }, [monthSelected, yearSelected, expenses]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês, você gastou mais do que deveria.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecessárias",
        icon: sadImage,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Neste mês, você gastou exatamente o que ganhou.",
        footerText:
          "Tenha cuidado. No prôximo mês tente poupar o seu dinheiro.",
        icon: grinningImage,
      };
    } else {
      return {
        title: "Muito bem!",
        description: "Sua carteira está positiva.",
        footerText: "Continue assim. Considere investir o seu saldo.",
        icon: happyImage,
      };
    }
  }, [totalBalance]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        color: "#F7931b",
        percent: Number(percentGains.toFixed(1)),
      },
      {
        name: "Saídas",
        value: totalExpenses,
        color: "#e44c4f",
        percent: Number(percentExpenses.toFixed(1)),
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return listOfMonths
      .map((_, month) => {
        let amountEntry = 0;
        let amountOutput = 0;

        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === Number(yearSelected)) {
            try {
              amountEntry += Number(gain.amount);
            } catch (error) {
              throw new Error(
                "amountEntry is invalid. amountEntry must be valid number"
              );
            }
          }
        });

        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === Number(yearSelected)) {
            try {
              amountOutput += Number(expense.amount);
            } catch (error) {
              throw new Error(
                "amountOutput is invalid. amountOutput must be valid number"
              );
            }
          }
        });
        return {
          monthNumber: month,
          month: listOfMonths[month].substr(0, 3),
          amountOutput,
          amountEntry,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (
          (Number(yearSelected) === currentYear &&
            item.monthNumber <= currentMonth) ||
          Number(yearSelected) < currentYear
        );
      });
  }, [yearSelected, gains, expenses]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    const data = [...expenses, ...gains];

    data.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });
    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, [gains, expenses]);

  useEffect(() => {
    const filterGains = {
      order: "date",
      where: {
        type: "entrada",
      },
      fields: {
        id: true,
        description: true,
        amount: true,
        type: true,
        frequency: true,
        date: true,
      },
    };

    const filterExpenses = {
      order: "date",
      where: {
        type: "saída",
      },
      fields: {
        id: true,
        description: true,
        amount: true,
        type: true,
        frequency: true,
        date: true,
      },
    };
    AxiosService.get("invoices", filterGains).then((res: any) => setGains(res));
    AxiosService.get("invoices", filterExpenses).then((res: any) =>
      setExpenses(res)
    );
  }, []);

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput
          options={months}
          defaultValue={monthSelected}
          onChange={(e) => setMonthSelected(e.target.value)}
        ></SelectInput>
        <SelectInput
          options={years}
          defaultValue={yearSelected}
          onChange={(e) => setYearSelected(e.target.value)}
        ></SelectInput>
      </ContentHeader>
      <motion.div
        initial={{ opacity: 0, translateX: 500 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{
          y: { type: "tween", stiffness: 300 },
          duration: 1,
        }}
      >
        <Content>
          <Row>
            <Col width="33.33%">
              <WalletBox
                title="Saldo"
                amount={totalBalance}
                footerLabel="atualizado com base nas entradas e saidas"
                icon="dolar"
                color="#4e41f0"
              />
            </Col>
            <Col width="33.33%">
              <WalletBox
                title="Entradas"
                amount={totalGains}
                footerLabel="atualizado com base nas entradas e saidas"
                icon="arrowUp"
                color="#f7931b"
              />
            </Col>
            <Col width="33.33%">
              <WalletBox
                title="Saídas"
                amount={totalExpenses}
                footerLabel="atualizado com base nas entradas e saidas"
                icon="arrowDown"
                color="#e44c4e"
              />
            </Col>
            <Col width="50%">
              <MessageBox
                title={message.title}
                description={message.description}
                footerText={message.footerText}
                icon={message.icon}
              />
            </Col>
            <Col width="50%">
              <PChart data={relationExpensesVersusGains} />
            </Col>
            <Col width="100%">
              <HistoryBox
                data={historyData}
                lineColorAmountEntry="#f7931b"
                lineColorAmountOutput="#e44c4e"
              />
            </Col>
          </Row>
        </Content>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
