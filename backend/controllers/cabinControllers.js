import express from 'express';
import cabinModel from '../models/cabinModel.js';
import fs from 'fs';


const addCabin = async (req, res) => {

    try{
        const { id, name, capacity, price, originalPrice, description } = req.body;
        const image = req.file.filename;
    const newCabin = new cabinModel({ id, name, capacity, price, originalPrice, image, description });
    await newCabin.save();
    res.send('Cabin added successfully');
    }catch(error){
        res.status(500).send(error.message);
    }
}

const deleteCabin = async (req, res) => {
    try{
        const { id } = req.params;
        const cabin = await cabinModel.findById(id);
        fs.unlink(`public/${cabin.image}`,()=>{})
        await cabinModel.findByIdAndDelete(id);
        res.send('Cabin deleted successfully');
    }catch(error){
        res.status(500).send(error.message);
    }
}

const fetchCabinsAll = async (req, res) => {
    try{
        const cabins = await cabinModel.find();
        res.send(cabins);
    }catch(error){
        res.status(500).send(error.message);
    }
}

const fetchCabins = async (req, res) => {
    try{
        const { id } = req.params;
        const cabin = await cabinModel.findById(id);
        res.send(cabin);
    }catch(error){
        res.status(500).send(error.message);
    }
}

export { addCabin, deleteCabin, fetchCabinsAll, fetchCabins };
