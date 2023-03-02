import React, { Component, useContext } from 'react'
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import AuthContext from '../../context/AuthContext.jsx'


export function HeaderStatic() {
    
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div className=" mx-auto w-full h-full items-center flex relative z-50" id="header-container">
            <header className=" pb-0 w-full text-black   mx-auto " id="header">   {/*хедер с лого слева, ссылки справа, распределено*/}
                <div className="container flex justify-between h-8 mx-auto md:space-x-8">
                    <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-0">
                        <span className="text-2xl font-sans">TailHost</span>
                    </a>
                    <ul className="justify-center hidden space-x-3 md:flex">
                        <li className="flex">
                            <a rel="noopener noreferrer" href="/popular" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Популярное</a>
                        </li>
                        <li className="flex">
                            <a rel="noopener noreferrer" href="/genres" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Жанры</a>
                        </li>
                        {user ? <li className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left z-50">
                                <div className="h-full flex ">
                                    <Menu.Button className="inline-flex w-full justify-center">
                                        {user.username}
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        {user.channel_id ? <a href={"/author/" + user.channel_id}>Мой канал</a> : <a href={"/channel/create"}>Создать канал</a>}
                                                        
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        {user.channel_id ?
                                        <div className="px-1 py-1 ">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        <a href="/upload">Добавить видео</a>
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        : null}
                                        <div className="px-1 py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button onClick={logoutUser}
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >

                                                   Выйти
                                                </button>
                                                )}
                                            </Menu.Item>

                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>



                        </li> : <li className="flex">
                            <a rel="noopener noreferrer" onClick={() => window.location.replace("/login")} className="cursor-pointer flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Войти</a>
                        </li>}
                    </ul>
                    <div className="md:hidden z-10 flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <div className="h-full flex ">
                                <Menu.Button className="inline-flex w-full justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className=" w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-400 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    <a href="/">Популярное</a>
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >

                                                    <a href="/genres">Жанры</a>
                                                </button>
                                            )}
                                        </Menu.Item>

                                    </div>
                                    {user ? 
                                    <div>
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                     <a href={"/author/" + user.channel_id}>Мой канал</a>
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <a href="/upload">Добавить видео</a>
                                            </button>   
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={logoutUser}
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >

                                               Выйти
                                            </button>
                                        )}
                                    </Menu.Item>

                                </div>
                                </div>
                                     : <div className="px-1 py-1">
                                     <Menu.Item>
                                         {({ active }) => (
                                             <button onClick={() => window.location.replace("/login")}
                                                 className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                             >

                                                Войти
                                             </button>
                                         )}
                                     </Menu.Item>

                                 </div>}
                                    
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>

                </div>
            </header>
        </div>
    )

};


export function HeaderAbsolute() {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div className="absolute h-full left-0 top-0 mx-auto w-full z-10" id="header-container">
            <header className="h-full pb-0 text-white mx-auto" id="header">   {/*хедер с лого слева, ссылки справа, распределено*/}
                <div className="container flex items-center h-full justify-between mx-auto md:space-x-8">
                    <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-0">
                        <span className="text-2xl font-sans">TailHost</span>
                    </a>
                    <ul className="justify-center hidden space-x-3 md:flex">
                        <li className="flex">
                            <a rel="noopener noreferrer" href="/popular" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Популярное</a>
                        </li>
                        <li className="flex">
                            <a rel="noopener noreferrer" href="/genres" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Жанры</a>
                        </li>
                        {user ? <li className="flex">
                            <a rel="noopener noreferrer" onClick={logoutUser} className="cursor-pointer flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">{user.username}</a>
                        </li> : <li className="flex">
                            <a rel="noopener noreferrer" onClick={() => window.location.replace("/login")} className="cursor-pointer flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Войти</a>
                        </li>}
                    </ul>
                    <div className="md:hidden z-10 flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <div className="h-full flex ">
                                <Menu.Button className="inline-flex w-full justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className=" w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    <a href="/popular">Популярное</a>
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    <a href="/genres">Жанры</a>
                                                </button>
                                            )}
                                        </Menu.Item>

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>

                </div>
            </header>
        </div>
    )

};



{/* <a rel="noopener noreferrer" onClick={logoutUser} className="cursor-pointer flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">
{user.username}
</a> */}