import styled from "styled-components";

export type Filter = {
  toggle: boolean
  // rigth: boolean
  // left: boolean
}

export const Wrapper = styled('div')`
  display: flex;
  background: #60708f;
  border-radius: 30px;
  height: 43px;
  padding: 3px;
  cursor: pointer;
  user-select: none;
`

export const RadioBtn = styled('div')`
  display: flex;
  align-self: center;
  justify-content: space-around;
  align-items: center;
  width: ${({ toggle }: Filter) => toggle ? '196px' : '157.49px'};
  ${({ toggle }: Filter) => toggle && 'background: linear-gradient(109.5deg, #7569ff -22.6%, #d869ff 118.85%)'};
  ${({ toggle }: Filter) => toggle && 'border-radius: 30px'};
  ${({ toggle }: Filter) => toggle && 'height: 37.12px'};
`

