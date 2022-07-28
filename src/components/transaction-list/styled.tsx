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
  width: 75%;
  min-width: 369px;
  min-height: 150px;
  border-radius: 12.7194px;
  background: linear-gradient(109.5deg, #7569ff -22.6%, #d869ff 118.85%);
  box-shadow: 0px 3.17984px 12.7194px rgba(134, 255, 240, 0.4);
  align-items: center;
  justify-items: center;
  grid-template-areas:
    "US US OP OP I"
    "US US DD DD I";
`

export const Filter = styled('div')`
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