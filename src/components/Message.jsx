import React, { useState } from 'react'
import { auth, firestore } from '../firebase/config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

function Message() {

    const [message, setMessage] = useState("")

    async function SendMessage() {
        try {

            const collectionRef = collection(firestore, 'messages')

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
        <div className='sticky bottom-0 flex w-full p-2 bg-gray-900 justify-between items-center'>
            <input id='input' value={message} type="text" placeholder='Send Message...' className='px-3 py-2 text-xl w-full outline-none text-gray-700' onChange={(e) => setMessage(e.target.value)} onKeyDown={() => onEnter(event)} />

            <button className='font-medium px-4 active:text-yellow-400 text-gray-200 text-xl' onClick={SendMessage}>Send</button>
        </div>
    )
}

export default Message