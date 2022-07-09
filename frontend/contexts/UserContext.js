import axios from 'axios'
import { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
	const [user, setUser] = useState()
	const getUser = async () => {
		const res = await axios.get(
			process.env.NEXT_PUBLIC_FETCH_ACCOUNT_DETAILS,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
				},
			}
		)
		console.log(res.data)
		setUser(res.data)
	}
	const updateUser = async (user) => {
		const res = await axios.patch(
			process.env.NEXT_PUBLIC_UPDATE_ACCOUNT_DETAILS,
			user,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
				},
			}
		)
		console.log(res.data)
		getUser()
	}
	const deleteUser = async () => {
		const res = await axios.delete(process.env.NEXT_PUBLIC_DELETE_ACCOUNT, {
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
			},
			data: {
				confirmation: true,
			},
		})
		console.log(res.data)
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
