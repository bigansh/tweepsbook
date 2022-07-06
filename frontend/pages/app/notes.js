import React from 'react'
import DashNavbar from '../../src/components/DashNavbar'
import { GrNotes } from "react-icons/gr";
import { BiTrashAlt } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
import { BiArchiveIn } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'

const notes = () => {
    return (
        <div>
            <DashNavbar search={false} />

            <div className='flex justify-around'>
                <div className='min-h-eigthy flex flex-col p-1 w-1/3 items-start justify-evenly'>
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

                    <div className='flex justify-center items-center w-full'>
                        <button className='flex items-center justify-center m-1 p-1 border w-20 h-10'><BiArchiveIn className='w-6 h-6 ' /></button>
                        <button className='flex items-center justify-center m-1 p-1 border w-20 h-10'><AiOutlineEye className='w-6 h-6 ' /></button>
                        <button className='flex items-center justify-center m-1 p-1 border w-20 h-10'><BiTrashAlt className='w-6 h-6 ' /></button>
                    </div>
                </div>

                <div className='flex w-1/2 border min-h-4/6'>
                    <input type="text" className='p-2 w-full h-2/3' placeholder="Your Notes here..." />
                </div>
            </div>
        </div>
    )
}

export default notes