import Head from 'next/head'
import { Board } from '../src/components/Board'
import { Game } from '../src/components/Game'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Side Stacker</title>
        <meta name="description" content="side stacker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Game />
      </main>
    </div>
  )
}
