import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'

const callback = () => {
	const router = useRouter()
	const query = router.query
	const { getUser } = useContext(UserContext)
	useEffect(() => {
		const handleLogin = async () => {
			await new Promise((resolve) => {
				setTimeout(() => {
					console.log('resolving')
					query.sessionToken &&
						localStorage.setItem('sessionToken', query.sessionToken)
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
