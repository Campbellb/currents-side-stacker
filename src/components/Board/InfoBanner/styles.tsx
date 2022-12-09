import styled, { css } from "styled-components"

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