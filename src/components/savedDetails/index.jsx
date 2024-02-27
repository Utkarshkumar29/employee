import { faExternalLinkAlt, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkContext } from "../../context/bookmarkContext";

const SavedDetails=({bookDetails})=>{
    const [clicked,setClicked]=useState(false)
    const {handleSave,handleRemove}=useContext(BookmarkContext)

    if (!bookDetails || !bookDetails.volumeInfo) {
        return <div>Loading...</div>
    }

    if (!bookDetails.volumeInfo.imageLinks) {
        return null
    }

    const handleClick=(bookId)=>{
        handleRemove(bookId)
    }
    const { smallThumbnail }=bookDetails.volumeInfo.imageLinks

    return (
            <div className="max-w-80 w-full h-50 p-4 rounded-lg shadow-md m-2 z-20">
                <div className="w-full h-full flex gap-3 bg-white rounded-lg">
                    <img  src={smallThumbnail}  alt={bookDetails.volumeInfo.title}  className="w-full h-auto"/>
                    <div className="">
                        <p className="text-lg font-semibold mb-2 text-blue-600 text-wrap">{bookDetails.volumeInfo.title}</p>
                        <p className="text-gray-700">
                            {bookDetails.volumeInfo.authors && bookDetails.volumeInfo.authors.join(', ')}
                        </p>
                        <div>
                            <Link to={`/${bookDetails.id}`}><FontAwesomeIcon icon={faExternalLinkAlt}/></Link>
                        </div>
                    </div>
                    <div className="p-2" onClick={()=>{handleClick(bookDetails)}}>
                        <FontAwesomeIcon icon={faTrash} style={{color:clicked? "red":""}}/>
                    </div>
                </div>
            </div>
    )
}

export default SavedDetails
