import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import axios from "axios";

const Admin = () => {
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [jsonFile, setJsonFile] = useState("");
    const [pdfFile, setPdfFile] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") navigate("/");
    }, []);

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", false);
        navigate("/");
    };

    const handleJsonFile = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            setJsonFile(e.target.result);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/api/upload",
                {
                    code,
                    description,
                    jsonFile,
                    pdfFile,
                }
            );
            console.log(response.data.message);
            alert("Errore inserito nel sistema");
        } catch (error) {
            console.error("Post failed:", error.response.data.message);
        }
    };

    const clearAll = () => {
        setCode("");
        setDescription("");
        setJsonFile("");
        setPdfFile("");
    };

    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-10 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="w-auto h-12 mx-auto" src={logo} alt="logo" />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="pb-12 border-b border-gray-900/10">
                            <p className="mt-1 text-sm leading-6 text-center text-gray-600">
                                Compilare i seguenti campi per aggiungere un
                                errore nel sistema
                            </p>

                            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="code"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Codice errore
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="code"
                                            id="code"
                                            autoComplete="off"
                                            required
                                            value={code}
                                            onChange={(e) =>
                                                setCode(e.target.value)
                                            }
                                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Descrizione errore
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            autoComplete="off"
                                            required
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="instructions"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Istruzioni
                                    </label>
                                    <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                                        <div className="text-center">
                                            <div className="flex mt-4 text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="instructions"
                                                    className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Carica un file</span>
                                                    <input
                                                        id="instructions"
                                                        name="instructions"
                                                        type="file"
                                                        required
                                                        onChange={
                                                            handleJsonFile
                                                        }
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">
                                                    oppure trascina qui
                                                </p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">
                                                JSON fino a 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="pdf"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Link PDF
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="pdf"
                                            id="pdf"
                                            autoComplete="off"
                                            required
                                            value={pdfFile}
                                            onChange={(e) =>
                                                setPdfFile(e.target.value)
                                            }
                                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4 gap-x-6">
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={handleLogout}
                        >
                            Indietro
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={clearAll}
                        >
                            Cancella
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Salva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin;
