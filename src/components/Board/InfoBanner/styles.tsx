import styled, { css } from "styled-components"

export const WinnerBanner = styled.div`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 1rem;
  color: black;
  background-color: #ADD8E6;
`

export const CopyButton = styled.button`
  border-radius: 50px;
  padding: 0.5rem;
  border: none;

  &:hover {
    background-color: #bababa;
    cursor: pointer;
  }
`

export const IconContainer = styled.div`
  width: 12px;
  height: 12px;
`

export const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`