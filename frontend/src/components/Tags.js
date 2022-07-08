import React, { useContext, useEffect, useState } from 'react'
import { BiArchiveIn } from 'react-icons/bi'
import { BiImport } from 'react-icons/bi'
import { BookmarksContext } from '../../contexts/BookmarksContext'

const tags = () => {
	const { fetchTags, activeTag, setActiveTag } = useContext(BookmarksContext)
	const [tags, setTags] = useState([])

	useEffect(() => {
		importTags()
		console.log(activeTag)
	}, [])

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
		<div className='flex flex-col justify-between items-start min-h-eigthy h-full w-full mt-2 text-white'>
			<h1 className='text-xl mb-10 font-bold pl-5'>TAGS</h1>
			<div className='flex text-md justify-between h-full w-full flex-col items-center'>
				<div className='flex flex-col'>
					{tags?.map((tag, index) => {
						return (
							<button
								key={tag._id}
								onClick={() => handleClick(tag)}
								className={
									'm-1 px-8 py-1 ' +
									(activeTag?._id === tag?._id
										? 'bg-hovertagColor'
										: '')
								}
							>
								#{tag.tag}
							</button>
						)
					})}
				</div>

				<div className='flex text-md border-t w-full flex-col items-center'>
					<button
						className='flex items-center px-4 h-8 m-2'
						onClick={importBookmarks}
					>
						<BiImport className='mr-2' />
						Import
					</button>
					<button
						className='flex items-center px-4 m-2 h-8'
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
