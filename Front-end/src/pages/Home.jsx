import Navbar from '../components/Navbar.jsx'
import AllPosts from '../components/AllPosts.jsx'
import AddPost from '../components/AddPost.jsx'
const Home = () => {
   return (
    <div className='min-h-screen w-full '>
      <Navbar/>
      <AddPost/>
      <AllPosts/>
    </div>
  )
}

export default Home