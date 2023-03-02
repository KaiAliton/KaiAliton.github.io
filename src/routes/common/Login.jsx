import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext.jsx'

function Login() {

    let { loginUser } = useContext(AuthContext)
    return (
        <div className='h-full w-full flex flex-row'> 
            <div className='w-1/2 right-0 mx-auto flex items-center flex-col justify-center content-center  rounded-lg'>
                <span className='text-5xl mb-10'>TailHost</span>
                <form onSubmit={loginUser} className="p-10 flex flex-col items-center justify-center content-center bg-slate-50" >
                    <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="text" name="username" placeholder='Логин'/>
                    <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="text" name='password' placeholder='Пароль'/>
                    <button className='my-4' type='submit'>Войти</button>
                    <a href="/register/">Нет аккаунта?</a>
                </form>
            </div>
            
        </div>
    )
}

export default Login