import styled from "styled-components";

export const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  width: 100%;
  background: #2e3148;
  border-radius: 50px;
  justify-items: center;
`

export const Footer = styled('div')`
  display: grid;
  color: white;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  justify-content: center;
  align-items: center;
  justify-items: center;
`