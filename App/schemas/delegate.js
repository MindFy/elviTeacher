export function findDelegateSelfCurrent(id, skip, limit, goodsId, currencyId) {
  return `{
    find_delegate(
        skip: ${skip},
        limit: ${limit},
        where: {
            user_id: ${id},
            goods_id: ${goodsId},
            currency_id: ${currencyId},
            status:{
                in: ["waiting","dealing"]
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

export function findDelegateSelfHistory(id, skip, limit, goodsId, currencyId) {
  return `{
    find_delegate(
        skip: ${skip},
        limit: ${limit},
        where: {
            user_id: ${id},
            goods_id: ${goodsId},
            currency_id: ${currencyId},
            status:{
                in: ["complete", "cancel", "canceling"]
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
