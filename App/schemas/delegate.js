export function findDelegateSelfCurrent(id) {
  return `{
    find_delegate(
        skip: 0,
        limit: 10,
        where: {
            user_id: ${id},
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

export function findDelegateSelfHistory(id) {
  return `{
    find_delegate(
        skip: 0,
        limit: 10,
        where: {
            user_id: ${id},
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
