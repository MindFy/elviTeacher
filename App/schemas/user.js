export default function findUser(id) {
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
        googleSecret,
        prefixNo,
        levelName,
        recommendId,
        createdAt
    }
}`
}
