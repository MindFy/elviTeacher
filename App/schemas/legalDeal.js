export default function findLegalDeal(id) {
  return `{
    find_legalDeal(
        skip: 0,
        limit: 10,
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
        createdAt
    }
}`
}
