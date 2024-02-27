import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
    const [isMobileMenuOpen,setMobileMenuOpen]=useState(false)

    const toggleMobileMenu=()=>{
        setMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className="w-full flex items-center justify-between bg-blue-600 p-4 z-20">
            <Link to="/" className="text-white text-2xl font-bold">Book Library</Link>
            <div className="md:hidden">
                <button className="text-white" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">{isMobileMenuOpen ? <FontAwesomeIcon icon={faClose}/> : <FontAwesomeIcon icon={faBars}/>}</button>
            </div> 

            {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 rounded-md shadow-md z-50">
                <Link to="/browse" className="block text-blue-600 hover:text-blue-800 mb-2" onClick={toggleMobileMenu}>Browse</Link>
                <Link to="/favorites" className="block text-blue-600 hover:text-blue-800 mb-2" onClick={toggleMobileMenu}>Favorites</Link>
                <Link to="/about" className="block text-blue-600 hover:text-blue-800" onClick={toggleMobileMenu}>About</Link>
            </div>
            )}

            <div className="hidden md:flex flex-grow justify-end gap-2 z-50">
                <Link to="/browse" className="text-white hover:text-gray-300">Browse</Link>
                <Link to="/favorites" className="text-white hover:text-gray-300">Favorites</Link>
                <Link to="/about" className="text-white hover:text-gray-300">About</Link>
            </div>
        </div>
    )
}

export default Navbar
