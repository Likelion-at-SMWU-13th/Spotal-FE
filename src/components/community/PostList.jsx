import Post from './Post.jsx'
import NoResult from '@/assets/NoResult.svg?react'

const PostList = ({ postData }) => {
  if (postData.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center mt-[25vh] md:w-[36.7rem] w-[76.67vw]'>
        <NoResult className='w-[28vh] h-[28vh]' />
        <p className='text-[18px] font-[Medium] text-gray-700'>올라온 게시물이 아직 없어요..</p>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-[3.91vh] w-full'>
      {postData.map((post) => {
        return (
          <div key={post.memory_id}>
            <Post
              userId={post.user_id}
              emotionTags={post.emotions.map((e) => (typeof e === 'string' ? e : e.name))}
              locationTags={post.location.name}
              urllist={post.images}
              text={post.content}
              memory_id={post.memory_id}
              nickname={post.nickname}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PostList
