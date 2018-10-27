export function getGoogleAuth(schema) {
    return {
      type: 'securityCenter/get_google_auth',
      schema,
    }
}