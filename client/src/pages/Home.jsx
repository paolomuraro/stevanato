import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Home = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const [errorCode, setErrorCode] = useState("");

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        localStorage.setItem("code", errorCode);
        navigate("/results");
    };

    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-10 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="w-auto h-12 mx-auto" src={logo} alt="logo" />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <form className="space-y-6">
                    <p className="mt-1 text-sm leading-6 text-center text-gray-600">
                        Compilare i seguenti campi per cercare un errore nel
                        sistema.
                    </p>
                    <div>
                        <label
                            htmlFor="code"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Codice Errore
                        </label>
                        <div className="mt-2">
                            <input
                                id="code"
                                name="code"
                                type="number"
                                autoComplete="off"
                                value={errorCode}
                                onChange={(e) => setErrorCode(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSearch}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Cerca
                        </button>
                    </div>
                </form>
            </div>

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-gray-300 border-0" />
                <span className="absolute px-3 text-sm text-gray-600 -translate-x-1/2 bg-white left-1/2">
                    oppure
                </span>
            </div>

            <Link
                to={isLoggedIn === "true" ? "/admin" : "/login"}
                className="sm:mx-auto sm:w-full sm:max-w-sm"
            >
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Accedi come admin
                </button>
            </Link>
        </div>
    );
};

export default Home;
