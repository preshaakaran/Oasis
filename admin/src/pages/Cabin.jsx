import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import '../App.css'

const Cabin = ({url}) => {
    const initialFormData = [
        {
            id: '',
            name: '',
            capacity: '',
            price: '',
            originalPrice: '',
            image: null,
            description: ''
        },
    ]

    const [cabins, setCabins] = useState(initialFormData);

    const handleCabinChange = (index, event) => {
        const { name, value } = event.target;
        const newCabins = [...cabins];
        newCabins[index][name] = value;
        setCabins(newCabins);
    };

    const handleImageChange = (index, event) => {
        const newCabins = [...cabins];
        newCabins[index].image = event.target.files[0];
        setCabins(newCabins);
    };

    const addCabin = () => {
        setCabins([...cabins, { id: '', name: '', capacity: '', price: '', image: null, description: '' }]);
    };

    const removeCabin = (index) => {
        const newCabins = cabins.filter((_, i) => i !== index);
        setCabins(newCabins);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const cabin of cabins) {
            const formData = new FormData();

            formData.append('id', cabin.id);
            formData.append('name', cabin.name);
            formData.append('capacity', cabin.capacity);
            formData.append('price', cabin.price);
            formData.append('originalPrice', cabin.originalPrice);
            formData.append('description', cabin.description);
            formData.append('image', cabin.image);

            try {
                const response = await axios.post(`${url}/api/cabins/add`, formData);
                console.log(response);
                if (response.data) {
                    toast.success(response.data);
                    console.log(response.data.message);
                    setCabins(initialFormData);
                    
                } 
            } catch (error) {
                console.log(error);
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className='flex text-white h-screen w-screen' style={{ backgroundColor: '#141c24' }}>
            <Sidebar />
            <div className='w-[75vw] p-5 overflow-y-auto scrollbar-hidden'>
                <div className="cabin-upload-container">
                    <h2 className="text-2xl mb-4 font-bold">Upload Cabins</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {cabins.map((cabin, index) => (
                            <div key={index} className="cabin-form bg-gray-800 p-4 rounded-lg shadow-md">
                                <h3 className="text-xl">Cabin {index + 1}</h3>
                                <label htmlFor="id" className="block mt-2">ID:</label>
                                <input
                                    type="number"
                                    name="id"
                                    value={cabin.id}
                                    placeholder="ID"
                                    onChange={(event) => handleCabinChange(index, event)}
                                    required
                                    className="input-field w-[65vw] rounded p-2 text-black"
                                />
                                <label htmlFor="name" className="block mt-2">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={cabin.name}
                                    placeholder="Cabin Name"
                                    onChange={(event) => handleCabinChange(index, event)}
                                    required
                                    className="input-field w-[65vw] rounded p-2 text-black"
                                />
                                <label htmlFor="capacity" className="block mt-2">Capacity:</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={cabin.capacity}
                                    placeholder="Capacity"
                                    onChange={(event) => handleCabinChange(index, event)}
                                    required
                                    className="input-field w-[65vw] rounded p-2 text-black"
                                />
                                <label htmlFor="price" className="block mt-2">Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={cabin.price}
                                    placeholder="Price"
                                    onChange={(event) => handleCabinChange(index, event)}
                                    required
                                    className="input-field w-[65vw] rounded p-2 text-black"
                                />
                                <label htmlFor="originalPrice" className="block mt-2">Original Price:</label>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    value={cabin.originalPrice}
                                    placeholder="Original Price"
                                    onChange={(event) => handleCabinChange(index, event)}
                                    required
                                    className="input-field w-[65vw] rounded p-2 text-black"
                                />
                                <label htmlFor="image" className="block mt-2">Image:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => handleImageChange(index, event)}
                                    required
                                    className="input-field w-[65vw] rounded p-2 text-gray-400"
                                />
                                <label htmlFor="description" className="block mt-2">Description:</label>
                                <textarea
                                    name="description"
                                    value={cabin.description}
                                    placeholder="Description"
                                    onChange={(event) => handleCabinChange(index, event)}
                                    required
                                    className="input-field w-[65vw] rounded p-2 text-black"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeCabin(index)}
                                    className="mt-2 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Remove Cabin
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addCabin}
                            className="m-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 "
                        >
                            Add Another Cabin
                        </button>
                        <button
                            type="submit"
                            className="m-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Submit Cabins
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Cabin;
