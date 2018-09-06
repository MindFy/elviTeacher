let instance = null
let shouldConnect = true

const getInstance = () => instance

const sendMessage = (msg) => {
  try {
    if (instance) {
      instance.send(msg)
    } else {
      // throw new Error('WebSocket is null')
    }
  } catch (ex) {
    // empty code
  }
}

const destory = () => {
  try {
    if (instance) {
      shouldConnect = false
      instance.onopen = undefined
      instance.onmessage = undefined
      instance.onclose = undefined
      instance.close()
      instance = null
    }
  } catch (ex) {
    // empty code
  }
}


const initInstance = ({ url, onOpen, onMessage, onError, onClose }) => {
  destory()
  shouldConnect = true
  // eslint-disable-next-line
  instance = new WebSocket(url)
  instance.onopen = function onopen() {
    if (onOpen) {
      onOpen()
    }
  }
  instance.onmessage = function onmessage(msg) {
    if (onMessage) {
      try {
        onMessage(JSON.parse(msg.data))
      } catch (e) {
        // empty code
      }
    }
  }
  instance.onerror = function onerror(error) {
    if (onError) {
      onError(error)
    }
  }
  instance.onclose = function onclose() {
    if (instance) {
      instance.close()
    }
    instance = null
    if (onClose) {
      onClose()
    }
    if (shouldConnect) {
      setTimeout(() => {
        if (shouldConnect) {
          initInstance({ url, onOpen, onMessage, onError, onClose })
        }
      }, 3000)
    }
  }
  return instance
}

module.exports = {
  getInstance,
  destory,
  initInstance,
  sendMessage,
}
