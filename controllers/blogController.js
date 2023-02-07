const Blog = require('../models/blogSchema')
const mongoose = require('mongoose')

// get all blogs
const getBlogs = async (req,res)=>{
    const blogs = await Blog.find({}).sort({createdAt : -1})
    res.status(200).json(blogs)
}


// get a single blog
const getBlog = async (req,res) => {
    
    const {id}  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Blog'})
    }

    const blog =  await Blog.findById(id)
    if(!blog){
        return res.status(404).json({error: 'No Such Blog'})
    }
    res.status(200).json(blog)
}


// create new blog
const  createBlog = async (req,res) => {
    const {title, author, description, image, articleBody, categories} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
        
    if(!author){
        emptyFields.push('author')
    }
        
    if(!description){
        emptyFields.push('description')
    }
        
    if(!image){
        emptyFields.push('image')
    }
        
    if(!articleBody){
        emptyFields.push('articlebody')
    }
        
    if(!categories){
        emptyFields.push('categories')
    }
   

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill all the fields' , emptyFields})
    }

    // add doc to db
    try{
        const blog = await Blog.create({title, author, description, image, articleBody, categories})
        res.status(200).json(blog)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// delete a blog
const deleteBlog = async (req,res) => {
    const {id}  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Blog'})
    }

    const blog = await Blog.findOneAndDelete({_id:id})
    
    if(!blog){
        return res.status(404).json({error: 'No Such Blog'})
    }

    res.status(200).json(blog)

}

// update blog
const updateBlog = async (req,res)=>{
    const {id}  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Blog'})
    }

    const blog = await Blog.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!blog){
        return res.status(404).json({error: 'No Such Blog'})
    }

    res.status(200).json(blog)
} 


module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
}
