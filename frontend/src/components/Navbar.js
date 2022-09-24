import Image from 'next/image'
import Link from 'next/link'
import github from '../images/github_icon.png'
import twitter from '../images/twitter_icon.png'
import tweeps from '../images/TweepsBook.png'
import TweepsBookIcon from './Icon'
import { AiFillGithub, AiFillTwitterCircle } from 'react-icons/ai'

const Navbar = () => {
	return (
		<header className='border-b-2 border-lg-gray shadow-sm'>
			<div className='md:mx-12 my-2 flex align-middle items-center'>
				<div className='flex items-center self-center md:ml-10 ml-2'>
					<Image
						src={tweeps}
						alt='Picture of the author'
						width={60}
						height={60}
						layout='fixed'
					/>
				</div>
				<div className='flex font-semibold text-center text-dark-blue text-base flex-auto justify-center'>
					<div className='w-full text-xs sm:text-base sm:w-fit sm:mx-8 self-center hover:text-light-blue-text font-medium block'>
						<Link href='https://public.tweepsbook.com'>
							Public Pages
						</Link>
					</div>
					<div className='w-full text-xs sm:text-base sm:w-fit sm:mx-8 hover:text-light-blue-text self-center font-medium block'>
						<Link
							href='/?page=privacy-policy'
							as='/pages/privacy-policy'
						>
							Privacy Policy
						</Link>
					</div>
					<div className='w-full text-xs sm:text-base sm:w-fit sm:mx-8 hover:text-light-blue-text self-center font-medium block'>
						<Link
							href='/?page=terms-of-service'
							as='/pages/terms-of-service'
						>
							Terms of Service
						</Link>
					</div>
				</div>
				<div className=' md:mr-10 mr-6 hidden sm:flex'>
					<div className='mr-3 '>
						<a
							href='https://twitter.com/tweepsbookcom'
							target='_blank'
						>
							<AiFillTwitterCircle
								size={32}
								// style={{ color: '#1DA1F2' }}
							/>
						</a>
					</div>
					<div>
						<a
							href='https://github.com/bigansh/tweepsbook'
							target='_blank'
						>
							<AiFillGithub size={32} />
						</a>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
