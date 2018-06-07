export function findUser(id) {
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

export function findAuditmanage(id) {
  return `{
    find_auditmanage(
        skip: 0,
        limit: 10,
        where: {
          user_id:"${id}",
          status:"refuse"
        },
        order: "-id"
    ){
        id
        status
        auditdata
    }
  }`
}
