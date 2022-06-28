import React from 'react'

const bookmarkCards = ({ bookmarks }) => {
	return (
		<div className='flex flex-wrap justify-evenly  p-1 m-3 h-full w-full'>
			{bookmarks?.map((bookmark) => {
				return (
					<div className='flex rounded-md flex-col items-center justify-center border w-1/4 h-60 p-1 m-2 '>
						<h1>{bookmark?.content}</h1>
					</div>
				)
			})}
		</div>
	)
}

export default bookmarkCards
