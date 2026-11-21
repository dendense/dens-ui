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

export default function PostCardLayoutsDemo() {
  return (
    <div className="grid w-full gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <PostCard layout="horizontal">
        <PostCardMedia>
          <PostArt pair={2} className="size-full" />
        </PostCardMedia>
        <PostCardBody>
          <PostCardMeta>
            <PostCardTag>Case study</PostCardTag>
            <span>Oct 28</span>
            <PostCardDot />
            <span>10 min read</span>
          </PostCardMeta>
          <PostCardTitle href="#/docs/components/post-card">Moving a 40-person finance team off spreadsheets</PostCardTitle>
          <PostCardExcerpt>Month-end close went from nine days to four once every approval had an owner and a deadline.</PostCardExcerpt>
          <PostCardFooter>
            <span>
              By <strong>Nadia Rahma</strong>
            </span>
          </PostCardFooter>
        </PostCardBody>
      </PostCard>

      <PostCard layout="overlay">
        <PostCardMedia>
          <PostArt pair={4} flip className="size-full" />
        </PostCardMedia>
        <PostCardBody>
          <PostCardMeta>
            <PostCardTag>Release</PostCardTag>
            <span>Dens-UI 0.2</span>
          </PostCardMeta>
          <PostCardTitle href="#/docs/components/post-card">Charts, post cards and dividers</PostCardTitle>
          <PostCardExcerpt>Six SVG charts with no chart library, image-led cards and loading skeletons that keep their shape.</PostCardExcerpt>
        </PostCardBody>
      </PostCard>
    </div>
  )
}
