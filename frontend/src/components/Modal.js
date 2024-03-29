const Modal = ({ children }) => {
	return (
		<div className='md:w-full md:h-full bg-opacity-20 bg-dark-blue absolute top-0 left-0 p-16 z-50'>
			<div className='w-full h-full bg-white top-0 left-0 rounded-lg shadow-lg'>
				{children}
			</div>
		</div>
	)
}

export default Modal
