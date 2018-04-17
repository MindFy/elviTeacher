export default function graphqlFindBanners() {
  return `{
    find_banners{
        id,
        hyperlink,
        imghash,
        createdAt
    }
}`
}
