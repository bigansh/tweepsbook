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
			}
			await new Promise((resolve) => {
				setTimeout(() => {
					setSessionToken()
					console.log('done')
					resolve()
				}, 500)
			})

			try {
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
