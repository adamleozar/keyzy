import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center text-2xl text-magenta">
        <p>Almost before we knew it, we had left the ground.</p>
      </div>
    </>
  )
}
