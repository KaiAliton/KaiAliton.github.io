import { Disclosure } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { HeaderStatic } from '../common/headers';

export default function Genres() {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        fetch(`http://192.168.0.112:8000/genres`).then((response) => response.json()).then((data) => {
            setGenres(data)
        });
    }, [])
    return (
        <div className="w-4/5 md:w-3/5 mx-auto">
        <HeaderStatic></HeaderStatic>
        <div className='max-w-5xl justify-center content-around h-full'>
            <div className='mt-4 mx-auto text-center text-xl'>
                <span className=''>Жанры</span>
                <hr className='mt-4 border-t-1' />
            </div>
            <div className='mt-5 grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {genres.map((genre) =>
                    <div className="max-w-4xl p-6 dark:text-white-light  group transition ease-in-out duration-500">
                        <div className='relative aspect-video overflow-hidden'>
                        <a href={"genre/" + genre.id}>
                            <div className="w-full transition h-full absolute flex items-center justify-center">
                                {genre.title}
                            </div>
                            <img src={"http://192.168.0.112:8000/tailhost/static/patterns/pattern (" + Math.floor(Math.random() * 100 + 1) + ").png"} alt="" className=" object-fill object-center w-full rounded-xl h-full object-center dark:bg-gray-500" />
                            </a>
                        </div>
                    </div>)}
            </div>
        </div>
        </div>
    );
}