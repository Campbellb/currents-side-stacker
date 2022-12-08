import styled from "styled-components"

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