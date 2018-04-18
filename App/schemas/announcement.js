export default function findAnnouncement() {
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
