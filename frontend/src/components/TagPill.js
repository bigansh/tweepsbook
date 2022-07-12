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

	const editTag = (tag) => {
		console.log(tag)
		const tempTags = tags.map((t) => {
			if (tag._id === t._id) {
				t.showEdit = true
			}
			return t
		})
		console.log('first', tempTags)
		setTags(tempTags)
	}
	const handleTagUpdate = ({ e, tag }) => {
		e.preventDefault()
		const data = new FormData(e.target)
		const tagName = data.get('tagName')
		if (tagName === '') {
			alert('Tag name cannot be empty')
			returns
		}

		const tempTags = tags.map((t) => {
			if (tag._id === t._id) {
				console.log('found')
				console.log(t.tag)
				console.log(tagName)
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
			console.log(err)
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
	const deleteTag = (tag) => {
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
							<div className='border-solid border flex items-center border-dark-blue px-2 py-1 rounded-full my-1 text-sm text-[#004965] font-semibold'>
								<span onClick={() => editTag(tag)}>
									#{tag.tag}
								</span>
								<IoIosClose
									className='ml-1 w-5 h-5 cursor-pointer'
									onClick={() => deleteTag(tag)}
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
			<BsPlus onClick={addTag} />
		</div>
	)
}

export default TagPill
