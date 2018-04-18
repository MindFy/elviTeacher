export function findDelegateList() {
  return `{
    find_delegate(
        skip: 0,
        limit: 10,
        where: {
            user_id: 1,
                goods_id:1,
                currency_id:3,
            status:{
                in: ["waiting",'dealing']
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

export function findDelegateSelf() {
  return `{
    find_delegate(
        skip: 0,
        limit: 10,
        where: {
            user_id: 1,
            status:{
                in: ["waiting",'dealing']
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
