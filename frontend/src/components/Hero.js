const Hero = () => {
    return (
        <div className="md:ml-10 ml-6 my-12 h-5/6">
            <div className="md:mx-12 my-4 flex flex-col lg:flex-row align-middle">
                <div className="flex-1 my-12">
                    <h2 className="text-dark-blue font-extrabold text-4xl tracking-wide my-4">
                        Unread Bookmarks
                        <br />
                        Finally Tamed
                    </h2>
                    <p className="text-light-blue-text md:w-5/6 font-semibold text-lg">
                        TweepsBook’s one-of-a-kind solution aims at helping you
                        read your previous bookmarks before adding new ones
                        whilst keeping them perfectly organized,{' '}
                        <b>easy to use & search beneath.</b>
                    </p>
                    <div className="my-12 py-6">
                        <button className="border-2 border-lg-orange rounded-xl py-3 px-4 text-lg-orange font-bold text-lg hover:bg-lg-orange hover:text-white">
                            Product Hunt
                        </button>
                        <button className="border-2 border-dark-blue bg-dark-blue text-white py-3 px-4 rounded-xl mx-6 ">
                            Let’s Get Started
                        </button>
                    </div>
                </div>
                <div className="flex-1 md:mr-10 mr-6">
                    <div className="rounded-xl bg-light-blue w-4/5 ml-auto h-full p-8">
                        <ul className="list-disc mx-8 my-12 text-sh-gray text-2xl font-semibold">
                            <li>Copywriting</li>
                            <li>Marketing</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
