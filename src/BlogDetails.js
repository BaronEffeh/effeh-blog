import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import { useState } from "react";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const handleShowUpdateForm = () => {
        setShowUpdateForm(true);
    }

    const handleUpdate = async (updatedData) => {
        try {
            // Send a PUT request to update the blog on the server
            const response = await fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update the blog');
            }

            // Optionally, you can update the local state if needed
            // setBlog(updatedData);

            // Hide the update form
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating blog:', error);
            // Handle the error as needed (e.g., show an error message to the user)
        }
    }

    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!showUpdateForm && blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>delete</button>
                    <button onClick={handleShowUpdateForm}>Edit</button>
                </article>
            )}
            {showUpdateForm && blog && <UpdateForm blog={blog} onUpdate={handleUpdate} />}
            {/* <UpdateForm blog={blog} /> */}
        </div>
    );
}

export default BlogDetails;