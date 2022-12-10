import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import * as S from './styles'
import { StackerIcon } from '../icons/StackerIcon'
import { PlayerValue } from '../../types'

interface Props {
  setGameStarted: Dispatch<SetStateAction<boolean>>
}

export const Header: React.FC<Props> = ({ setGameStarted  }) => {
  return (
    <div>
      <Link href='/' onClick={() => setGameStarted(false)}>
        <S.HeaderTitle>
          <S.IconContainer>
            <StackerIcon />
          </S.IconContainer>
          Currents Side Stacker
        </S.HeaderTitle>
      </Link>
    </div>
  )
}
