import { useRouter } from 'next/router'
import { useEffect } from 'react'
const callback = () => {
	const router = useRouter()
	const query = router.query
	query.accessToken && localStorage.setItem('accessToken', query.accessToken)

	useEffect(() => {
		router.push('/app/dashboard')
	}, [query])

	return <div>Redirecting...</div>
}

export default callback
