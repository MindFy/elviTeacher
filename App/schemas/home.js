export function findAnnouncement() {
  return `{
    find_announcement{
      id,
      title,
      content,
      imghash,
      createdAt
    }
  }`
}

export function findBanners() {
  return `{
    find_banners{
      id,
      hyperlink,
      imghash,
      createdAt
    }
}`
}
