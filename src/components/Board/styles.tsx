import styled, { css } from "styled-components"

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

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

export const MoveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  border-radius: 50px;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
`