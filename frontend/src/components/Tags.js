import React, { useContext, useEffect, useState } from 'react'
import { IoIosClose, IoMdArchive } from 'react-icons/io'
import { MdSystemUpdateAlt } from 'react-icons/md'
import Lottie from 'react-lottie-player'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import Loader from './loader.json'

const tags = () => {
	const { fetchTags, activeTag, setActiveTag, bookmarks, deleteTag,stripHashtag,showLoader } =
		useContext(BookmarksContext)
	const [tags, setTags] = useState([])
const [importDisabled, setImportDisabled] = useState(false)
	useEffect(() => {
		importTags()
		// console.log(activeTag)
	}, [bookmarks])
	const removeTag = async (tag) => {
		try {

			await deleteTag(tag._id)
			localStorage.removeItem("activeTag")
			// setActiveTag({ tag: 'all', _id: 'all' })

		} catch (err) {
			console.log(err)
		}
	}
	const importTags = async () => {
		const tempTags = await fetchTags()
		setTags([{ tag: 'all', _id: 'all' }, ...tempTags])
		if (window.location.pathname === '/app/dashboard/archive') {
			setActiveTag({ tag: 'all', _id: 'all' })
			return
		}
		localStorage.getItem('activeTag') ? setActiveTag(JSON.parse(localStorage.getItem('activeTag'))) : setActiveTag({ tag: 'all', _id: 'all' })
	}

	const handleClick = async (tag) => {
		setActiveTag(tag)
		localStorage.setItem('activeTag', JSON.stringify(tag))
		window?.location.pathname !== '/app/dashboard' && (window?.location.href = '/app/dashboard')
	}
	const { importBookmarks } = useContext(BookmarksContext)
	const handleImport = async () => {
		try{setImportDisabled(true)
		await importBookmarks()
		setImportDisabled(false)}
		catch(err){
			setImportDisabled(false)
			console.log(err)
		}
	}
	return (
		
		<div className='flex flex-col justify-between items-start min-h-eigthy overflow-hidden w-full text-white flex-grow '>
			
			<div className='text-xl px-8 py-10'>
				<h1 className='text-xl font-semibold tracking-wider'>TAGS</h1>
			</div>
			<div className='flex text-md justify-between  w-full flex-col items-start flex-grow overflow-hidden'>

				<div className='flex flex-col items-start w-full px-4 overflow-y-scroll overflow-x-hidden'>
					{tags &&
						tags.map((tag) => {
							return (
								<button
									key={tag._id}
									onClick={() => handleClick(tag)}
									className={
										'my-1 pl-4 py-1 min-h-[2rem] rounded-md w-full flex text-ellipsis justify-between overflow-hidden whitespace-nowrap items-center ' +
										(activeTag?._id === tag?._id
											? 'bg-hovertagColor'
											: 'bg-transparent hover:bg-hovertagColor hover:bg-opacity-50')
									}
								>
									<div className=' overflow-hidden w-[80%] text-ellipsis text-left'>
									#{stripHashtag(tag.tag)}
									</div>
									<div>
									{tag?._id === activeTag?._id && tag?._id !== "all" && <IoIosClose
									className='w-5 h-5 ml-0.5 cursor-pointer rounded-full hover:bg-dark-blue opacity-50 hover:bg-opacity-5 hover:opacity-100 transition-all duration-100'
									onClick={() => removeTag(tag)}
									/>}
									</div>
								</button>
							)
						})}
				</div>

				<div className='flex text-md w-full mt-2 flex-col items-center'>
					<button
						className={'flex items-center justify-center py-4 border-t border-[#d8d8d840] hover:bg-gray-900 hover:bg-opacity-10 w-full '+ (importDisabled ? 'cursor-not-allowed' : 'cursor-pointer')}
						onClick={handleImport}
						disabled={importDisabled}
					>
						<MdSystemUpdateAlt className='mr-2 text-xl' />
						Import
					</button>
					<button
						className='flex items-center justify-center py-4 border-t border-[#d8d8d840] hover:bg-gray-900 hover:bg-opacity-10 w-full'
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
