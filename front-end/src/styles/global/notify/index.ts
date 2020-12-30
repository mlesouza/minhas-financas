import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const NotifyContainer = styled(ToastContainer)`
  .Toastify__toast--success {
    background-color: ${(props) => props.theme.colors.sucess};
  }
  .Toastify__toast--info {
    background-color: ${(props) => props.theme.colors.info};
  }

  .Toastify__toast--warning {
    background-color: ${(props) => props.theme.colors.warning};
  }
`;
