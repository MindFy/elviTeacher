export default function requestReceiverInfo(payload) {
  return {
    type: 'receiverInfo/request_receiver_info',
    payload,
  }
}
