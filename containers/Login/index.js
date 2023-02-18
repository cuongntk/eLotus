import React from 'react'
import { Form, Input, Button } from 'antd'
import ApiAuth from 'api/auth'
import { useRouter } from 'next/router'
import notice from 'components/Notice'
import { setCookie } from 'lib/cookie'
import { pathHome } from 'services/path'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

export default function Login() {
  const router = useRouter()
  const { redirectURL } = router.query

  const onFinish = (values) => {
    ApiAuth.login(values).then((res) => {
      if (res?.data?.access_token) {
        setCookie('authToken', res.data.access_token)
        setCookie('userInfo', JSON.stringify(res.data.user))
        router.push(redirectURL ? redirectURL : pathHome)
      } else {
        notice({ msg: 'Sai email hoặc mật khẩu!', isSuccess: false })
      }
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Bạn chưa nhập email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Bạn chưa nhập mật khẩu!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}
