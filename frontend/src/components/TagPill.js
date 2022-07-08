import React, { useContext, useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { BookmarksContext } from '../../contexts/BookmarksContext'

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
	return (
		<div className='flex flex-wrap items-center'>
			{tags?.map((tag) => {
				return (
					<div
						className='mx-1'
						key={tag.id}
						onClick={() => editTag(tag)}
					>
						{!tag.showEdit && '#' + tag.tag}
						{tag.showEdit && (
							<form onSubmit={(e) => handleTagUpdate({ e, tag })}>
								<input
									type='text'
									className='border-2'
									name='tagName'
									defaultValue={tag.tag}
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
