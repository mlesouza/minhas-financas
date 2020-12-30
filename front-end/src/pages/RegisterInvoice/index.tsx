import React, { useMemo, useRef, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import Input from "../../components/Input/Input";
import {
  Container,
  Content,
  Col,
  Row,
  FormSelect,
  FormButton,
  ButtonBack,
} from "./styles";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "../../components/Input/styles";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IInvoice from "../../interfaces/invoice.interface";
import axiosService from "../../services/axios.service";
import { useHistory } from "react-router-dom";

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

const RegisterInvoice: React.FC<IRouteParams> = ({ match }) => {
  const { type } = match.params;
  const history = useHistory();
  const [FrequencySelected, setFrequencySelected] = useState("recorrente");
  const titlePage = useMemo(() => {
    return type === "entry" ? "Cadastro de entrada" : "Cadastro de Saída";
  }, [type]);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<FormData> = (data: any) => {
    const typeOfInvoice = type === "entry" ? "entrada" : "saída";
    const date = new Date(data.date).toISOString();
    const object: IInvoice = {
      amount: Number(data.amount),
      date: date,
      description: data.description,
      frequency: FrequencySelected,
      type: typeOfInvoice,
    };
    axiosService
      .post("invoices", object)
      .then((_) => {
        toast.success("Cadastro efetuado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push(
          type === "entry" ? "/list/entry-balance" : "/list/exit-balance"
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <ContentHeader
        title={titlePage}
        lineColor={type === "entry" ? "#4E41F0" : "#e44c4e"}
      ></ContentHeader>
      <motion.div
        initial={{ opacity: 0, translateX: 500 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{
          y: { type: "tween", stiffness: 300 },
          duration: 1,
        }}
      >
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Row>
              <Col width="50%">
                <Input
                  required
                  name="description"
                  label="Descrição"
                  placeholder="Insira uma descrição"
                />
              </Col>
              <Col width="50%">
                <Input
                  required
                  name="amount"
                  label="Valor"
                  type="number"
                  step="0.01"
                  placeholder="Insira um valor"
                />
              </Col>
              <Col width="50%">
                <Input
                  required
                  name="date"
                  label="Data de vencimento"
                  type="date"
                  placeholder="Insira uma data"
                />
              </Col>
              <Col width="50%">
                <FormSelect>
                  <label>Frequência</label>
                  <select
                    defaultValue={FrequencySelected}
                    onChange={(e) => setFrequencySelected(e.target.value)}
                  >
                    <option value="eventual">Eventual</option>
                    <option value="recorrente">Recorrente</option>
                  </select>
                </FormSelect>
              </Col>
            </Row>
            <Row justifyContent="flex-end">
              <ButtonBack
                onClick={() =>
                  history.push(
                    type === "entry"
                      ? "/list/entry-balance"
                      : "/list/exit-balance"
                  )
                }
              >
                Voltar
              </ButtonBack>
              <FormButton type="submit">Salvar</FormButton>
            </Row>
          </Form>
        </Content>
      </motion.div>
    </Container>
  );
};

export default RegisterInvoice;
