import Tags from '../../src/components/Tags'
import TweetCard from '../../src/components/TweetCard'
import SearchBar from '../../src/components/SearchBar'

export default function dashboard() {
	return (
		<div className='flex min-h-screen overflow-hidden'>
			<div className='flex flex-col items-start bg-dark-blue pt-10 w-1/5'>
				<Tags />
			</div>

			<div className='flex flex-col min-h-screen w-5/6 sm:w-full'>
				<div className='flex items-center justify-center border h-32'>
					<SearchBar />
				</div>

				<TweetCard />
			</div>
		</div>
	)
}
