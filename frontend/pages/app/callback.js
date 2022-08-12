import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'

const callback = () => {
	const router = useRouter()
	const query = router.query
	const { getUser } = useContext(UserContext)
	useEffect(() => {
		const handleLogin = async () => {
			query.sessionToken &&
				localStorage.setItem('sessionToken', query.sessionToken)
			try {
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
