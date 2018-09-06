const cache = {}

const getObject = (key) => {
  if (Object.keys(cache).indexOf(key) > -1) {
    return cache[key]
  }
  return null
}

const setObject = (key, value) => {
  cache[key] = value
}

const removeObject = (key) => {
  if (Object.keys(cache).indexOf(key) > -1) {
    delete cache[key]
  }
}

export default {
  getObject,
  setObject,
  removeObject,
}

