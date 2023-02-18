import React from 'react'
import Head from 'next/head'
import { Layout } from 'antd'

import styles from './layout.module.scss'

const { Content } = Layout

export default function Error({ children }) {
  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child {
          height: 100%;
        }
      `}</style>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
      </Head>

      <Layout className={styles.layoutWrapper}>
        <Content className={styles.contentWrapper}>{children}</Content>
      </Layout>
    </>
  )
}
