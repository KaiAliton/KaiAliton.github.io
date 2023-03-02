import { useContext, useState, useEffect, createContext } from 'react'
import jwt_decode from "jwt-decode"
import { Navigate, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let registerUser = async (e) => 
    {
        e.preventDefault()
        if(e.target.password.value != e.target.password2.value)
        {
            return alert("Пароли не совпадают")
        }
        let formData = new FormData()
        formData.append('username', e.target.username.value)
        formData.append('password', e.target.password.value)
        formData.append('password2', e.target.password2.value)
        formData.append('email', e.target.email.value)
        let response = await fetch('http://192.168.0.112:8000/register/', {
            method:'POST',
            body: formData
        })
        if(response.status === 201){
            alert("Успешно, теперь вы можете войти!")
            window.location.replace("/login");
        }else{
            alert('Something went wrong!')
        }
    }
    let loginUser = async (e )=> {
        e.preventDefault()
        let formData = new FormData()
        formData.append('username', e.target.username.value)
        formData.append('password', e.target.password.value)
        let response = await fetch('http://192.168.0.112:8000/login/token', {
            method:'POST',
            body: formData
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            window.location.replace("/");
        }else{
            alert('Something went wrong!')
        }
    }
    let logoutUser = () => {
        console.log("nihgger")
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        window.location.replace("/");
    }


    // let updateToken = async ()=> {

    //     console.log("refreshed...")
    //     let formData = new FormData()
    //     formData.append('refresh', authTokens?.refresh)

    //     let response = await fetch('http://192.168.0.112:8000/login/refresh', {
    //         method:'POST',
    //         body: formData
    //     })

    //     let data = await response.json()
        
    //     if (response.status === 200){
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //     }else{
    //          logoutUser()
    //     }

    //     if(loading){
    //         setLoading(false)
    //     }
    // }

    let contextData = {
        user:user,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser: registerUser
    }


    useEffect(()=> {
        
        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])
    
    return (
        <AuthContext.Provider value={contextData}>
           {loading ? null : children}
        </AuthContext.Provider>
    )

}