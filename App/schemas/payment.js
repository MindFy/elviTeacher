export default function findPaymentList() {
  return `{
    find_payment(
        skip: 0,
        limit: 10,
        where: {
          user_id: 1,
          type: 'withdraw'
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
