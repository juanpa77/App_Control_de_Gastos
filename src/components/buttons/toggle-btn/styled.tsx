import styled from "styled-components";

export type Filter = {
  toggle: boolean
  rigth: boolean
  left: boolean
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
  box-shadow: ${({ rigth, toggle }: Filter) => toggle && rigth && '-4px 0.17984px 7.7194px #d300ff'};
  box-shadow: ${({ left, toggle }: Filter) => toggle && left && '4px 0.17984px 7.7194px #d300ff'};
  ${({ toggle }: Filter) => toggle && 'background: linear-gradient(109.5deg, #7569ff -22.6%, #d869ff 118.85%)'};
  ${({ toggle }: Filter) => toggle && 'border-radius: 30px'};
  ${({ toggle }: Filter) => toggle && 'height: 37.12px'};
`


