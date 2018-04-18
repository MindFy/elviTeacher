export default function findPaymentList(userId, type) {
  return `{
    find_payment(
        skip: 0,
        limit: 10,
        where: {
          user_id: ${userId},
          type: ${type}
        },
        order: "-createdAt"
    ){
        id
        fromaddr
        toaddr
        type
        status
        amount
        reachtime
        extend
        createdAt
        token{
          id
          name
        }
    }
}`
}
