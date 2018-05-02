export default function findLegalDeal(id, skip) {
  return `{
      find_legalDeal(
          skip: ${skip},
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
