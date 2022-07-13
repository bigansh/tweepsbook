import React, { useContext, useEffect, useState } from 'react'
import { IoMdArchive } from 'react-icons/io'
import { MdSystemUpdateAlt } from 'react-icons/md'
import { BookmarksContext } from '../../contexts/BookmarksContext'

const tags = () => {
	const { fetchTags, activeTag, setActiveTag, bookmarks } =
		useContext(BookmarksContext)
	const [tags, setTags] = useState([])

	useEffect(() => {
		importTags()
		console.log(activeTag)
	}, [bookmarks])

	const importTags = async () => {
		const tempTags = await fetchTags()
		setTags([{ tag: 'all', _id: 'all' }, ...tempTags])
		setActiveTag({ tag: 'all', _id: 'all' })
	}

	const handleClick = (tag) => {
		setActiveTag(tag)
	}
	const { importBookmarks } = useContext(BookmarksContext)
	return (
		<div className='flex flex-col justify-between items-start min-h-eigthy overflow-hidden w-full mt-2 text-white flex-grow '>
			<h1 className='text-xl mb-8 font-semibold px-5'>TAGS</h1>
			<div className='flex text-md justify-between overflow-y-auto overflow-x-hidden w-full flex-col items-start flex-grow'>
				<div className='flex flex-col items-start w-full px-5'>
					{tags &&
						tags.map((tag) => {
							return (
								<button
									key={tag._id}
									onClick={() => handleClick(tag)}
									className={
										'my-1 pl-5 py-1 hover:opacity-80 w-full flex justify-start ' +
										(activeTag?._id === tag?._id
											? 'bg-hovertagColor'
											: 'bg-transparent')
									}
								>
									#{tag.tag}
								</button>
							)
						})}
				</div>

				<div className='flex text-md w-full mt-2 flex-col items-center'>
					<button
						className='flex items-center justify-center py-4  border-t border-[#d8d8d840] w-full'
						onClick={importBookmarks}
					>
						<MdSystemUpdateAlt className='mr-2 text-xl' />
						Import
					</button>
					<button
						className='flex items-center justify-center py-4  border-t border-[#d8d8d840] w-full'
						onClick={() =>
							(window.location.href = '/app/dashboard/archive')
						}
					>
						<IoMdArchive className='mr-2 text-xl' />
						Archive
					</button>
				</div>
			</div>
		</div>
	)
}

export default tags
