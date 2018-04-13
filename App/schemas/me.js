export default function userInfoSchema(id) {
  return `{
    user(id: "${id}") {
      name,
      idNo,
      idCardAuthStatus,
      idCardImages,
      mobile,
      password,
      salt,
      status,
      role,
      createdAt,
      updatedAt,
      id,
      email,
      emailStatus,
    }
  }`
}
