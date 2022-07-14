import { useContext, useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { UserContext } from '../../contexts/UserContext'
import twitterIcon from '../../src/images/twitter_icon_blue.png'
const Settings = () => {
	const { user, setUser, getUser, updateUser, deleteUser } =
		useContext(UserContext)
	useEffect(() => {
		getUser()
	}, [])
	console.log('user', user)
	const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] =
		useState(false)
	const enableInput = (id) => {
		document.getElementById(id).disabled = false
		document.getElementById(id).focus()
	}
	const disableInput = (id) => {
		document.getElementById(id).disabled = true
		// document.getElementById(id).focus()
	}

	const [name, setName] = useState(user?.name)
	const [email, setEmail] = useState(user?.email)
	const [unreadCount, setUnreadCount] = useState(user?.unreadCount)

	const saveUserDetails = async () => {
		const newUserDetails = {
			accountDetails: {
				email: email,
				unreadCount: unreadCount,
				name: name,
			},
		}
		await updateUser(newUserDetails)
		window.location.href = '/app/settings'
	}
	return (
		<div className='w-full h-full absolute top-0 left-0 bg-sh-gray bg-opacity-80 z-50 flex items-center justify-center'>
			<div className='bg-[#F5F5F5] rounded flex flex-col py-10 px-10'>
				<div className='grid grid-cols-3 gap-x-8 auto-rows-auto'>
					<div className='bg-white p-4 flex flex-col items-center justify-center rounded-lg'>
						<div className='w-32 h-32 '>
							<img
								src={user?.profile_image}
								alt='User Profile Image'
								className='w-full h-full rounded-full'
							/>
						</div>
						<div className='flex bg-[#FAFAFA] p-3 rounded-md border border-lg-gray mt-5 items-center'>
							<input
								type='text'
								className=' bg-[#FAFAFA] text-sm text-[#666666] p-2'
								placeholder={'Your Name'}
								defaultValue={user?.name}
								disabled={true}
								name='userName'
								id='userName'
								onChange={(e) => {
									setName(e.target.value)
								}}
								onBlur={() => disableInput('userName')}
							/>
							<BiPencil
								className='icon-light-grey cursor-pointer'
								onClick={() => {
									enableInput('userName')
								}}
							/>
						</div>
						<div className='flex bg-[#FAFAFA] p-3 rounded-md border border-lg-gray mt-5 items-center'>
							<input
								type='text'
								className=' bg-[#FAFAFA] text-sm text-[#666666] p-2'
								placeholder={'Your Email'}
								defaultValue={user?.email}
								disabled={true}
								name='userEmail'
								id='userEmail'
								onChange={(e) => {
									setEmail(e.target.value)
								}}
								onBlur={() => disableInput('userEmail')}
							/>
							<BiPencil
								className='icon-light-grey cursor-pointer'
								onClick={() => enableInput('userEmail')}
							/>
						</div>
					</div>
					<div className='flex flex-col justify-between col-span-2'>
						<div className='bg-white p-4 mb-4 flex flex-col items-start justify-center w-full rounded-lg'>
							<p className='text-[16px] font-semibold text-[#666666]'>
								Workspace Settings
							</p>
							<div className='flex bg-[#FAFAFA] p-3 rounded-md border border-lg-gray mt-5 w-1/2 justify-between items-center'>
								<input
									type='text'
									className=' bg-[#FAFAFA] text-sm text-[#666666] p-2'
									placeholder={'Unread Count'}
									defaultValue={user?.unreadCount}
									disabled={true}
									name='unreadCount'
									id='unreadCount'
									onChange={(e) => {
										setUnreadCount(e.target.value)
									}}
									onBlur={() => disableInput('unreadCount')}
								/>
								<BiPencil
									className='icon-light-grey cursor-pointer'
									onClick={() => enableInput('unreadCount')}
								/>
							</div>
						</div>
						<div className='bg-white p-4 mb-4 flex flex-col items-start justify-center w-full rounded-lg'>
							<p className='text-[16px] font-semibold text-[#666666]'>
								Connected Apps
							</p>
							<p className='text-[12px] text-[#666666]'>
								Connect these accounts and unlock special
								Tweepsbook integration
							</p>
							<div className='flex bg-[#FAFAFA] p-3 rounded-md border border-lg-gray mt-5 w-1/2 justify-start items-center'>
								<img src={twitterIcon.src} alt='' />
								Twitter
							</div>
						</div>
						<div className='bg-white p-4 flex  items-center justify-between w-full rounded-lg'>
							<div className='flex flex-col'>
								<p className='text-[16px] font-semibold text-[#666666]'>
									Account Removal
								</p>
								<p className='text-[12px]  text-[#666666]'>
									We dare you to delete your account
								</p>
							</div>
							<button
								className='text-white text-sm py-2 mx-2 px-4 rounded-lg border-[#B00020] border-2 bg-[#B00020] font-semibold'
								onClick={() =>
									setShowDeleteAccountConfirmation(true)
								}
							>
								Delete Account
							</button>
						</div>
					</div>
				</div>
				<div className='flex justify-end mt-5'>
					<button
						className='bg-white text-sm py-2 mx-2 px-4 rounded-lg border-dark-blue border-2 text-dark-blue font-semibold'
						onClick={() =>
							(window.location.href = '/app/dashboard')
						}
					>
						Cancel
					</button>
					<button
						className='text-white text-sm py-2 mx-2 px-4 rounded-lg border-dark-blue border-2 bg-dark-blue font-semibold'
						onClick={saveUserDetails}
					>
						Save Changes
					</button>
				</div>
			</div>
			{showDeleteAccountConfirmation && (
				<div className='w-full h-full absolute top-0 left-0 bg-sh-gray bg-opacity-80 z-50 flex items-center justify-center'>
					<div className='bg-white p-4 flex flex-col items-center justify-center w-120 rounded-lg'>
						<p className='text-[16px] font-semibold text-[#666666] mb-6'>
							Are your sure you want to delete your account?
						</p>
						<div className='flex '>
							<button
								className='text-white text-sm py-2 mx-2 px-4 rounded-lg border-[#03b000] border-2 bg-[#03b000] font-semibold'
								onClick={() =>
									setShowDeleteAccountConfirmation(false)
								}
							>
								Cancel
							</button>
							<button
								className='text-white text-sm py-2 mx-2 px-4 rounded-lg border-[#B00020] border-2 bg-[#B00020] font-semibold'
								onClick={() => deleteUser()}
							>
								Delete Account
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Settings
