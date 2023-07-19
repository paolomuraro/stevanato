import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "axios";

const Results = () => {
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [jsonFile, setJsonFile] = useState("");
    const [pdfFile, setPdfFile] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const errorCode = localStorage.getItem("code");
        axios
            .get(`http://localhost:8080/api/search?errorCode=${errorCode}`)
            .then((res) => {
                setCode(res.data.code);
                setDescription(res.data.description);
                setJsonFile(JSON.parse(res.data.jsonFile));
                setPdfFile(res.data.pdfFile);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    alert("Errore non presente nel sistema");
                    navigate("/");
                } else
                    console.error("Error occurred while fetching data:", error);
            });
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timeout);
    };

    const Page = () => {
        return (
            <div className="min-h-full px-6 lg:px-8">
                <div className="sticky top-0 flex flex-col p-3 bg-white md:flex-row md:items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                            Codice errore: {code}
                        </h2>
                        <div className="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className="flex items-center mt-2 text-sm text-gray-600">
                                {description}
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-5 lg:ml-4 lg:mt-0">
                        <Link
                            to={pdfFile}
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 font-semibold text-white bg-indigo-600 rounded-md shadow-sm text-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Vedi PDF
                        </Link>
                    </div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl">
                    <div className="divide-y divide-gray-300">
                        {jsonFile.map((obj) => (
                            <div className="py-5" key={nanoid()}>
                                <h3
                                    className="mb-4 text-lg font-semibold text-center text-gray-900"
                                    key={nanoid()}
                                >
                                    {obj.title}
                                </h3>
                                {obj.tasks.map((task) => (
                                    <ul
                                        className="text-sm font-medium text-gray-600 bg-white"
                                        key={nanoid()}
                                    >
                                        {task.map((instruction) => {
                                            const id = nanoid();
                                            return (
                                                <div
                                                    className="flex items-center w-full border-t border-gray-200"
                                                    key={nanoid()}
                                                >
                                                    <div
                                                        className="flex items-center h-16"
                                                        key={nanoid()}
                                                    >
                                                        <input
                                                            id={id}
                                                            type="checkbox"
                                                            className="w-4 h-4 text-indigo-600 bg-gray-200 border-gray-300 rounded focus:ring-indigo-500"
                                                            key={nanoid()}
                                                        />
                                                        <label
                                                            htmlFor={id}
                                                            className="w-full ml-5 text-sm font-medium text-gray-600"
                                                            key={nanoid()}
                                                        >
                                                            {instruction}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </ul>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const Loading = () => {
        return (
            <div className="flex items-center justify-center h-screen">
                <div role="status" className="flex items-center">
                    <svg
                        aria-hidden="true"
                        className="w-12 h-12 mr-2 text-gray-200 animate-spin fill-indigo-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            </div>
        );
    };

    return (
        <main className="min-h-screen">{loading ? <Loading /> : <Page />}</main>
    );
};

export default Results;
