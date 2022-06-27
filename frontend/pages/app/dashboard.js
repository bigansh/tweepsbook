import Tags from '../../src/components/Tags';
import BookmarkCards from '../../src/components/BookmarkCards';
import SearchBar from '../../src/components/SearchBar';

export default function dashboard() {

    return (
        <div className="min-h-screen overflow-hidden">

            <div className="flex items-center justify-center h-24 border border-black">
                <SearchBar />
            </div>

            <div className='flex'>
                <div className="flex flex-col items-start bg-dark-blue pt-10 w-1/5">
                    <Tags />
                </div>

                <div className='w-5/6'>
                    <BookmarkCards />
                </div>
            </div>
        </div>
    );
}