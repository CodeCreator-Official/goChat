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


    return (
        <div className='w-full transition-all flex flex-col duration-200 h-screen bg-gray-900'>
            <div className='h-full flex items-center w-[100%] mx-auto max-w-[800px] flex-col justify-between'>
                <nav className='bg-slate-900 h-fit px-2 w-full flex items-center justify-between'>
                    <div className='flex px-1 font-mono py-2 items-center gap-3'>
                        <img className='w-10 rounded-full' src={localStorage.getItem('userAvatar')} alt="" />

                        <h1 className='text-yellow-400 leading-6 md:text-lg'>
                            <span className='text-gray-400 block md:inline pr-2 italic'></span>
                            {localStorage.getItem('username')}</h1>
                    </div>

                    <button className='bg-white font-semibold py-2 px-3 text-md active:bg-gray-200 rounded select-none' onClick={SignOut}>Logout</button>
                </nav>

                <ChatBox />
                <Message />
            </div>
        </div>
    )
}

export default Main