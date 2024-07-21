import React, { useState, useContext } from 'react';
import Axios from 'axios';
import ProblemContext from './problemContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProblemForm = () => {
    const [problemName, setProblemName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [submissions, setSubmissions] = useState(0);
    const [marks, setMarks] = useState(0);
    const [author, setAuthor] = useState('');
    const [constraints, setConstraints] = useState('');
    const [inputFormat, setInputFormat] = useState('');
    const [outputFormat, setOutputFormat] = useState('');
    const [sampleInput, setSampleInput] = useState('');
    const [sampleOutput, setSampleOutput] = useState('');
    const [explanation, setExplanation] = useState('');
    const [hiddenTestCases, setHiddenTestCases] = useState([
        { input: '', expectedOutput: '' }
    ]);

    const { addProblem } = useContext(ProblemContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:8000/api/problem', {
                problemName,
                description,
                difficulty,
                submissions,
                marks,
                author,
                constraints,
                inputFormat,
                outputFormat,
                sampleInput,
                sampleOutput,
                explanation,
                hiddenTestCases
            });
            addProblem(response.data);
            toast.success('Problem Added Successfully!');

            // Optionally, reset form fields after successful submission
            setProblemName('');
            setDescription('');
            setDifficulty('');
            setSubmissions(0);
            setMarks(0);
            setAuthor('');
            setConstraints('');
            setInputFormat('');
            setOutputFormat('');
            setSampleInput('');
            setSampleOutput('');
            setExplanation('');
            setHiddenTestCases([{ input: '', expectedOutput: '' }]);
        } catch (error) {
            console.error('Error adding problem:', error);
            toast.error('Failed to add problem. Please try again.');
        }
    };

    const handleAddTestCase = () => {
        setHiddenTestCases([...hiddenTestCases, { input: '', expectedOutput: '' }]);
    };

    const handleTestCaseChange = (index, field, value) => {
        const updatedTestCases = [...hiddenTestCases];
        updatedTestCases[index][field] = value;
        setHiddenTestCases(updatedTestCases);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Add New Problem</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label htmlFor="problemName" className="block text-sm font-medium text-gray-600">Problem Name</label>
                    <input
                        type="text"
                        id="problemName"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={problemName}
                        onChange={(e) => setProblemName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-600">Difficulty</label>
                    <select
                        id="difficulty"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                    >
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="submissions" className="block text-sm font-medium text-gray-600">Submissions</label>
                    <input
                        type="number"
                        id="submissions"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={submissions}
                        onChange={(e) => setSubmissions(parseInt(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="marks" className="block text-sm font-medium text-gray-600">Marks</label>
                    <input
                        type="number"
                        id="marks"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={marks}
                        onChange={(e) => setMarks(parseInt(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-600">Author</label>
                    <input
                        type="text"
                        id="author"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                    <textarea
                        id="description"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="constraints" className="block text-sm font-medium text-gray-600">Constraints</label>
                    <textarea
                        id="constraints"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={constraints}
                        onChange={(e) => setConstraints(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="inputFormat" className="block text-sm font-medium text-gray-600">Input Format</label>
                    <textarea
                        id="inputFormat"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={inputFormat}
                        onChange={(e) => setInputFormat(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-600">Output Format</label>
                    <textarea
                        id="outputFormat"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="sampleInput" className="block text-sm font-medium text-gray-600">Sample Input</label>
                    <textarea
                        id="sampleInput"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={sampleInput}
                        onChange={(e) => setSampleInput(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="sampleOutput" className="block text-sm font-medium text-gray-600">Sample Output</label>
                    <textarea
                        id="sampleOutput"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={sampleOutput}
                        onChange={(e) => setSampleOutput(e.target.value)}
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="explanation" className="block text-sm font-medium text-gray-600">Explanation</label>
                    <textarea
                        id="explanation"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Hidden Test Cases</h3>
                    {hiddenTestCases.map((testCase, index) => (
                        <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label htmlFor={`input${index}`} className="block text-sm font-medium text-gray-600">Input</label>
                                <textarea
                                    id={`input${index}`}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={testCase.input}
                                    onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor={`expectedOutput${index}`} className="block text-sm font-medium text-gray-600">Expected Output</label>
                                <textarea
                                    id={`expectedOutput${index}`}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={testCase.expectedOutput}
                                    onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddTestCase} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Add Hidden Test Case
                    </button>
                </div>

                <div className="md:col-span-2 text-center">
                    <button type="submit" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Add New Problem
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ProblemForm;
