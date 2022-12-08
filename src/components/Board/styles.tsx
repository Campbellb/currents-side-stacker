import styled, { css } from "styled-components"

export const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`

export const BoardItem = styled.div`
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  cursor: pointer;
`

interface WinnerBannerProps {
  enabled: boolean
}

export const WinnerBanner = styled.div<WinnerBannerProps>`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 1rem;
  color: black;

  ${props => props.enabled && css`
    background-color: #ADD8E6;
  `}
`