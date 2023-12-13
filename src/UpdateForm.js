import { useState } from "react";
import { useHistory } from "react-router-dom";

const UpdateForm = ({ blog, onUpdate }) => {
    const [newTitle, setNewTitle] = useState(blog.title);
    const [newBody, setNewBody] = useState(blog.body);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleUpdate = () => {
        setIsPending(true);

        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, body: newBody }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update the blog');
                }
                setIsPending(false);
                history.push("/");
            })
            .catch(error => {
                setIsPending(false);
                console.error('Error updating blog:', error);
            });
    }

    return (
        <div className="update-form">
            <h2>Edit Post</h2>
            <label>New Title:</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <label>New Body:</label>
            <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)}></textarea>
            {!isPending && <button onClick={handleUpdate}>Update</button>}
            {isPending && <button onClick={handleUpdate}>Updating...</button>}
        </div>
    );
}

export default UpdateForm;