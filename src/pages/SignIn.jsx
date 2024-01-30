import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, googleProvider } from '../firebase/config.js'

function SignIn() {

    const navigate = useNavigate()

    auth.onAuthStateChanged((user) => {

        if (user) {
            localStorage.setItem('userId', user.uid)
            localStorage.setItem('userAvatar', user.photoURL)
            localStorage.setItem('userName', user.displayName)
        }
        else {
            localStorage.removeItem('userId')
            localStorage.removeItem('userAvatar')
            localStorage.removeItem('userName')
        }
    })

    async function SiginInWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate(`/gochat/${localStorage.getItem('userId')}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center text-white bg-slate-800'>
            <button onClick={SiginInWithGoogle} className='bg-sky-600 py-3 px-4 rounded-lg active:bg-sky-700 text-xl'>SignIn With Google</button>
        </div>
    )
}

export default SignIn