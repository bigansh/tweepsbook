import React, { useContext, useEffect, useState } from 'react'
import { BiArchiveIn } from 'react-icons/bi'
import { BiImport } from 'react-icons/bi'
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
		<div className='flex flex-col justify-between items-start min-h-eigthy overflow-hidden w-full mt-2 text-white'>
			<h1 className='text-xl mb-10 font-bold pl-5'>TAGS</h1>
			<div className='flex text-md justify-between overflow-y-auto overflow-x-hidden w-full flex-col items-start'>
				<div className='flex mx-8 flex-col items-start w-full'>
					{tags ? (tags.map((tag, index) => {
						return (
							<button
								key={tag._id}
								onClick={() => handleClick(tag)}
								className={
									'm-1 pr-6 px-2 py-1 hover:opacity-80 ' +
									(activeTag?._id === tag?._id
										? 'bg-hovertagColor'
										: '')
								}
							>
								{tag.tag[0]=="#" ? tag.tag : <>#{tag.tag}</>}
							</button>
						)
					})) : <h1 className='text-2xl text-white'>Loading..</h1>}
				</div>

				<div className='flex text-md border-t w-full mt-2 flex-col items-center'>
					<button
						className='flex items-start justify-center px-4 h-8 m-2 border-b w-full'
						onClick={importBookmarks}
					>
						<BiImport className='mr-2' />
						Import
					</button>
					<button
						className='flex items-start px-4 m-2 h-8'
						onClick={() =>
							(window.location.href = '/app/dashboard/archive')
						}
					>
						<BiArchiveIn className='mr-2' />
						Archive
					</button>
				</div>
			</div>
		</div>
	)
}

export default tags
