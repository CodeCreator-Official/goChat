import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { firestore } from '../firebase/config'

function ChatBox() {

    const [messages, setMessages] = useState([])

    async function getMessages() {
        try {
            const collectionRef = collection(firestore, 'messages');
            const q = query(collectionRef, orderBy('time', 'asc'));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setMessages(data);
                console.log(data);
            });

            return unsubscribe;
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getMessages()
    }, [])

    messages.map((msg) => {
        console.log(msg.avatarImage);
    })

    return (
        <div className='bg-yellow-400 h-full w-full'>
            <div className='h-full overflow-y-hidden py-4 mx-auto'>
                <ul className='flex flex-col gap-4'>
                    {
                        messages.map((message) => {
                            if (message.userId != localStorage.getItem('userId')) {
                                return (<Sender key={message.id} avatarImage={message.avatarImage} message={message.message} />)
                            }
                            return <Receiver key={message.id} avatarImage={message.avatarImage} message={message.message} />
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

function Sender({ message, avatarImage }) {
    return (
        <li className='flex gap-2 items-start'>
            <img className='w-10 h-10 mx-4 rounded-full' src={avatarImage} alt="" />

            <div className='flex gap-2 flex-col'>
                <span className='bg-red-400 w-fit rounded-3xl py-3 px-4 font-medium text-white max-w-[200px]'>{message}</span>
            </div>
        </li>
    )
}

function Receiver({ avatarImage, message }) {
    return (
        <li className='flex flex-row-reverse gap-2 items-start justify-start'>
            <img className='w-10 h-10 mx-4 rounded-full' src={avatarImage} alt="" />

            <div className='flex gap-2 items-end flex-col'>
                <span className='bg-sky-500 w-fit rounded-3xl py-3 px-4 font-medium text-white max-w-[200px]'>{message}</span>
            </div>
        </li>
    )
}

export default ChatBox