export default function findOtcList({ id, skip, limit }) {
  return `{
    find_legalDeal(
        skip: ${skip * limit},
        limit: ${limit},
        where: {
            creater_id: ${id}
        },
        order: "-createdAt"
    ){
        id
        direct
        dealPrice
        quantity
        status
        createrPayinfo
        traderPayinfo
        isAllege
        createdAt
    }
}`
}
