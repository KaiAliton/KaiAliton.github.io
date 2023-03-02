import React from 'react'

const PostModal = ({ open, currentPost, setPostModal }) => {
    if (!open) return null
    return (
        <div className='fixed z-50 w-screen h-screen left-0 top-0 bg-gray-200/[0.5] flex content-center justify-center items-center'>
            <div className='relative bg-red-200 p-20 w-1/3'>
                <button onClick={() => setPostModal(false)}>Bello</button>
                <img src={"http://192.168.0.112:8000/" + currentPost.post_cover} alt="" className=" object-cover object-center w-full h-full object-center dark:bg-gray-500" />
                {currentPost.post_title}
                {currentPost.post_caption}
            </div>
        </div>
    )
}

export default PostModal