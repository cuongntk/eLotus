import { isArray, forEach, flatMap } from 'lodash'
// goi trong useEffect
export function submitFormUsingCtrlS(form, handleSubmit, isForm = true, formRef = null) {
  document.onkeydown = (e) => {
    // eslint-disable-next-line no-param-reassign
    if (!e) e = event
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault()
      if (formRef && formRef.current) {
        formRef.current.submit()
      } else {
        isForm
          ? form
              .validateFields()
              .then((values) => {
                handleSubmit(values)
              })
              .catch(() => {})
          : handleSubmit()
      }
    }
  }
}

export function submitFormWithCtrlS(formRef) {
  document.onkeydown = (e) => {
    // eslint-disable-next-line no-param-reassign
    if (!e) e = event
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault()
      formRef.current.submit()
    }
  }
}

export function submitFormWithCtrlKey(formRef, key = 's') {
  removeKeyDown()
  document.onkeydown = (e) => {
    // eslint-disable-next-line no-param-reassign
    if (!e) e = event
    if (e.ctrlKey && e.key === key.toLowerCase()) {
      e.preventDefault()
      formRef.current.submit()
    }
  }
}

export function submitFormAntWithCtrlKey(form, key = 83) {
  document.onkeydown = (e) => {
    if (!e) e = event
    if (e.ctrlKey && e.keyCode === key) {
      e.preventDefault()
      form.submit()
    }
  }
}

export function handleCtrlKey(onHandle, key = 'a') {
  const myFunc = (e) => {
    if (e.ctrlKey && e.key === key.toLowerCase()) {
      e.preventDefault()
      onHandle()
    }
  }
  document.addEventListener('keydown', myFunc)
  return myFunc
}

export function handlePressKey(onHandle, key = 'a') {
  const myFunc = (e) => {
    if (e.key.toLowerCase() === key.toLowerCase()) {
      e.preventDefault()
      onHandle()
    }
  }
  document.addEventListener('keydown', myFunc)
  return myFunc
}

export function handleCtrlD(onSubmit) {
  document.onkeydown = (e) => {
    if (e.ctrlKey && e.keyCode === 68) {
      e.preventDefault()
      onSubmit()
    }
  }
}

export const removeKeyDown = () => {
  document.onkeydown = null
}

export const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const trimData = (data) => {
  if (!data) return data
  const tempData = isArray(data) ? [] : {}
  forEach(data, (val, keyName) => {
    if (typeof val === 'string') tempData[keyName] = val.trim()
    else if (typeof val === 'object') tempData[keyName] = trimData(val)
    else tempData[keyName] = val
  })
  return tempData
}

export const treeToList = (data = [], key = 'value') => {
  let temVal = data
  forEach(data, (item) => {
    if (item.children) temVal = [...temVal, ...treeToList(item.children)]
  })
  return flatMap(temVal, (item) => item[key] || item)
}

export const checkSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}
