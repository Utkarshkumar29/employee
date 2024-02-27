import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import backgroundImage from '../../assets/photo.avif';
import BookDetails from "../../components/bookdetails";
import Loader from "../../components/loader";
import Navbar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { BookmarkContext } from "../../context/bookmarkContext";
import { Link } from "react-router-dom";

const HomePage=()=>{
    const [apiData,setApidata]=useState([])
    const [searchQuery,setSearchQuery]=useState('science')
    const [currentPage,setCurrentPage]=useState(0)
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)
    const [filter,setFilter]=useState('')
    const [category,setCategory]=useState('')
    const {count}=useContext(BookmarkContext)

    const fetchData=async()=>{
        try {
            setIsLoading(true)
            const response=await axios.get(`https://www.googleapis.com/books/v1/volumes?q=search+${searchQuery?`${searchQuery}`:''}&maxResults=10&startIndex=${currentPage}${filter?`&filter=${filter}`:''}${category ?`&category=${category}`:''}`)
            if(currentPage===0){
                setApidata(response.data.items)
            }else{
                setApidata((prev)=>{
                    return [...prev,...response.data.items]
                })
            }
        } catch (error) {
            console.log(error)
            setError(error)
        }finally{
            setIsLoading(false)
        }
    }

    const handleScroll=()=>{
        if((window.innerHeight+window.scrollY)>=document.body.scrollHeight && !isLoading){
            setCurrentPage((prev)=>prev+1)
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll',handleScroll)  
        return()=>window.removeEventListener('scroll',handleScroll)
    },[isLoading,handleScroll])

    useEffect(()=>{
        fetchData()
        
    },[searchQuery,currentPage,filter,category])

    const categories = ["Fiction","Non-fiction","Mystery","Science Fiction","Fantasy","Romance","History","Biography","Self-Help","Business & Economics","Health & Fitness","Travel","Cooking","Children's Books","Technology","Philosophy","Religion","Art & Photography","Poetry","Science",]

    return(
        <div className="min-h-full h-full w-full z-20" style={{backgroundColor:"#cbcac8"}}>
        <div className="w-full h-full flex flex-col items-center">
            <Navbar className="z-20"/>

            <div className="absolute z-10"><img src={backgroundImage} alt="Error" className="w-full h-full"/></div>
            <h1 className="text-3xl text-white m-4 z-10 text-center font-black">Book Search Interface</h1>
            <p className="text-white mb-4 text-center z-10 font-black">Explore a vast collection of books with advanced search and filtering options. Enter the title of the book, choose from various filters, and discover your next read.</p>
            <div className="m-4 flex flex-col z-10 text-white font-bold">
                <input className="rounded-md p-2 border text-black" type="text" placeholder="Enter the title of the book" onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}/>
                <div className="inline-flex space-x-4 flex-wrap justify-center gap-1">
                    <label><input type="radio" value={"partial"} onChange={(e) => { setFilter(e.target.value); setApidata([]) }} name="filter" className="mr-1" />Partial</label>
                    <label><input type="radio" value={"full"} onChange={(e) => { setFilter(e.target.value); setApidata([]) }} name="filter" className="mr-1" />Full</label>
                    <label><input type="radio" value={"free-ebooks"} onChange={(e) => { setFilter(e.target.value); setApidata([]) }} name="filter" className="mr-1" />Free Ebooks</label>
                    <label><input type="radio" value={"paid-ebooks"} onChange={(e) => { setFilter(e.target.value); setApidata([]) }} name="filter" className="mr-1" />Paid Ebook</label>
                    <label><input type="radio" value={"ebooks"} onChange={(e) => { setFilter(e.target.value); setApidata([]) }} name="filter" className="mr-1" />Ebooks</label>
                </div>
                <div className="mt-4 flex justify-center items-center z-20 ">
                    <label htmlFor="category" className="mr-2 text-sm font-bold">Category:</label>
                    <select className="text-black p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"onChange={(e) => { setCategory(e.target.value); setApidata([]); }}>
                        <option value="" className="text-gray-500">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="w-full h-full flex flex-wrap gap-7 justify-evenly p-3 z-20">
                {apiData && apiData.map((item, index) => (
                        <BookDetails bookDetails={item} key={index}/>
                ))}
            </div>
            {isLoading && <Loader />}
            <div className="fixed bg-blue-600 p-2 rounded-full bottom-2 right-2 text-white flex justify-center items-center text-2xl mx-6 w-20 h-20 z-20">
                <Link to='/saved'>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <div className="absolute bg-red-600 p-1 w-6 h-6 rounded-full top-3 right-4 flex justify-center items-center">
                        {count}
                    </div>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default HomePage