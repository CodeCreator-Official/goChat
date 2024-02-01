import React, { useState } from 'react'
import { auth, firestore } from '../firebase/config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

function Message() {

    const [message, setMessage] = useState("")

    async function SendMessage() {
        try {

            const collectionRef = collection(firestore, 'messages')

            if (!message.trim()) return

            await addDoc(collectionRef, {
                avatarImage: localStorage.getItem('userAvatar'),
                message: message,
                userId: auth?.currentUser?.uid,
                username: localStorage.getItem('userName'),
                time: serverTimestamp()
            })

            setMessage("")

        } catch (error) {
            console.log(error)
        }
    }

    function onEnter(event) {
        if (event.key === 'Enter') {
            SendMessage()
            setMessage("")
            return;
        }
    }

    return (
        <div className='flex w-full h-fit relative py-1 px-2 bg-gray-900 justify-between items-center'>
            <input id='input' autoComplete='off' value={message} type="text" placeholder='Send Message...' className='px-3 py-2 font-medium rounded italic text-xl w-full outline-none text-gray-600' onChange={(e) => setMessage(e.target.value)} onKeyDown={() => onEnter(event)} />

            <button className='font-medium px-2 right-2 absolute active:text-yellow-400 text-green-500 text-3xl' onClick={SendMessage}><i className='bx bx-send'></i></button>
        </div>
    )
}

export default Message