export default function graphqlGet(id) {
  return `{
    user(id:"${id}"){
        id,
        name,
        idNo,
        idCardAuthStatus,
        idCardImages,
        mobile,
        email,
        emailStatus,
        status,
        role,
        bankNo,
        bankName,
        subbankName,
        createdAt
    }
}`
}
