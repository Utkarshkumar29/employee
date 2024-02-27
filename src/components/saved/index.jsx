import React, { useContext, useEffect } from "react";
import { BookmarkContext } from "../../context/bookmarkContext";
import backgroundImage from "../../assets/photo.avif";
import Navbar from "../navbar";
import SavedDetails from "../savedDetails";

const Saved=()=>{
    const {savedBook}=useContext(BookmarkContext)

    return(
        <div className="w-full h-screen bg-cover flex flex-col items-center z-20" style={{backgroundImage:`url(${backgroundImage})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
            <Navbar/>
            <h1 className="text-3xl font-bold text-black m-4">Book Search Interface</h1>
            <p className="text-black mb-4 text-center">Explore a vast collection of books with advanced search and filtering options. Enter the title of the book, choose from various filters, and discover your next read.</p>
            
            <div className="w-full flex flex-wrap gap-7 justify-evenly p-3">
                {savedBook && savedBook.map((item, index) => (
                        <SavedDetails bookDetails={item} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default Saved