import React from 'react'
import { Layout } from 'antd'
import styles from './styles.module.scss'

export default function Home({ children }) {
  return <Layout className={styles.layoutLogin}>{children}</Layout>
}
