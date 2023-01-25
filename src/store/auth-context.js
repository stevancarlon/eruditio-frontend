import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { getBooks } from '../services/bookService'

const BooksContext = React.createContext({
    books: [],
})

export const BooksContextProvider = (props) => {
    const [books, setBooks] = useState([])
    const history = useHistory()
    // const pathname = useLocation()
    // const params = useParams()
    // const history = useHistory()
    // const pathname = history.location.pathname

    useEffect(() => {
        getBooks().then(data => setBooks(data))
    }, [history])

    const contextBooks = {
        books: books,
    }

    return (
        <BooksContext.Provider value={contextBooks}>
            {props.children}
        </BooksContext.Provider>
    )
}

export default BooksContext



