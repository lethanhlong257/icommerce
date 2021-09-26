async function searchProduct(payloadRequest, {opt}) {
  console.log('payloadRequest', payloadRequest)
  console.log('opt', opt)

  return {value: 'ok', error: 'not found'}
}

export default {
  searchProduct
}
