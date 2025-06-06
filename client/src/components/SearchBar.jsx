import { SearchOutlined } from "@mui/icons-material"
import React from "react"

const SearchBar = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="max-w-[550px] w-[90%] flex items-center gap-2 px-4 py-3 border rounded-3xl cursor-pointer border-text-secondary/20 ">
            <SearchOutlined />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-none outline-none w-full bg-transparent text-sm md:text-base" placeholder="Search with prompt or name ...."/>
        </div>
    )
}

export default SearchBar