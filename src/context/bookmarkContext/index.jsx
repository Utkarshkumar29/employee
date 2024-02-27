import { createContext, useState } from "react";

const BookmarkContext=createContext()

const BookmarkContextProvider=({children})=>{
    const [savedBook,setSavedBook]=useState('')
    const [count,setCount]=useState(0)

    const handleSave=(book)=>{
        setSavedBook((prev)=>[...prev,book])
        setCount(count+1)
    }

    const handleRemove = (bookToRemove) => {
        setSavedBook((prev)=>prev.filter((book)=>book.id!==bookToRemove.id))
        setCount((prevCount)=>prevCount-1)
    }

    const contextValue = {
        handleSave,
        handleRemove,
        count,
        setCount,
        savedBook
    }

    return(
        <BookmarkContext.Provider value={contextValue}>
            {children}
        </BookmarkContext.Provider>
    )
}

export { BookmarkContextProvider, BookmarkContext }
