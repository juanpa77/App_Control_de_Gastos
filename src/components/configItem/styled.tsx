import styled from "styled-components"
import { Link } from "react-router-dom";

export const ItemConfigLink = styled(Link)`
    display: grid;
    align-items: center;
    justify-content: space-around;
    align-self: flex-start;
    grid-template-areas: 'II TT TT NN'
                         'II DD DD NN';
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr 7fr 1fr;
    width: 94%;
    background-color: transparent;
    border: none;
    color: white;
    padding: 0px 10px;
    margin: 10px 8px;
    cursor: pointer;

    & > strong {
        grid-area: TT;
        padding: 0 3px;
    }
    & > p {
        grid-area: DD;
        color: #60708F;
        margin: 0;
        font-size: 11px;
    }
    & > svg {
        grid-area: NN;
        align-self: center;
    }
    list-style: none;
    text-decoration: none;
    text-align: inherit;
    ;
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
export const ItemCategoryBtn = ItemConfigLink.withComponent('button')
