import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Protected({ children }) {

    const navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {

        if (localStorage.getItem('userId') !== userId) {
            return navigate('/')
        }
    }, [localStorage.getItem('userId')])

    return children
}

export default Protected