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

export function findDelegateSelfHistory(id, skip, limit) {
  return `{
    find_delegate(
        skip: ${skip},
        limit: ${limit},
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
