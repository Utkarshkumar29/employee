import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { useParams } from "react-router-dom";
import backgroundImage from "../../assets/photo.avif"
import axios from "axios";
import Loader from "../loader";

const Book=()=>{
    const {id}=useParams()
    console.log(id)
    const [apiData,setApidata]=useState([])
    const [isLoading,setIsLoading]=useState(false)

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                setIsLoading(true)
                const response=await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
                setApidata(response.data)
                console.log(response.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    },[id])


    return(
        <div className="w-full h-full bg-cover flex flex-col items-center z-20" style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <Navbar />

            <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg max-w-screen-md">
                {isLoading ? (
                <Loader/>
                ) : (
                <>
                    <h1 className="text-3xl font-bold mb-4">{apiData.volumeInfo?.title}</h1>
                    <h2 className="text-xl font-semibold mb-2">{apiData.volumeInfo?.subtitle}</h2>
                    <p className="text-gray-700 text-sm mb-4">By {apiData.volumeInfo?.authors && apiData.volumeInfo?.authors.join(", ")}</p>

                    <div className="mb-4">
                        <strong>Publisher:</strong> {apiData.volumeInfo?.publisher}
                    </div>

                    <div className="mb-4">
                        <strong>Published Date:</strong> {apiData.volumeInfo?.publishedDate}
                    </div>

                    <p className="text-gray-800 mb-6">{apiData.volumeInfo?.description}</p>

                    <div className="mb-4">
                        <strong>Categories:</strong>{" "}
                        {apiData.volumeInfo?.categories && apiData.volumeInfo?.categories.join(", ")}
                    </div>

                    <div className="mb-4">
                        <strong>Page Count:</strong> {apiData.volumeInfo?.pageCount}
                    </div>

                    <div className="mb-8">
                        <strong>Dimensions:</strong> {`${apiData.volumeInfo?.dimensions?.height} x ${apiData.volumeInfo?.dimensions?.width}`}
                    </div>

                    <div className="flex items-center space-x-4">
                        <a href={apiData.volumeInfo?.previewLink} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Preview</a>
                        <a href={apiData.volumeInfo?.infoLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Buy on Google Play</a>
                    </div>
                </>
            )}
        </div>
    </div>
    )
}

export default Book