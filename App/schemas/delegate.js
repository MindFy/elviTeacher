export function findDelegateList(userId, goodsId, currencyId, status) {
  return `{
    find_delegate(
        skip: 0,
        limit: 10,
        where: {
            user_id: ${userId},
                goods_id: ${goodsId},
                currency_id: ${currencyId},
            status:{
                in: ${status}
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

export function findDelegateSelf(userId, status) {
  return `{
    find_delegate(
        skip: 0,
        limit: 10,
        where: {
            user_id: ${userId},
            status:{
                in: ${status}
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
