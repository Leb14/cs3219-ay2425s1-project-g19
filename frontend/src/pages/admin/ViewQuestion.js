import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../api/QuestionsApi";

const ViewQuestion = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [category, setSelectedCategories] = useState([]);
    const [complexity, setComplexity] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); // Get the question id from the route parameter

    // Function to preload data
    useEffect(() => {
        const preloadQuestion = async () => {
            setLoading(true);
            try {
                const questionData = await getQuestion(id); // Fetch the question data by id
                setTitle(questionData.title); // Set state with the fetched data
                setImage(questionData.image);
                setSelectedCategories(questionData.category);
                setComplexity(questionData.complexity);
                setDescription(questionData.description.split("\n").map((line, index) => (
                    <p key={index}>
                        {line}
                        <br />
                    </p>
                )));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching question:", error);
            }
        };

        preloadQuestion(); // Call the function on component mount
    }, [id]); // `useEffect` depends on `id`, so it runs when `id` changes

    return (
        <>
            <div className="question_title">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
                    <h1 className="h2 h2-styled fs-1">{title}</h1>
                </div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-0.5 ms-3">
                    <div>{category.map(
                        (cat, index) => (
                            <div key={index} className="badge text-bg-light ms-1 me-1 fs-6">{cat}</div>
                        )
                    )}</div>
                </div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 ms-3">
                    {complexity === "Easy" && <div className="badge bg-success text-dark ms-1 me-1 fs-6">Easy</div>}
                    {complexity === "Medium" && <div className="badge bg-warning text-dark ms-1 me-1 fs-6">Medium</div>}
                    {complexity === "Hard" && <div className="badge bg-danger text-dark ms-1 me-1 fs-6">Hard</div>}
                </div>
                <hr style={{ margin: "10px 15px", color: "white" }} />
            </div>

            {image && (
                <div className="question_image pt-2 ms-3 text-white">
                    <img src={image} alt={title} />
                </div>
            )}

            <div className="question_description fs-6 pt-2 ms-3 text-white">
                <h4>{description}</h4>
            </div>
        </>
    );
};

export default ViewQuestion;