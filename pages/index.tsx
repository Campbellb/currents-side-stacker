import Head from 'next/head'
import { useState } from 'react'
import { Board } from '../src/components/Board'
import { Game } from '../src/components/Game'
import { PlayerValue } from '../src/types'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [player, setPlayer] = useState<PlayerValue>(PlayerValue.X)

  return (
    <div className={styles.container}>
      <Head>
        <title>Side Stacker</title>
        <meta name="description" content="side stacker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {gameStarted ? <Board player={player} /> : <Game setGameStarted={setGameStarted} player={player} setPlayer={setPlayer} />}
      </main>
    </div>
  )
}
