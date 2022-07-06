import React from 'react'
import { GrNotes } from 'react-icons/gr'
import { BiTrashAlt } from 'react-icons/bi'
import { BiArchiveIn } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'

const bookmarkCards = ({ bookmarks, deleteBookmark, archiveBookmark }) => {
	return (
		<div className='flex flex-wrap m-3 justify-start  w-full'>
			{bookmarks?.map((bookmark, index) => {
				return (
					<div
						className='flex flex-col rounded-md border w-96 h-fit p-1 m-2 '
						key={index}
					>
						<div className='w-full flex items-center'>
							<img
								src={bookmark.twitter.author.profile_image_url}
								className='w-10 h-10 rounded-full m-1 p-1'
							/>
							<span className='mx-1'>
								{bookmark.twitter.author.name}
							</span>
							<span className='mx-1 font-thin text-xs'>
								@{bookmark.twitter.author.username} •{' '}
								{bookmark.twitter.created_at}
							</span>
							<div className='flex items-center p-2 justify-end'>
								<BsTwitter className='mx-3' />
							</div>
						</div>
						<p className='m-1 p-1'>{bookmark.twitter.text}</p>
						<div className='flex items-center opacity-50 p-2 justify-end'>
							<BiArchiveIn
								className='mx-3 w-5 h-5'
								onClick={() =>
									archiveBookmark({
										id: bookmark.backend._id,
										currentStatus: bookmark.backend.read,
									})
								}
							/>
							<BiTrashAlt
								className='mx-3 w-5 h-5'
								onClick={() =>
									deleteBookmark(bookmark.backend._id)
								}
								style={{ cursor: 'pointer' }}
							/>
							<GrNotes className='mx-3 w-5 h-5' />
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default bookmarkCards
