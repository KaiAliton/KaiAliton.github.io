import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function TestForms() {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const testAddVideo = async (e) =>
    {
        e.preventDefault()
        var formdata = new FormData();
        formdata.append("name", e.target.name.value);
        formdata.append("caption", e.target.caption.value);
        formdata.append("cover", e.target.cover.files[0]);
        formdata.append("audio", e.target.audio.files[0]);
        e.target.video ? formdata.append("video", e.target.video.files[0]): formdata.append("video", null)
        formdata.append("genre", e.target.genre.value);
        console.log("testing add video")
        console.log(formdata)
        let response = await fetch('http://192.168.0.112:8000/create_video/', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: formdata
        })
        console.log(response)
    }
    const testAddPost = async (e) =>
    {
        e.preventDefault()
        var formdata = new FormData();
        formdata.append("title", e.target.title.value);
        formdata.append("caption", e.target.caption.value);
        formdata.append("cover", e.target.cover.files[0]);
        console.log("testing add post")
        console.log(formdata)
        let response = await fetch('http://192.168.0.112:8000/create_post/', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: formdata
        })
        console.log(response)
    }
    const testAddComment = async (e) =>
    {
        
        e.preventDefault()
        console.log("testing Add Comment")
        var formdata = new FormData();
        formdata.append("text", e.target.text.value);
        formdata.append("post", e.target.post.value);
        console.log(formdata)
        let response = await fetch('http://192.168.0.112:8000/create_comment/', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: formdata
        })
        console.log(response)
    }
    const testEditVideo = async (e) =>
    {
        e.preventDefault()
        var formdata = new FormData();
        var videoId = e.target.videoId.value;
        formdata.append("name", e.target.name.value);
        formdata.append("caption", e.target.caption.value);
        e.target.cover.value != ""? formdata.append("cover", e.target.cover.files[0]): formdata.append("cover", "")
        e.target.audio.value != ""? formdata.append("audio", e.target.audio.files[0]): formdata.append("audio", "")
        e.target.video.value != ""? formdata.append("video", e.target.video.files[0]): formdata.append("video", "")
        console.log("testing edit video")
        console.log(e.target.video.value == "")
        for (const value of formdata.values()) {
            console.log(value);
          }
        let response = await fetch(`/update_video/${videoId}/`, {
            method: "PATCH",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: formdata
        })
        console.log(response)
    }
    const testDeleteVideo = async (e) =>
    {
        e.preventDefault()
        console.log("testing Delete Video")
        var videoId = e.target.video.value;
        let response = await fetch(`http://192.168.0.112:8000/delete_video/${videoId}/`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })
        console.log(response)
    }
    const testCreateChannel = (e) =>
    {
        e.preventDefault()
        console.log("testing Create Channel")
    }
    const testupdateChannel = (e) =>
    {
        e.preventDefault()
        console.log("testing update Channel")
    }
  return (
    <div className='text-black w-64'>
        <form onSubmit={testAddVideo} className="flex flex-col my-10 border-2">
            <span>testAddVideo</span>
            <input className=' border-b-2' name='name' placeholder='name' type="text" required/>
            <input className=' border-b-2' name='caption' placeholder='caption' type="text" required/>
            <input className=' border-b-2' name='cover' placeholder='cover' type="file" required/>
            <input className=' border-b-2' name='audio' placeholder='audio' type="file" required/>
            <input className=' border-b-2' name='video' placeholder='video' type="file" />
            <input className=' border-b-2' name='genre' placeholder='genre' type="text" required/>
            <input type="submit" value="Submit" />
        </form>
        <form onSubmit={testAddPost} className="flex flex-col my-10 border-2">
        <span>testAddPost</span>
        <input className=' border-b-2' name='cover' placeholder='cover' type="file" required/>
        <input className=' border-b-2' name='title' placeholder='title' type="text" required/>
        <input className=' border-b-2' name='caption' placeholder='caption' type="text" /> 
            <input type="submit" value="Submit" />
        </form>
        <form onSubmit={testAddComment} className="flex flex-col my-10 border-2">
        <span>testAddComment</span>
        <input className=' border-b-2' name='text' placeholder='text' type="text" />
        <input className=' border-b-2' name='post' placeholder='post' type="text" />
            <input type="submit" value="Submit" />
        </form>
        <form onSubmit={testEditVideo} className="flex flex-col my-10 border-2">
        <span>testEditVideo</span>
        <input className=' border-b-2' name='videoId' placeholder='video' type="text" required/>
        <input className=' border-b-2' name='name' placeholder='name' type="text" />
            <input className=' border-b-2' name='caption' placeholder='caption' type="text" />
            <input className=' border-b-2' name='cover' placeholder='cover' type="file" />
            <input className=' border-b-2' name='audio' placeholder='audio' type="file" />
            <input className=' border-b-2' name='video' placeholder='video' type="file" />
        <input type="submit" value="Submit" />
        </form>
        <form onSubmit={testDeleteVideo} className="flex flex-col my-10 border-2">
        <span>testDeleteVideo</span>
        <input className=' border-b-2' name='video' placeholder='video' type="text" />
            <input type="submit" value="Submit" />
        </form>
        <form onSubmit={testCreateChannel} className="flex flex-col my-10 border-2">
        <span>testCreateChannel</span>
        <input className=' border-b-2' name='title' placeholder='title' type="text" required/>
        <input className=' border-b-2' name='caption' placeholder='caption' type="text" required/>
        <input className=' border-b-2' name='cover' placeholder='cover' type="text" required/>   
            <input type="submit" value="Submit" />
        </form>
        <form onSubmit={testupdateChannel} className="flex flex-col my-10 border-2">
        <span>testupdateChannel</span>
        <input className=' border-b-2' name='title' placeholder='title' type="text" />
        <input className=' border-b-2' name='caption' placeholder='caption' type="text" />
        <input className=' border-b-2' name='cover' placeholder='cover' type="text" />   
            <input type="submit" value="Submit" />
        </form>
    </div>
    
  )
}

export default TestForms