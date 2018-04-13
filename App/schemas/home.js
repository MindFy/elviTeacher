export default function graphqlFindBanners() {
  return `{
    find_banners{
        id,
        title,
        imghash,
        createdAt
    }
}`
}
