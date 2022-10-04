import React from 'react'

const Demo = () => {
    // hide this modal after 35seconds
    const [showModal, setShowModal] = React.useState(true)
    setTimeout(() => {
        setShowModal(false)
        // document.querySelector('#modal').style.display = 'none'
    }, 35000)


    return showModal && (
        <div className='w-full h-full absolute shadow-lg top-0 left-0 bg-sh-gray bg-opacity-80 z-50 flex items-center justify-center overflow-hidden backdrop-blur-sm' id="modal">
            <div className='w-5/10 h-11/12 bg-white rounded-lg flex flex-col items-center justify-center border-2 border-cyan-500'>
                <iframe className='rounded-md' width="560" height="315" src="https://www.youtube.com/embed/7c2T3PfAEyE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
    )
}

export default Demo
