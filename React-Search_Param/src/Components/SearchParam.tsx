import { useState } from "react";
import { useSearchParams } from "react-router-dom";



const SearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [form, setForm] = useState({
        param1: searchParams.get("param1") || "",
        param2: searchParams.get("param2") || "",
        param3: searchParams.get("param3") || ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        setSearchParams(form);
        setForm({ param1: "", param2: "", param3: "" });
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
                type="text"
                name="param1"
                placeholder="Enter Parameter 1.."
                value={form.param1}
                onChange={handleChange}
                style={{ height: '3vh', padding: '10px', backgroundColor: 'black', border: 'none', borderRadius: '5px' }}
            />
            <input
                type="number"
                name="param2"
                placeholder="Enter Parameter 2..(Number)"
                value={form.param2}
                onChange={handleChange}
                style={{ height: '3vh', padding: '10px', backgroundColor: 'black', border: 'none', borderRadius: '5px' }}
            />
            <input
                type="text"
                name="param3"
                placeholder="Enter Parameter 3.."
                value={form.param3}
                onChange={handleChange}
                style={{ height: '3vh', padding: '10px', backgroundColor: 'black', border: 'none', borderRadius: '5px' }}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchParam;
