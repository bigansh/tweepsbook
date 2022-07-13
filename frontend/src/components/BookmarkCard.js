import React, { useContext } from 'react'
import { format } from 'date-fns'
import { BsTwitter } from 'react-icons/bs'
import TagPill from './TagPill'
import { BiArchiveIn, BiTrashAlt } from 'react-icons/bi'
import { MdOutlineStickyNote2 } from 'react-icons/md'
import { BookmarksContext } from '../../contexts/BookmarksContext'

const BookmarkCard = ({ bookmark }) => {
	const createdTime = new Date(bookmark.twitter.created_at)
	const { updateReadStatus, deleteBookmark } = useContext(BookmarksContext)
	return (
		<div
			className='flex border border-light-blue flex-col bg-white rounded-md justify-between p-4 m-2 animate-[scale_.2s]'
			key={bookmark.backend._id}
		>
			<div className='w-full flex items-center justify-between'>
				<div className='flex flex-row gap-x-2 w-5/6 items-center'>
					<img
						src={bookmark.twitter.author.profile_image_url}
						className='w-10 h-10 rounded-full p-1'
					/>
					<span className='font-semibold text-[15px]'>
						{bookmark.twitter.author.name}
						{bookmark.twitter.author.verified ? (
							<svg
								aria-label='Verified Account'
								className='text-blue-500 inline h-4 w-4 ml-0.5'
								viewBox='0 0 24 24'
							>
								<g fill='currentColor'>
									<path d='M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z' />
								</g>
							</svg>
						) : null}
					</span>

					<span className='font-medium text-[15px] text-mid-gray'>
						@{bookmark.twitter.author.username}
					</span>
				</div>
				<div className='flex items-end p-2 justify-end'>
					<BsTwitter className='mx-3 text-[#1DA1F2]' />
				</div>
			</div>
			<div className='my-1 whitespace-pre-wrap'>
				{bookmark.twitter.text
					.replace(/https:\/\/[\n\S]+/g, '')
					.replace('&amp;', '&')}
			</div>
			{bookmark.twitter.media && bookmark.twitter.media.length ? (
				<div
					className={
						bookmark.twitter.media.length === 1
							? 'inline-grid grid-cols-1 gap-x-2 gap-y-2 my-2'
							: 'inline-grid grid-cols-2 gap-x-2 gap-y-2 my-2'
					}
				>
					{bookmark.twitter.media.map((m) => (
						<img
							key={m.media_key}
							alt=''
							src={m.url}
							className='rounded max-h-60'
						/>
					))}
				</div>
			) : null}

			{/* Time and Date */}
			<div className='text-sm text-mid-gray'>
				<time>{format(createdTime, 'hh:mm a · MMM	 d, y')}</time>
			</div>

			<div className='flex py-2 items-center justify-between'>
				<TagPill bookmark={bookmark} />
				<div className='flex gap-x-1 items-start text-dark-gray'>
					<div className='p-1 rounded-full'>
						<BiArchiveIn
							className='w-5 h-5 cursor-pointer hover:scale-110'
							onClick={() =>
								updateReadStatus({
									id: bookmark.backend._id,
									currentStatus: bookmark.backend.read,
								})
							}
						/>
					</div>
					<div className="p-1 rounded-full">
						<BiTrashAlt
							className='w-5 h-5 cursor-pointer hover:scale-110 transition-all duration-100 text-dark-gray'
							onClick={() => deleteBookmark(bookmark.backend._id)}
						/>
					</div>
					<div className="p-1 rounded-full">
						<MdOutlineStickyNote2
							className='w-5 h-5 cursor-pointer hover:scale-110 transition-all duration-100 text-dark-gray'
							onClick={() =>
								(window.location.href =
									'/app/notes/' + bookmark.backend._id)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookmarkCard
