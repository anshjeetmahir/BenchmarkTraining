import { useSearchParams } from "react-router-dom";
import SearchForm from './SearchParam';

const Home = () => {
    const [searchParams] = useSearchParams();

    const param1 = searchParams.get("param1") || "";
    const param2 = searchParams.get("param2") || "";
    const param3 = searchParams.get("param3") || "";

    return (
        <div className="container">
            <h1>Search Parameters</h1>
            <SearchForm />
            <div>
                <h2>Results:</h2>
                {param1 && <p><strong>Parameter 1:</strong> {param1}</p>}
                {param2 && <p><strong>Parameter 2:</strong> {param2}</p>}
                {param3 && <p><strong>Parameter 3:</strong> {param3}</p>}
            </div>
        </div>
    );
};

export default Home;
