export function findDelegateList(userId, goodsId, currencyId) {
  return `{
    find_delegate(
        skip: 0,
        limit: 10,
        where: {
            user_id: ${userId},
            goods_id: ${goodsId},
            currency_id: ${currencyId},
            status:{
                in: ["waiting", "dealing"]
            }
        },
        order: "-createdAt"
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

export function findDelegateSelf(userId) {
  return `{
    find_delegate(
        skip: 0,
        limit: 10,
        where: {
            user_id: ${userId},
            status:{
                in: ["complete", "cancel"]
            }
        },
        order: "-createdAt"
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
