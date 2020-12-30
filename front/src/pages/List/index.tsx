import React, { useMemo, useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import SelectInput from "../../components/SelectInput";
import {
  Container,
  Content,
  Filters,
  InfoTotal,
  ButtonContainer,
  RegisterButton,
} from "./styles";
import { TiPlus } from "react-icons/ti";
import formatCurrency from "../../utils/formatCurrency";
import FormatDate from "../../utils/formatDate";
import NoData from "../../components/NoData";
import listOfMonths from "../../utils/months";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import AxiosService from "../../services/axios.service";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  amount: number;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}
const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [listData, setListData] = useState<any[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1)
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear())
  );
  const [selectedFrequency, setSelectedFrequency] = useState([
    "recorrente",
    "eventual",
  ]);

  const { type } = match.params;

  const pageInfo = useMemo(() => {
    return type === "entry-balance"
      ? { title: "Entradas", lineColor: "#4E41F0" }
      : { title: "Saidas", lineColor: "#e44c4e" };
  }, [type]);

  // const listData = useMemo(() => {
  //   return type === "entry-balance" ? gains : expenses;
  // }, [type]);

  const total = useMemo(() => {
    let total = 0;
    for (let item of data) {
      total += item.amount;
    }
    return total;
  }, [data]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    listData.forEach((item) => {
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
  }, [listData]);

  const registerLink = useMemo(() => {
    return type === "entry-balance"
      ? "/register-invoice/entry"
      : "/register-invoice/exit";
  }, [type]);

  useEffect(() => {
    const filter = {
      order: "date",
      where: {
        type: type === "entry-balance" ? "entrada" : "saída",
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
    AxiosService.get("invoices", filter).then((res: any) => setListData(res));

    const filteredData = listData.filter((item) => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(item.frequency)
      );
    });

    const formattedData = filteredData.map((item) => {
      return {
        id: String(item.id),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        amount: Number(item.amount),
        frequency: item.frequency,
        dateFormatted: FormatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4e41f0" : "#e44c4e",
      };
    });

    setData(formattedData);
  }, [listData, monthSelected, yearSelected, selectedFrequency, type]);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(
      (item) => item === frequency
    );
    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }
  };

  const deleteHistoryCard = (id: string) => {
    confirmAlert({
      title: "Remover Fatura",
      message: "Tem certeza que deseja remover a fatura?",
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            AxiosService.delete("invoices", id)
              .then((_) =>
                toast.success("Removido com sucesso!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              )
              .catch((_) =>
                toast.error("Ops houve um problema no servidor.", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              );
          },
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Container>
      <ContentHeader title={pageInfo.title} lineColor={pageInfo.lineColor}>
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
        <ButtonContainer>
          <RegisterButton href={registerLink}>
            <TiPlus /> Novo registro
          </RegisterButton>
        </ButtonContainer>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateX: 500 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{
          y: { type: "tween", stiffness: 300 },
          duration: 1,
        }}
      >
        <Filters>
          <button
            className={`tag-filter tag-filter-recurrent ${
              selectedFrequency.includes("recorrente") && "tag-actived"
            }`}
            type="button"
            onClick={() => handleFrequencyClick("recorrente")}
          >
            Recorrentes
          </button>
          <button
            className={`tag-filter tag-filter-eventual ${
              selectedFrequency.includes("eventual") && "tag-actived"
            }`}
            type="button"
            onClick={() => handleFrequencyClick("eventual")}
          >
            Eventuais
          </button>
        </Filters>
      </motion.div>

      <Content>
        {data.length > 0 ? (
          <>
            {data.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, translateX: 500 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  y: { type: "tween", stiffness: 300 },
                  duration: 1,
                }}
              >
                <HistoryFinanceCard
                  remove={deleteHistoryCard}
                  id={item.id}
                  key={index}
                  tagColor={item.tagColor}
                  title={item.description}
                  subtitle={item.dateFormatted}
                  amount={item.amount}
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, translateX: 500 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                y: { type: "tween", stiffness: 300 },
                duration: 1,
              }}
            >
              <InfoTotal>
                <span>Total:</span>
                <h3>
                  <CountUp
                    end={total}
                    prefix={"R$ "}
                    duration={1}
                    separator="."
                    decimal=","
                    decimals={2}
                    preserveValue={true}
                  />
                </h3>
              </InfoTotal>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, translateX: 500 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              y: { type: "tween", stiffness: 300 },
              duration: 1,
            }}
          >
            <NoData message="Não foram encontrados dados."></NoData>
          </motion.div>
        )}
      </Content>
    </Container>
  );
};

export default List;
