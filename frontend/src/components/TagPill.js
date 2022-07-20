import React, { useContext, useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import { IoIosClose } from 'react-icons/io'

const TagPill = ({ bookmark }) => {
	const { updateTags } = useContext(BookmarksContext)
	const [tags, setTags] = useState([])

	useEffect(() => {
		const tempTags = bookmark.backend.tags.map((tag) => {
			tag.showEdit = false
			return tag
		})
		setTags(tempTags)
	}, [bookmark])
	useEffect(() => {
		const editTagsList = document.getElementsByName('tagName')
		editTagsList[editTagsList.length - 1]?.focus()
	}, [tags])
	const editTag = (tag) => {
		// console.log(tag)
		const tempTags = tags.map((t) => {
			if (tag._id === t._id) {
				t.showEdit = true
			}
			return t
		})
		// console.log('first', tempTags)
		setTags(tempTags)
	}
	const handleTagUpdate = ({ e, tag }) => {
		e.preventDefault()
		const data = new FormData(e.target)
		let tagName = data.get('tagName')
		tagName = tagName.replace('#', '')
		if (tagName === '') {
			alert('Tag name cannot be empty')
			returns
		}

		const tempTags = tags.map((t) => {
			if (tag._id === t._id) {
				// console.log('found')
				// console.log(t.tag)
				// console.log(tagName)
				t.tag = tagName
				t.showEdit = false
			}
			return t
		})
		setTags(tempTags)
		try {
			updateTags({
				id: bookmark.backend._id,
				tags: tempTags.map((t) => t.tag),
			})
		} catch (err) {
			// console.log(err)
		}
	}
	const addTag = () => {
		const newTag = {
			tag: 'new',
			showEdit: true,
			_id:
				Math.random().toString(36).substring(2, 15) +
				Math.random().toString(36).substring(2, 15),
		}
		const tempTags = [...tags, newTag]
		setTags(tempTags)
	}
	const removeTag = (tag) => {
		const tempTags = tags.filter((t) => t._id !== tag._id)
		setTags(tempTags)
		try {
			updateTags({
				id: bookmark.backend._id,
				tags: tempTags.map((t) => t.tag),
			})
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='flex flex-wrap items-center'>
			{tags?.map((tag) => {
				return (
					<div className='mx-1' key={tag._id}>
						{!tag.showEdit && (
							<div className='border flex items-center border-dark-blue text-sm font-normal px-2 py-1 rounded-full my-1 text-dark-blue'>
								<span onClick={() => editTag(tag)}>
									#{tag.tag}
								</span>
								<IoIosClose
									className='w-5 h-5 ml-0.5 cursor-pointer rounded-full hover:bg-dark-blue opacity-50 hover:bg-opacity-5 hover:opacity-100 transition-all duration-100'
									onClick={() => removeTag(tag)}
								/>
							</div>
						)}
						{tag.showEdit && (
							<form onSubmit={(e) => handleTagUpdate({ e, tag })}>
								<input
									type='text'
									className='border px-4 p-1 rounded-full text-sm '
									name='tagName'
									placeholder={tag.tag}
								/>
							</form>
						)}
					</div>
				)
			})}
			<BsPlus
				onClick={addTag}
				className='bg-lg-gray p-1 w-6 h-6 ml-2 rounded-full hover:cursor-pointer hover:scale-125 transition-all duration-100'
			/>
		</div>
	)
}

export default TagPill
