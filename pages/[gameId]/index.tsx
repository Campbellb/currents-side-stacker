import { useRouter } from "next/router"
import Head from 'next/head'
import * as S from './styles'
import { Board } from "../../src/components/Board"

const GameId = () => {
  return (
    <div>
      <Head>
        <title>Side Stacker</title>
        <meta name="description" content="side stacker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <S.MainContainer>
        <Board />
      </S.MainContainer>
    </div>
  )
}

export default GameId;