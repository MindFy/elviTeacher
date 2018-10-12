const initialState = {
    requestGoogleAuthLoading: false,
    GoogleAuthBinded: false,
}
  
  export default function updateBank(state = initialState, action) {
    let nextState
    const { type, payload } = action
  
    switch (type) {
        case 'securityCenter/get_google_auth':
        nextState = {
            ...state,
            requestGoogleAuthLoading: true,
        }
        break
        case 'securityCenter/get_google_auth_succeed':
        nextState = {
            ...state,
            requestGoogleAuthLoading: false,
            GoogleAuthBinded: true,
        }
        break
        case 'securityCenter/get_google_auth_failed':
        nextState = {
            ...state,
            requestGoogleAuthLoading: false,
            GoogleAuthBinded: false,
        }
        break
    default:
        nextState = state
        break
    }
  
    return nextState
}
  