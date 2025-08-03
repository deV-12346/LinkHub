import Navabar from '../components/Navabar'
import AllPosts from '../components/AllPosts.jsx'
import AddPost from '../components/AddPost.jsx'
const Home = () => {
   return (
    <div className='min-h-screen w-full '>
      <Navabar/>
      <AddPost/>
      <AllPosts/>
    </div>
  )
}

export default Home