import Image from 'next/image'
import Link from 'next/link'
import github from '../images/github_icon.png'
import twitter from '../images/twitter_icon.png'
import tweeps from '../images/TweepsBook.png'
import { AiFillGithub, AiFillTwitterCircle } from 'react-icons/ai'

const Navbar = () => {
	return (
		<header className='border-b-2 border-lg-gray shadow-sm'>
			<div className='md:mx-12 my-2 flex align-middle items-center'>
				<div className='self-center md:ml-10 ml-6'>
					<Image
						src={tweeps}
						alt='Picture of the author'
						width={60}
						height={60}
						layout='fixed'
					/>
				</div>
				<div className='flex font-semibold text-center text-dark-blue text-base flex-auto justify-center'>
					<div className='mx-8 self-center hidden hover:text-light-blue-text font-medium text-[16px] lg:block'>
						<Link href='https://public.tweepsbook.com'>
							Public Pages
						</Link>
					</div>
					{/* <div className='mx-8 self-center font-medium text-[16px] hidden lg:block'>
						<Link href='/'>Wall of Love</Link>
					</div> */}
					{/* <div className='mx-8 self-center font-medium text-[16px] hidden lg:block'>
						<Link href='/'>Usage Guide</Link>
					</div> */}
					<div className='mx-8 hover:text-light-blue-text self-center font-medium text-[16px] hidden lg:block'>
						<Link href='/pages/privacy-policy'>Privacy Policy</Link>
					</div>
					<div className='mx-8 hover:text-light-blue-text self-center font-medium text-[16px] hidden lg:block'>
						<Link href='/pages/terms-of-service'>Terms of Service</Link>
					</div>
				</div>
				<div className='flex md:mr-10 mr-6'>
					<div className='mr-3 '>
						<a
							href='https://twitter.com/tweepsbookcom'
							target='_blank'
						>
							<AiFillTwitterCircle size={32} style={{color:'#1DA1F2'}} />
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
