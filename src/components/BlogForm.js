import React, {useState} from 'react' 

const BlogForm = ({ blogObject }) => {
    //states
    //blog attributes states 
    const [title, setTitle ] = useState('')
    const [author, setAuthor ] = useState('')
    const [url, setUrl ] = useState('')
    
    const handletitleChange = (event) => 
    {
        setTitle(event.target.value)
    }

    const handleauthorChange = (event) => 
    {
        setAuthor(event.target.value)
    }

    const handleurlChange = (event) => 
    {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        blogObject({
        title: title,
        author: author,
        url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                title:
                <input 
                value={title}
                onChange={handletitleChange}
                />
            
                author:
                <input 
                value={author}
                onChange={handleauthorChange}/>
                url:
                <input 
                value={url}
                onChange={handleurlChange}/>
                <button type="submit">create</button>
            </form>
     </>
    )
}

export default BlogForm