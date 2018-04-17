export default function graphqlFindAnnouncement() {
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
