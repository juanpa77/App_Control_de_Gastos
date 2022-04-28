import styled from "styled-components"

export const Item = styled.div`
    display: grid;
    align-items: center;
    justify-content: space-around;
    grid-template-areas: 'II TT TT NN'
                         'II DD DD NN';
    grid-template-rows: repeat(2, 1fr);
    width: 94%;
    color: white;
    cursor: pointer;

    & > strong {
        grid-area: TT;
    }
    & > p {
        grid-area: DD;
        color: #60708F;
        margin: 0;
        font-size: 11px;
    }
    & > svg {
        grid-area: NN;
    }
`

export const IconContainer = styled.div`
    display: flex;
    grid-area: II;
    background-color: #D869FF;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    
`