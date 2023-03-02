import { Disclosure } from '@headlessui/react'
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderStatic } from '../common/headers';
import { Tab } from '@headlessui/react'
import PostModal from '../common/PostModal';
import AuthContext from '../../context/AuthContext';
import useAxios from '../../utils/useAxios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Author() {
  const [songs, setSongs] = useState([]);
  const [author, setAuthor] = useState([]);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext)
  const [postCoverUrl, setPostCoverUrl] = useState(null)
  const [postCover, setPostCover] = useState(null)
  const [postModal, setPostModal] = useState(false)
  const [currentPost, setCurrentPost] = useState([])
  const [error, setError] = useState(null)
  const params = useParams();
  let api = useAxios();
  const authorName = params.username;
  useEffect(() => {
    fetch(`http://192.168.0.112:8000/author/${authorName}`).then((response) => response.json()).then((data) => {
      console.log(data)
      setAuthor(data.pop())
      setSongs(data[0])
      setPosts(data[1])
    });
  }, [])
  const handleChange = (e) => {
    setPostCoverUrl(URL.createObjectURL(e.target.files[0]));
    setPostCover(e.target.files[0])
    setError(null)
  }
  const removeCover = () => {
    setPostCoverUrl(null)
    setPostCover(null)
  }
  function OpenModal(data) {
    setPostModal(!postModal)
    setCurrentPost(data)
  }
  const createPost = async (e) => {
    e.preventDefault()
    var formdata = new FormData();
    if (!postCover) {
      setError("Обязательно добавьте обложку поста!")
      return
    }
    console.log(e.target)
    formdata.append("title", e.target.title.value);
    formdata.append("caption", e.target.caption.value);
    formdata.append("cover", postCover);
    console.log("testing add post")
    console.log(formdata)
    let response = await api.post("/create_post/", formdata)
    console.log(response)
    if (response.statusText == "Created") {
      window.location.reload()
    }
    console.log(response)
  }
  return (
    <div className="w-4/5 md:w-3/5 mx-auto">
      <HeaderStatic></HeaderStatic>
      <PostModal
        open={postModal}
        currentPost={currentPost}
        setPostModal={setPostModal}
      ></PostModal>
      <div className='mx-auto mt-5 max-w-5x h-full'>
        <div className='w-full mb-5 bg-slate-50 relative group  to-white'>
          <img src={"http://192.168.0.112:8000" + author.cover} alt="" className=' object-cover w-full max-h-72 rounded-b-2xl' />
        </div>
        <div className=' text-center my-4 text-gray-800'>
          <span className='text-2xl'>{author.username}</span>
        </div>
        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl p-1">
              <Tab className="ui-selected:underline ui-selected:border-2 border-black ui-selected:underline-offset-4 w-full rounded-lg py-2.5 text-sm font-medium leading-5  text-gray-800 ui-selected:text-lg hover:text-black">Видео</Tab>
              <Tab className="ui-selected:underline ui-selected:border-2 border-black ui-selected:underline-offset-4 w-full rounded-lg py-2.5 text-sm font-medium leading-5  text-gray-800 ui-selected:text-lg hover:text-black">Посты</Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className='mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                  {songs.map((song) =>
                    <div className="max-w-4xl p-6 rounded-xl dark:text-white-light group transition ease-in-out duration-500">
                      <a href={"/video/" + song.videoId}>
                        <div className='relative aspect-square  overflow-hidden'>
                          <div className="bg-orange-dark w-full opacity-0 transition ease-in-out h-full duration-500 absolute group-hover:opacity-90 flex items-center justify-center">
                            <button className='p-3 text-white font-bold bg-opacity-5 rounded-xl'>Слушать</button>
                          </div>
                          <img src={"http://192.168.0.112:8000/" + song.videoCover} alt="" className=" object-cover object-center w-full rounded-md h-full object-center dark:bg-gray-500" />
                        </div>
                      </a>
                      <div className="mt-6 mb-2">
                        <h2 className="text-xl  font-semibold tracking-wide text-black-dark"><a href={"/video/" + song.videoId}>{song.videoName}</a> {user && author.author_id == user.channel_id ?
                            <button>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => window.location.replace("/video/edit/" + song.videoId)}
                              />
                            </button> : null}</h2>
                        
                      </div>
                    </div>)}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  {user && author.author_id == user.channel_id ?
                    <div className='w-full my-3 bg-gray-200 rounded-lg'>
                      <form method='POST' onSubmit={createPost}>
                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-white ">
                          <div class="px-4 py-2 bg-white rounded-t-lg ">
                            <input type="text" name='title' placeholder='Добавьте заголовок поста' class="w-full px-0 text-lg text-gray-900 bg-white border-0 focus:ring-0 " />
                            <textarea id="comment" name='caption' rows="4" class="w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0 " placeholder="Напишите что-нибудь, это поле можно оставить пустым."></textarea>
                          </div>
                          <p className='text-red-500'>{error}</p>
                          {postCover ? <div className='relative w-fit m-3'>
                            <img src={postCoverUrl} alt="" className='w-32' />
                            <button className='absolute top-0 right-0 bg-slate-100' onClick={removeCover}>
                              <svg height="10px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="10px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" /></svg>
                            </button>
                          </div> : null}
                          <div class="flex items-center justify-between px-3 py-2 border-t rounded-b-lg bg-gray-200">
                            <input type="submit" value="Создать пост" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-800 bg-gray-100 rounded-lg cursor-pointer" />
                            <div class="flex pl-0 space-x-1 sm:pl-2">
                              <label for="cover" className=' cursor-pointer'>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                                <input type="file" id='cover' name='cover' onChange={handleChange} onClick={e => e.target.value = null} className='hidden' />
                              </label>
                            </div>
                          </div>
                        </div>

                      </form>
                    </div> : <div className='w-full h-5 bg-red-200'></div>}

                  <div className='mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {posts.map((post) =>
                      <div className="max-w-4xl p-1 dark:text-white-light group transition ease-in-out duration-500">
                        <a>
                          <div className='relative aspect-square  overflow-hidden'>
                            <div className="bg-orange-dark w-full opacity-0 transition ease-in-out h-full duration-500 absolute group-hover:opacity-90 flex items-center justify-center">
                              <button className='p-3 text-white font-bold bg-opacity-5 rounded-xl' onClick={() => OpenModal(post)}>Смотреть</button>
                            </div>
                            <img src={"http://192.168.0.112:8000/" + post.post_cover} alt="" className=" object-cover object-center w-full h-full object-center dark:bg-gray-500" />
                          </div>
                        </a>
                      </div>)}
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}