export default function findLegalDeal() {
  return `{
    find_legalDeal(
        skip: 0,
        limit: 10,
        where: {
          creater_id: 1
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
