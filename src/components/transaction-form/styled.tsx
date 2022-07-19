import styled from "styled-components";

type Props = {
  isOpenModal: boolean
}

export const Wrapper = styled('form')`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  ${(props: Props) => props.isOpenModal && 'filter: blur(1px)'}
`