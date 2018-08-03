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

export function findBanners(language) {
  return `{
    find_banners(
      where: {
        language: "${language}"
      },
    ){
      id,
      hyperlink,
      imghash,
      createdAt
    }
}`
}
