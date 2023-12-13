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
            {blog && (
                <>
                    <article>
                        <h2>{blog.title}</h2>
                        <p>Written by {blog.author}</p>
                        <div>{blog.body}</div>
                        <button onClick={handleDelete}>delete</button>
                        <button onClick={handleShowUpdateForm}>Edit</button>
                    </article>

                    {showUpdateForm && <UpdateForm blog={blog} />}
                    {/* <UpdateForm blog={blog} /> */}
                </>
            )}
        </div>
    );
}

export default BlogDetails;