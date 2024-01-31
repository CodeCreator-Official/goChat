import { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase/config';

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);

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
        getMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='bg-gray-100 w-full h-[80%]'>
            <div className='h-full mx-auto py-2'>
                <ul className='flex h-full flex-col gap-4 overflow-y-auto'>
                    {messages.map((message) => {
                        if (message.userId != localStorage.getItem('userId')) {
                            return <Sender key={message.id} avatarImage={message.avatarImage} username={message.username} message={message.message} />;
                        }
                        return <Receiver key={message.id} avatarImage={message.avatarImage} username={localStorage.getItem('userName')} message={message.message} />;
                    })}
                    <div ref={chatEndRef} />
                </ul>
            </div>
        </div>
    );
}

function Sender({ message, avatarImage, username }) {
    return (
        <li className='flex gap-1 items-start'>
            <img className='w-6 h-6 mr-3 ml-2 rounded-full' src={avatarImage} alt='' />

            <div className='flex gap-y-[2px] py-2 px-3 italic rounded-xl bg-gray-200 border-[2px] justify-end items-start flex-col max-w-[200px]'>
                <span className='font-medium text-sm'>{username}</span>
                <span className='w-fit rounded font-medium text-lg text-gray-400'>
                    {message}
                </span>
            </div>
        </li>
    );
}

function Receiver({ avatarImage, message, username }) {
    return (
        <li className='flex flex-row-reverse gap-2 items-start justify-start'>
            <img className='w-6 h-6 mr-2 ml-3 rounded-full' src={avatarImage} alt='' />

            <div className='flex gap-y-[2px] py-2 px-3 italic rounded-xl border-[2px] justify-end items-end flex-col max-w-[200px]'>
                <span className='font-medium text-sm'>{username}</span>
                <span className='w-fit rounded font-medium text-lg text-gray-400'>
                    {message}
                </span>
            </div>
        </li>
    );
}

export default ChatBox;
