import Image from 'next/image'
import Navbar from './Navbar'
import hero1 from '../images/hero_image_1.png'
import { BsArrowRightShort } from 'react-icons/bs'

const Hero = () => {
	return (
		<div>
			<Navbar />
			<div className='md:ml-10 ml-6 my-12 h-5/6'>
				<div className='md:mx-12 my-4 flex flex-col lg:flex-row align-middle'>
					<div className=' my-12 w-2/3'>
						<h2 className='text-dark-blue font-black font-serif text-[48px] tracking-wide my-4'>
							Unr<span className='italic'>ea</span>d Book
							<span className='italic'>ma</span>rks
							<br />
							Fina<span className='italic'>ll</span>y Ta
							<span className='italic'>me</span>d
						</h2>
						<p className='text-light-blue-text md:w-5/6 font-medium text-[16px]'>
							We help you read your bookmarks whilst keeping them
							perfectly organized, easy to manage & search
							beneath.
						</p>
						<div className='my-12 py-6'>
							{/* <button className='border-2 border-lg-orange rounded-xl py-3 px-4 text-lg-orange font-bold text-lg hover:bg-lg-orange hover:text-white'>
							Product Hunt
						</button> */}
							<button className='border-2 text-[16px] border-dark-blue bg-dark-blue text-white py-3 px-5 rounded-xl flex items-center content-center'>
								Let's Get Started
								<BsArrowRightShort size={24} />
							</button>
						</div>
					</div>
					<div className=' md:mr-10 mr-6'>
						<Image src={hero1}></Image>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero
