import React, { useState } from 'react'
import { motion, useScroll, useReducedMotion } from 'framer-motion'

const Demo = () => {
    const { scrollYProgress } = useScroll();

    // modal should come in from the bottom as a user scrolls down
    // the modal contains a youtube video in an iframe
    // the modal should disappear as the user scrolls up
    // the modal should disappear when the user clicks on the backdrop

    const [showModal, setShowModal] = useState(true);


    // modal should come in from the bottom as a user scrolls down
    // the modal contains a youtube video in an iframe
    // the modal should disappear as the user scrolls up
    // the modal should disappear when the user clicks on the backdrop
    const [isOpen, setIsOpen] = useState(false);

    const shouldReduceMotion = useReducedMotion();
    /*return !isOpen ? (

    ) : (
        <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId="cYvI8qKOfLc"
            onClose={() => setIsOpen(false)}
        />
    )*/
}

export default Demo
