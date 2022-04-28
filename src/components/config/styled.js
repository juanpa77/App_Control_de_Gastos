import styled from "styled-components";

export const ConfigScreen = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    height: 100%;
    width: 75%;
    margin: 75px;
    padding: 20px 0;
    background: #1B1D2F;
    color: white;
    box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.06);
    border-radius: 30px;
    
    justify-items: center;
    align-self: center;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    
`

export const CategoryList = styled.ul`
    display: grid;
    width: auto;
    gap: 13px;
`
export const CategoryListItem = styled.li`
    display: flex;
    background-color: antiquewhite;
    border: 1px solid red;

    cursor: pointer;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
`