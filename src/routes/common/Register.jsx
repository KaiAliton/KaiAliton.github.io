import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext.jsx'

function Register() {
    let { registerUser } = useContext(AuthContext)
    return (
        <div className='h-full w-full flex flex-row'> 
            <div className='w-1/2 right-0 mx-auto flex items-center flex-col justify-center content-center  rounded-lg'>
                <span className='text-5xl mb-10'>TailHost</span>
                <form onSubmit={registerUser} className="p-10 flex flex-col items-center justify-center content-center bg-slate-50" >
                <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="email" name='email' placeholder='Почта'/>
                    <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="text" name='username' placeholder='Логин'/>
                    <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="password" name='password' placeholder='Пароль'/>
                    <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="password" name='password2' placeholder='Повтор пароля'/>
                    <button className='my-4' type='submit'>Зарегистрироваться</button>
                    <a href="/Login/">Уже зарегистрированы?</a>
                </form>
            </div>
            
        </div>
    )
}

export default Register