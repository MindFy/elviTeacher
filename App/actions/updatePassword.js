export function updateForm(payload) {
    return {
        type: 'updatePassword/update_form',
        payload,
    }
}
  
export function updateAuthCodeType(payload) {
    return {
      type: 'updatePassword/update_auth_code_type',
      payload,
    }
}
  