export function* helloSaga() {
  console.log('Hello Saga!')
}

export default function* rootSaga() {
  yield [
    helloSaga(),
  ]
}
