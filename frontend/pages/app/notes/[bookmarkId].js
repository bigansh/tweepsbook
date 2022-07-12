import React, { useState } from 'react'
import dynamic from "next/dynamic";
import { IconContext } from "react-icons";
import { useRouter } from 'next/router';
import { GrNotes } from "react-icons/gr";
import { BiTrashAlt } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiArchiveIn } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'

import DashNavbar from '../../../src/components/DashNavbar'

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

const notes = () => {
    const router = useRouter();
    const {bookmarkId} = router.query;
    
    const [value, setValue] = useState("**Start taking your Notes Here...**");
    const [eye, setEye] = useState(true);

    return (
        <div className='h-screen'>
            <DashNavbar search={false} />


            <div className='flex justify-around'>
                <div className='flex flex-col p-1 w-1/3 justify-between'>

                    {/* Selected Tweet goes here */}
                    <div className='flex flex-col rounded-md border w-96 h-fit p-1 m-4 '>
                        <div className='w-full flex items-center'>
                            <img
                                src='https://pbs.twimg.com/profile_images/1209898984/twitter_normal.jpg'
                                className='w-10 h-10 rounded-full m-1 p-1'
                            />
                            <span className='mx-1'>
                                opdmcv
                            </span>
                            <span className='mx-1 font-thin text-xs'>
                                @dkjncv •{' '}
                                kodnmcv
                            </span>
                            <div className='flex items-center p-2 justify-end'>
                                <BsTwitter className='mx-3' />
                            </div>
                        </div>
                        <p className='m-1 p-1'>vkmdfkvmdkcmkldmckldmckldmckldmcklmc ckdmc ckmckld ckldmc</p>

                        <div className='flex items-center opacity-50 p-2 justify-end'>
                            <BiArchiveIn className='mx-3 w-5 h-5' />
                            <BiTrashAlt
                                className='mx-3 w-5 h-5'
                                // onClick={() =>
                                // 	delete(.backend._id)
                                // }
                                style={{ cursor: 'pointer' }}
                            />
                            <GrNotes className='mx-3 w-5 h-5' />
                        </div>
                    </div>

                    {/* Tweet Menu Functions */}
                    <div className='flex justify-around items-center w-full'>
                        <IconContext.Provider value={{ color: "darkBlue", className: "hover:opacity-70" }} ><button className='flex items-center rounded-sm justify-around m-1 border w-10 h-10 '><BiArchiveIn className='w-6 h-6' /></button></IconContext.Provider >

                        <IconContext.Provider value={{ color: "darkBlue", className: "hover:opacity-70" }} ><button onClick={() => setEye(!eye)} className='flex items-center rounded-sm justify-around m-1 border w-10 h-10 '>{eye ? <AiOutlineEye className='w-6 h-6' /> : <AiOutlineEyeInvisible className='w-6 h-6' />}</button></IconContext.Provider >

                        <IconContext.Provider value={{ color: "darkBlue", className: "hover:opacity-70" }} ><button className='flex items-center rounded-sm justify-around m-1 border w-10 h-10 '><BiTrashAlt className='w-6 h-6' /></button></IconContext.Provider >
                    </div>
                </div>

                <div className='flex m-4 w-1/2' data-color-mode="light">
                    <MDEditor value={value} onChange={setValue} height="350" preview="edit" visibleDragbar="false" className='borde rounded w-full' />
                </div>
            </div>
        </div>
    )
}

export default notes