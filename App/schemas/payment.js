export function findPaymentListRecharge(userId, skip, limit) {
  return `{
    find_payment(
        skip: ${skip * limit},
        limit: ${limit},
        where: {
          user_id: ${userId},
          type: "recharge"
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

export function findPaymentListWithdraw(userId, skip, limit) {
  return `{
    find_payment(
        skip: ${skip * limit},
        limit: ${limit},
        where: {
          user_id: ${userId},
          type: "withdraw"
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
