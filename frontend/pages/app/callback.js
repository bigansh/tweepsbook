import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'

const callback = () => {
	const router = useRouter()
	const query = router.query
	const { getUser } = useContext(UserContext)
	useEffect(() => {
		const handleLogin = async () => {
			const setSessionToken = () => {
				console.log('setSessionToken')
				query.sessionToken &&
					localStorage.setItem('sessionToken', query.sessionToken)
				console.log('st', localStorage.getItem('sessionToken'))
			}
			await new Promise((resolve) => {
				setSessionToken()
				console.log('done')
				setTimeout(resolve, 500)
			})

			try {
				console.log('try', localStorage.getItem('sessionToken'))
				console.log('getting user')
				await getUser()
				query.sessionToken && router.push('/app/dashboard')
			} catch (err) {
				console.log(err)
				router.push('/')
			}
		}
		handleLogin()
	}, [query])

	return <div>Redirecting...</div>
}

export default callback
