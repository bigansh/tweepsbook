import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BiTrashAlt } from 'react-icons/bi';
import { BiArchiveIn } from 'react-icons/bi';
import { BsTwitter } from "react-icons/bs";

const bookmarkCards = ({ bookmarks }) => {
	return (
		<div className='flex flex-wrap m-3 justify-start  w-full'>
			{/* { !bookmarks && bookmarks.map((bookmark) => {
				return (
					<div className='flex rounded-md flex-col items-center justify-center border w-1/4 h-60 p-1 m-2 '>
						<h1>{bookmark?.content}</h1>
					</div>
				)
			})} */}
			<div className='flex flex-col rounded-md border w-96 h-40 p-1 m-2 '>
				<div className='w-full flex items-center'>
					<img src="https://pbs.twimg.com/profile_images/1541300431623598080/QNrH1wh1_400x400.jpg" className='w-10 h-10 rounded-full m-1 p-1' />
					<span className='mx-1'>Nawed Ali</span>
					<span className='mx-1 font-thin text-xs'>@nawed2611 • 27 June 2022</span>
					<div className='flex items-center p-2 justify-end'>
					<BsTwitter className='mx-3' />
					</div>
				</div>
				<p className='m-1 p-1'>
					lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
				<div className='flex items-center opacity-50 p-2 justify-end'>
					<BiArchiveIn className='mx-3 w-5 h-5' />
					<BiTrashAlt className='mx-3 w-5 h-5' />
					<BiDotsVerticalRounded className='mx-3 w-5 h-5' />
				</div>
			</div>
			<div className='flex flex-col rounded-md border w-96 h-40 p-1 m-2 '>
				<div className='w-full flex items-center'>
					<img src="https://pbs.twimg.com/profile_images/1541300431623598080/QNrH1wh1_400x400.jpg" className='w-10 h-10 rounded-full m-1 p-1' />
					<span className='mx-1'>Nawed Ali</span>
					<span className='mx-1 font-thin text-xs'>@nawed2611 • 27 June 2022</span>
					<div className='flex items-center p-2 justify-end'>
					<BsTwitter className='mx-3' />
					</div>
				</div>
				<p className='m-1 p-1'>
					lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
				<div className='flex items-center opacity-50 p-2 justify-end'>
					<BiArchiveIn className='mx-3 w-5 h-5' />
					<BiTrashAlt className='mx-3 w-5 h-5' />
					<BiDotsVerticalRounded className='mx-3 w-5 h-5' />
				</div>
			</div>
			<div className='flex flex-col rounded-md border w-96 h-40 p-1 m-2 '>
				<div className='w-full flex items-center'>
					<img src="https://pbs.twimg.com/profile_images/1541300431623598080/QNrH1wh1_400x400.jpg" className='w-10 h-10 rounded-full m-1 p-1' />
					<span className='mx-1'>Nawed Ali</span>
					<span className='mx-1 font-thin text-xs'>@nawed2611 • 27 June 2022</span>
					<div className='flex items-center p-2 justify-end'>
					<BsTwitter className='mx-3' />
					</div>
				</div>
				<p className='m-1 p-1'>
					lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
				<div className='flex items-center opacity-50 p-2 justify-end'>
					<BiArchiveIn className='mx-3 w-5 h-5' />
					<BiTrashAlt className='mx-3 w-5 h-5' />
					<BiDotsVerticalRounded className='mx-3 w-5 h-5' />
				</div>
			</div>
			<div className='flex flex-col rounded-md border w-96 h-40 p-1 m-2 '>
				<div className='w-full flex items-center'>
					<img src="https://pbs.twimg.com/profile_images/1541300431623598080/QNrH1wh1_400x400.jpg" className='w-10 h-10 rounded-full m-1 p-1' />
					<span className='mx-1'>Nawed Ali</span>
					<span className='mx-1 font-thin text-xs'>@nawed2611 • 27 June 2022</span>
					<div className='flex items-center p-2 justify-end'>
					<BsTwitter className='mx-3' />
					</div>
				</div>
				<p className='m-1 p-1'>
					lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
				<div className='flex items-center opacity-50 p-2 justify-end'>
					<BiArchiveIn className='mx-3 w-5 h-5' />
					<BiTrashAlt className='mx-3 w-5 h-5' />
					<BiDotsVerticalRounded className='mx-3 w-5 h-5' />
				</div>
			</div>
		</div>
	)
}

export default bookmarkCards
