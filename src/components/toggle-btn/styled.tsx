import styled from "styled-components";

type Props = {
  toggle: boolean
}

export const Wrapper = styled('div')`
  display: flex;
  background: #60708f;
  border-radius: 30px;
  height: 43px;
  padding: 3px;
  cursor: pointer;
`

export const RadioBtn = styled('div')`
  display: flex;
  align-self: center;
  justify-content: space-around;
  align-items: center;
  width: ${(props: Props) => props.toggle ? '196px' : '157.49px'};
  ${(props: Props) => props.toggle && 'background: linear-gradient(109.5deg, #7569ff -22.6%, #d869ff 118.85%)'};
  ${(props: Props) => props.toggle && 'border-radius: 30px'};
  ${(props: Props) => props.toggle && 'height: 37.12px'};
`


