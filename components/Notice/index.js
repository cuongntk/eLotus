import React from 'react'
import { notification } from 'antd'
import { words } from 'lodash'

import { getMsgClient } from 'lib/stringsUtils'
import SvgIcon from 'public/icons/SvgIcon'

export default function Notice(props) {
  const { msg, desc, place, isSuccess = true } = props

  let style = {
    maxWidth: '500px',
    boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.24)',
    borderRadius: '8px',
    background: isSuccess ? '#E5F5EB' : '#FCCED4',
  }

  notification.open({
    className: 'notification-custom ' + (isSuccess ? 'success' : 'error'),
    style: style,
    placement: place || 'bottomRight',
    message: (
      <div
        dangerouslySetInnerHTML={{
          __html: getMsgClient(msg || ''),
        }}
      />
    ),
    description: (
      <div
        dangerouslySetInnerHTML={{
          __html: getMsgClient(desc || ''),
        }}
      />
    ),
    icon: isSuccess ? <SvgIcon name="notice-success" /> : <SvgIcon name="notice-error" />,
    duration: words(msg).length > 20 ? 2 : 3.5,
  })
}
