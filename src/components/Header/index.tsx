import Link from 'next/link'
import { StackerIcon } from '../StackerIcon'
import * as S from './styles'

export const Header: React.FC = () => {
  return (
    <div>
      <Link href='/'>
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
