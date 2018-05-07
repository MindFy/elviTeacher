export default function findLegalDeal(id, skip, limit) {
  return `{
      find_legalDeal(
          skip: ${skip},
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
          createdAt
      }
  }`
}
