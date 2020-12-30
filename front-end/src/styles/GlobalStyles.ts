import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    *, button , input {
        border: 0;
        outline: 0;
        font-family: 'Roboto', sans-serif;
    }

    button {
        cursor: pointer;
    }

    ::-webkit-scrollbar {
    width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.colors.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${(props) => props.theme.colors.tertiary};
        border-radius: 10px;
    }

    .react-confirm-alert-overlay {
        background-color: ${(props) => props.theme.colors.primary}!important;
        opacity: 0.9!Important;
    }


    .react-confirm-alert {
        opacity: 1!important;
        > .react-confirm-alert-body {
            background-color: ${(props) => props.theme.colors.tertiary};
            color: ${(props) => props.theme.colors.white};

            h1 {
                margin-bottom: 10px;
            }
        }

        button {
            margin-right: 10px!important;
            align-items: center!important;
            padding: 10px!important;
            font-size: 14px!important;
            border-radius: 7px!important;

            color: white;
            font-weight: 500;
            &:first-of-type {
            background-color: ${(props) => props.theme.colors.sucess};
            }

            &:last-of-type {
            background-color: ${(props) => props.theme.colors.warning};

            }

            &:hover {
                opacity: 0.7;
            }
                
        }
    }
`;
