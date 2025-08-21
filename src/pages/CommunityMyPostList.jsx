import Dropdown from '@/components/community/Dropdown.jsx'
import Header2 from '@/components/shared/Header2.jsx'
import Footer from '@/components/shared/Footer.jsx'
import PostList from '@/components/community/PostList.jsx'

export const imageData = [
  {
    url: ['url1', 'url2', 'url3', 'url4'],
    text: '겨울마다 이 골목에서 붕어빵 먹던 기억이 나네요...\n 이젠 못먹는 게 아쉬워요',
  },
  {
    url: ['url1', 'url2', 'url3', 'url4'],
    text: '겨울마다 이 골목에서 붕어빵 먹던 기억이 나네요...\n 이젠 못먹는 게 아쉬워요',
  },
  {
    url: ['url1', 'url2', 'url3', 'url4'],
    text: '겨울마다 이 골목에서 붕어빵 먹던 기억이 나네요...\n 이젠 못먹는 게 아쉬워요',
  },
  {
    url: ['url1', 'url2', 'url3', 'url4'],
    text: '겨울마다 이 골목에서 붕어빵 먹던 기억이 나네요...\n 이젠 못먹는 게 아쉬워요',
  },
]

const CommunityMyPostList = () => {
  return (
    <div>
      <Header2 label1={'내 글'} label2={'새 글 작성'} link={'/writepage'} />
      <div className='px-[10.769vw] pt-[7.11vh] pb-[10vh] bg-white'>
        <div className='flex justify-between my-[2.49vh]'>
          <div className='flex gap-[1.54vw] '>
            <Dropdown label={'감정'} />
            <Dropdown label={'동네'} />
          </div>
        </div>
        <PostList postData={imageData} />
      </div>
      <Footer selectedMenu={'community'} />
    </div>
  )
}

export default CommunityMyPostList
