import styled from "styled-components";

export const List = styled('ul')`
  ::-webkit-scrollbar {
  -webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
  width: 10px;
}
::-webkit-scrollbar-button:increment,
.screen__trasactionList::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar:horizontal {
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background: var(--bottom-bg-colorPrimary);
  border-radius: 20px;
}

  list-style-type: none;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0;
  padding-inline-start: 0;

  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  align-items: center;
  overflow: auto;
`

export const TransactionItem = styled('li')`
  display: grid;
  grid-template-rows: 30% 70%;
  width: 75%;
  min-width: 369px;
  min-height: 70px;
  padding: 0px 22px;
  border-radius: 12.7194px;
  background: rgba(43, 30, 30, 0.51);
  box-shadow: 0px 3.17984px 12.7194px #0C0E0E;
  color: black;
  justify-content: space-between;
  align-items: center;
  justify-items: end;
  grid-template-areas:
    "V V I"
    "D C A";
    & svg {
      transform: rotate(90deg);
      & path {
        fill: #d869ff;
      }
    }
`

export const FilterBtn = styled('div')`
  display: flex;
  justify-content: center;
  padding: 10px;
`

type Props = {
  gridArea: string
}

export const Item = styled('div')`
  grid-area: ${({ gridArea }: Props) => gridArea};
  font-size: 40px;
`

export const WrapperFilter = styled('div')`
  display: flex;
`