import Link from 'next/link'
import * as S from './styles'
import { StackerIcon } from '../icons/StackerIcon'

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
