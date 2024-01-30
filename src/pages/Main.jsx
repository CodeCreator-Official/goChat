import React from 'react'
import { auth } from '../firebase/config.js'
import ChatBox from '../components/ChatBox.jsx'
import Message from '../components/Message.jsx'
import { useNavigate } from 'react-router-dom'

function Main() {

    const navigate = useNavigate()

    async function SignOut() {
        try {
            await auth.signOut()
            navigate('/')

        } catch (error) {
            console.error(error)
        }
    }
    console.log(localStorage.getItem(('userAvatar')))


    return (
        <div className='w-full transition-all duration-200 mx-auto h-screen bg-gray-900'>
            <div className=' relative h-full mx-auto'>
                <nav className='bg-slate-900 sticky top-0 px-2 w-full flex items-center justify-between'>
                    <div className='flex px-1 font-mono py-3 items-center gap-3'>
                        <img className='w-12 rounded-full' src={localStorage.getItem('userAvatar')} alt="" />

                        <h1 className='text-yellow-400 leading-6 text-lg'>
                            <span className='text-gray-400 block md:inline pr-2 italic'>Signed in as </span>
                            {localStorage.getItem('username')}</h1>
                    </div>

                    <button className='bg-red-500 text-white font-semibold py-3 px-2 text-xl font-mono rounded-md active:bg-red-600' onClick={SignOut}>Logout</button>
                </nav>

                <ChatBox />
                <Message />
            </div>
        </div>
    )
}

export default Main