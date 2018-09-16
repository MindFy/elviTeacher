export default function findOpenOrders({ id, goodId, currencyId }) {
  return `{
      find_delegate(
          skip: 0,
          limit: 2,
          where: {
              user_id: ${id},
              goods_id: ${goodId},
              currency_id: ${currencyId},
              status:{
                  in: ["waiting",  "dealing"]
              }
          },
          order: "-id"
      ){
          id
          direct
          price
          status
          quantity
          dealled
          dealamount
          createdAt
          currency{
              id
              name
          },
          goods{
              id
              name
          }
      }
  }`
}
