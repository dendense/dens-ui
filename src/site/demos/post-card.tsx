import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  PostCard,
  PostCardBody,
  PostCardDot,
  PostCardExcerpt,
  PostCardFooter,
  PostCardMedia,
  PostCardMeta,
  PostCardTag,
  PostCardTitle,
} from "@/components/ui/post-card"
import { PostArt } from "../parts/post-art"

const posts = [
  { tag: "Engineering", title: "How we cut settlement retries by half", excerpt: "Backing off on the bank API's own schedule instead of ours took retries from 1,240 a day to 590.", author: "Nadia Rahma", initials: "NR", date: "Nov 18", read: "6 min", art: 0 },
  { tag: "Product", title: "Approvals without the inbox", excerpt: "Requests now wait in one queue with the context attached, so nobody has to dig through email threads.", author: "Bayu Pratama", initials: "BP", date: "Nov 11", read: "4 min", art: 3 },
  { tag: "Operations", title: "A calmer on-call rotation", excerpt: "Fewer pages, longer handovers and a rule that every alert names its owner.", author: "Sinta Halim", initials: "SH", date: "Nov 4", read: "8 min", art: 1 },
]

export default function PostCardDemo() {
  return (
    <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <PostCard key={p.title}>
          <PostCardMedia>
            <PostArt pair={p.art} flip={i % 2 === 1} className="size-full" />
          </PostCardMedia>
          <PostCardBody>
            <PostCardMeta>
              <PostCardTag>{p.tag}</PostCardTag>
              <span>{p.read} read</span>
            </PostCardMeta>
            <PostCardTitle href="#/docs/components/post-card">{p.title}</PostCardTitle>
            <PostCardExcerpt>{p.excerpt}</PostCardExcerpt>
            <PostCardFooter>
              <Avatar className="size-8">
                <AvatarFallback className="text-[11px]">{p.initials}</AvatarFallback>
              </Avatar>
              <span className="flex flex-wrap items-center gap-x-2">
                <strong>{p.author}</strong>
                <PostCardDot />
                <time>{p.date}</time>
              </span>
            </PostCardFooter>
          </PostCardBody>
        </PostCard>
      ))}
    </div>
  )
}
