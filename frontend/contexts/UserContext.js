import axios from 'axios'
import { useRouter } from 'next/router'

import { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
	const [showLoader, setShowLoader] = useState(false)
	const router = useRouter()
	const [user, setUser] = useState()
	const getUser = async () => {
		try {
			//setShowLoader(true)
			const res = await axios.get(
				process.env.NEXT_PUBLIC_HOST + `/account/read`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
					},
				}
			)
			console.log(res.data)
			setUser(res.data)
			//setShowLoader(false)
		} catch (err) {
			//setShowLoader(false)
			window.location.href = '/'
			throw err
		}
	}
	const updateUser = async (user) => {
		try {
			//setShowLoader(true)
			const res = await axios.patch(
				process.env.NEXT_PUBLIC_HOST +
					`/account/update?queryType=accountDetails`,
				user,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
					},
				}
			)
			console.log(res.data)
			getUser()
			//setShowLoader(false)
		} catch (err) {
			//setShowLoader(false)
			throw err
		}
	}
	const deleteUser = async () => {
		try {
			//setShowLoader(true)
			const res = await axios.delete(
				process.env.NEXT_PUBLIC_HOST + `/account/delete`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
					},
					data: {
						confirmation: true,
					},
				}
			)
			console.log(res.data)
			//setShowLoader(false)
			localStorage.removeItem('sessionToken')
			router.push('/')
			// router.push('/')
		} catch (err) {
			//setShowLoader(false)

			throw err
		}
	}
	return (
		<UserContext.Provider
			value={{ user, setUser, getUser, updateUser, deleteUser }}
		>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }
