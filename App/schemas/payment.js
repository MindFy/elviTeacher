export default function findPaymentList(userId, type, skip, limit) {
  return `{
    find_payment(
        skip: ${skip},
        limit: ${limit},
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
