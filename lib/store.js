import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import SpvApi from 'api/SpvApi'

import { THEME_SETTING, SPV_PROPS, UC_PROPS, SPV_TYPES } from 'constants/constants'

export const StoreContext = React.createContext(null)

export default function StoreProvider({ children }) {
  const { LEFT_MENU, COLLAPSE, MR_CONTENT_WEC } = SPV_PROPS
  const { THEME, COLOR } = UC_PROPS

  const [user, setUser] = useState({})
  const [spvObj, setSpvObj] = useState({})
  const [ucObj, setUcObj] = useState({})
  const [listTab, setListTab] = useState(null)

  useEffect(() => {
    let defaultSpv = {
      [LEFT_MENU]: { [COLLAPSE]: true },
      [MR_CONTENT_WEC]: false,
    }
    let defaultUc = {
      [THEME]: { [COLOR]: THEME_SETTING.COLOR.GREEN },
    }

    SpvApi.getData()
      .then((res) => {
        if (res?.Object) {
          let spv = {}
          let uc = {}
          res.Object.forEach((obj) => {
            if (obj.Type === SPV_TYPES.SPV && obj.Json) spv = JSON.parse(obj.Json)
            if (obj.Type === SPV_TYPES.UC && obj.Json) uc = JSON.parse(obj.Json)
          })
          setSpvObj(_.merge(defaultSpv, spv))
          setUcObj(_.merge(defaultUc, uc))
        }
      })
      .catch((err) => {
        // console.log(err)
        setSpvObj(defaultSpv)
        setUcObj(defaultUc)
      })
  }, [])

  const store = {
    userStore: [user, setUser],
    spvStore: [spvObj, setSpvObj],
    ucStore: [ucObj, setUcObj],
    listTabStore: [listTab, setListTab],
  }
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
