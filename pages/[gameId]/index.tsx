import { useRouter } from "next/router"
import Head from 'next/head'
import * as S from './styles'
import { Board } from "../../src/components/Board"
import { Header } from "../../src/components/Header"

const GameId = () => {
  return (
    <div>
      <Head>
        <title>Side Stacker</title>
        <meta name="description" content="side stacker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <S.MainContainer>
        <Board />
      </S.MainContainer>
    </div>
  )
}

export default GameId;