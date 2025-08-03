import React from 'react'

const PostCard = ({post}) => {
  return (
    <div className='h-auto  max-w-md w-full bg-gray-50 rounded my-5 py-3 px-4'>
      <div className='w-full  px-4 py-2 cursor-pointer rounded hover:bg-gray-100'>
         <div className='flex justify-center items-center py-1  gap-5 '>
            <img src={post.author?.avatar} alt="author-img" className='w-12 h-12 rounded-full' />
             <h1 className='text-xl text-gray-500 font-medium'>{post.author.name}</h1>
         </div>
         <p className='text-center text-gray-400'>{new Date(post.createdAt).toLocaleString()}</p>
      </div>
         <div className='px-2 text-center my-2'>
          <p className='text-gray-800 font-bold break-words'>
            {post.content}
          </p>
         </div>
    </div>
  )
}

export default PostCard