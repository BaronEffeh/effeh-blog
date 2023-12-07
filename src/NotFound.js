import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>Oops! - Page Not Found</h1>
            <h3>Error 404</h3>
            <p>Sorry, that page cannot be found</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default NotFound;