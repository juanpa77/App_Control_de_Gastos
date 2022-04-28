import styled from "styled-components";


export const ConfigScreen = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 15% 8fr;
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
export const Title = styled.h3`
    align-self: center;
    color: white;
`

export const CategoryList = styled.ul`
    display: grid;
    width: auto;
    gap: 13px;
`
export const CategoryListItem = styled.li`
    display: flex;
    background-color: #1B1D2F;
    border: 2px solid #edbfff;
    border-radius: 10px;
    margin: 0 10px;
    
    cursor: pointer;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
`