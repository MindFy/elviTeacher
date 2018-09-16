export function findDelegateSelfCurrent(id, skip, limit) {
  return `{
    find_delegate(
        skip: ${skip},
        limit: ${limit},
        where: {
            user_id: ${id},
            status:{
                in: ["waiting","dealing"]
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

export function findDelegateSelfCurrentWithGoodsId(id, goodsId, currencyId) {
  return `{
    find_delegate(
        skip: 0,
        limit: 2,
        where: {
            user_id: ${id},
            goods_id: ${goodsId},
            currency_id: ${currencyId},
            status:{
                in: ["waiting","dealing"]
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

export function findDelegateSelfHistory(id, skip, limit) {
  return `{
    find_delegate(
        skip: ${skip},
        limit: ${limit},
        where: {
            user_id: ${id},
            status:{
                in: ["complete", "cancel", "canceling"]
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
