import styled from "styled-components";

export const Conteiner = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    ::-webkit-scrollbar {
    -webkit-appearance: none;
    }
    ::-webkit-scrollbar:vertical {
        width:10px;
    }


    ::-webkit-scrollbar-button:increment, ::-webkit-scrollbar-button {
        display: none;
    } 

    ::-webkit-scrollbar:horizontal {
        height: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: var(--bottom-bg-colorPrimary);
        opacity: 0.5;
        border-radius: 20px;
        border: 2px solid transparent;
    }

    ::-webkit-scrollbar-track {
        border-radius: 10px;  
    }
`