export default function findAssetList(userId) {
  return `{
    find_asset(
    where:{
      user_id: ${userId}
    }){
        id,
        amount,
        freezed,
        rechargeaddr,
        totalRechargeAmount,
        platformFreeze,
        token{
          id
          name
        }
        createdAt
    }
  }`
}
