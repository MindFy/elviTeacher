export default function findListSelf() {
  return `{
    find_deal(
        skip: 0,
        limit: 10,
        where: {
          or:[{
            buyer_id: 1
          },{
            seller_id: 1
          }]
        },
        order: "-createdAt"
    ){
        id
        dealPrice
        quantity
        buyerFee
        sellerFee
        createdAt
        currency{
          id
            name
        },
        goods{
          id
            name
        }
        buyer{
          id
          name
        }
        seller{
          id
          name
        }

    }
}`
}
