export default function graphqlFindAddress(uid) {
  return `{
    find_address(
        skip: 0,
        limit: 10,
        where:{
          user_id: ${uid}
        }
        order: "-createdAt"
    ){
        id,
        withdrawaddr,
        remark
        token{
          id
          name
        }
        createdAt
    }
}`
}
