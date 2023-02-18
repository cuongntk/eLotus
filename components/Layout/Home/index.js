import React, { useEffect } from 'react'
import { Layout, Input } from 'antd'
import Router from 'next/router'

const { Header, Content } = Layout

export default function Home({ children }) {
  useEffect(() => {}, [])

  const onSearch = (value) => console.log(value)

  return (
    <Layout>
      <Header
        className="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <h1 onClick={() => Router.push('/')} style={{ color: '#fff', display: 'inline-block', cursor: 'pointer' }}>
          eLotus
        </h1>
        <Input.Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 200,
            display: 'inline-block',
            float: 'right',
            margin: '15px 0',
          }}
        />
      </Header>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
