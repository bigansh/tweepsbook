import loader from '../images/loader.gif'

const Loader = () => {
	return (
		<div className='w-full h-full absolute top-0 left-0 bg-white bg-opacity-95 flex items-center justify-center'>
			<div className='w-24'>
				<img src={loader.src} alt='loader' />
			</div>
		</div>
	)
}

export default Loader
