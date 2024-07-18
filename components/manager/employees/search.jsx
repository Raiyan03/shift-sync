import { MdSearch } from 'react-icons/md';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
const SearchBar = (props) => {
    console.log(props.employeeData);
    const handleSearch = (event) => {
        // Handle the search input logic here
        const char = event.target.value;
        const data = props.employeeData.employees?.filter((value) => {
            return value.name.toLowerCase().startsWith(char.toLowerCase());
        })
        if (data.length === 0) {
            return 
        }
        props.setData({employees: data});
    };

    return (
        <div className="flex">
            {/* <div className="flex items-center gap-2 bg-white border-2 border-black rounded-lg px-2 shadow-2xl">
                <MdSearch className="text-black" />
                <input 
                    type="text" 
                    placeholder={props.placeholder} 
                    onChange={handleSearch}
                    className="bg-transparent border-none w-36 text-black focus:outline-none"
                />
            </div> */}
            <Link href="/manager/employees/add">
                <button className="bg-primary flex items-center gap-1 text-white rounded-lg p-2 cursor-pointer">
                    <span>Add</span>
                    <MdAdd className=' font-bold ' size={20} /> 
                </button>
            </Link>
        </div>
    );
}

export default SearchBar;