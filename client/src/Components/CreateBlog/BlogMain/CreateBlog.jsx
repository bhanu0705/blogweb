import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateBlog.css";
import JoditEditor from "jodit-react";
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [author, setAuthor] = useState("");
    const [aiTitle, setAiTitle] = useState("");
    const [aiAuthor, setAiAuthor]=useState('');
    const [blogContent, setBlogContent] = useState({});
    const [aiBlogContent, setAiBlogContent]=useState({});
    const [blogImages, setBlogImages] = useState([]);
    const [selectedAiImage, setSelectedAiImage] = useState("");
    const [showSuggestedImages, setShowSuggestedImages] = useState(false);
    const formRef = useRef(null);

    const handleChange = (setter) => (event) => setter(event.target.value);
    const handleContentChange = (newContent) => setContent(newContent);
    const handleAiContentChange = (newContent) => {
        setAiBlogContent((prevContent) => ({ ...prevContent, blog: newContent }));
      };
    
    const handleImageChange = (event) => setImage(event.target.files[0]);

    const handleGenerateAiPost = async () => {
        if (!aiTitle) {
            toast.error("Please enter a title to generate content!");
            return;
        }

        const blogPrompt = `generate a JSON object where key is "blog" and value is a 1000 words single line string about a blog on ${aiTitle} dont create paragraphs just generate a single line string no new lines`;
        await fetchBlogContent(blogPrompt);
        await fetchBlogImages(aiTitle);

        setShowSuggestedImages(true);
    };

    const fetchBlogContent = async (prompt) => {
        try {
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = await response.text();
            setAiBlogContent(JSON.parse(text));
        } catch (error) {
            console.error("Error fetching blog content:", error);
            toast.error("Error fetching blog content.");
        }
    };

    const fetchBlogImages = async (jobDescription) => {
        try {
            const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(jobDescription)}&per_page=5`, {
                headers: { Authorization: PEXELS_API_KEY },
            });
            const imageUrls = response.data.photos.map((photo) => photo.src.original);
            setBlogImages(imageUrls);
        } catch (error) {
            console.error("Error fetching blog images:", error);
            toast.error("Error fetching images from Pexels.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = localStorage.getItem("userEmail");
        const postData = new FormData();
        postData.append("file", image);
        postData.append("title", title);
        postData.append("content", content);
        postData.append("author", author);
        postData.append("email", email);

        toast.loading("Submitting...");
        try {
            await axios.post(`${apiUrl}/posts/`, postData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.dismiss();
            toast.success("Submitted successfully!");
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to submit!");
            console.error("Error:", error);
        }
    };

    const handleAiPostSubmit = async () => {
        if (!aiTitle || !aiBlogContent.blog || !selectedAiImage) {
            toast.error("Please complete all AI fields before submitting!");
            return;
        }

        const email = localStorage.getItem("userEmail");
        const postData = new FormData();
        postData.append("title", aiTitle);
        postData.append("content", aiBlogContent.blog);
        postData.append("imageUrl", selectedAiImage);
        postData.append("author", aiAuthor || "AI");
        postData.append("email", email);

        toast.loading("Submitting AI-generated blog...");
        try {
            await axios.post(`${apiUrl}/posts/`, postData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.dismiss();
            toast.success("AI blog submitted successfully!");
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to submit AI blog!");
            console.error("Error:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Column: Manual Blog Creation */}
                <div className="col-lg-6">
                    <div className="mt-5 p-4 bg-light rounded shadow">
                        <h5>Create Your Blog</h5>
                        <form onSubmit={handleSubmit} ref={formRef} encType="multipart/form-data">
                            <div className="form-group mb-3">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the Title"
                                    value={title}
                                    onChange={handleChange(setTitle)}
                                    style={{ height: "40px", fontSize: "18px" }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Author Name"
                                    value={author}
                                    onChange={handleChange(setAuthor)}
                                    style={{ height: "40px", fontSize: "18px" }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="content">Content</label>
                                <JoditEditor
                                    value={content}
                                    tabIndex={1}
                                    onBlur={handleContentChange}
                                    config={{ height: 600, uploader: { insertImageAsBase64URI: true } }}
                                    className="large-editor"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="image">Upload Image</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    onChange={handleImageChange}
                                    style={{ height: "40px", fontSize: "18px" }}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Publish
                            </button>
                        </form>
                    </div>
                </div>
                {/* Right Column: AI-Generated Blog */}
                <div className="col-lg-6">
                    <div className="mt-5 p-4 bg-light rounded shadow">
                        <h5>AI-Generated Blog</h5>
                        <div className="form-group mb-3">
                            <label htmlFor="ai-title">AI Title</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={handleChange(setAiTitle)}
                                value={aiTitle}
                                placeholder="Enter AI title"
                            />
                        </div>
                        <button onClick={handleGenerateAiPost} className="btn btn-primary mb-3">
                            Generate Content
                        </button> <br></br>
                        {showSuggestedImages && (
                        <div>
                            <h6>Suggested Images</h6>
                            <div className="image-gallery">
                                {blogImages.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt="Generated Image"
                                        className={`img-thumbnail ${selectedAiImage === imageUrl ? "border-primary" : ""}`}
                                        style={{ width: "100px", height: "auto", margin: "5px", cursor: "pointer" }}
                                        onClick={() => setSelectedAiImage(imageUrl)}
                                    />
                                ))}
                            </div>
                        </div>
                        )}
                        <button onClick={handleAiPostSubmit} className="btn btn-primary">
                            Submit AI Blog
                        </button> 
                        {aiBlogContent.blog && (
                            <div>
                                <h6>Generated Content</h6>
                                {/* <div dangerouslySetInnerHTML={{ __html: blogContent.blog }} /> */}
                                {/* <textarea
                                className="form-control"
                                id="ai-content"
                                value={blogContent.blog}
                                readOnly={false}
                                style={{ height: "700px", fontSize: "18px" }}
                            /> */}
                            <JoditEditor
                                    value={aiBlogContent.blog}
                                    tabIndex={1}
                                    onBlur={handleAiContentChange}
                                    config={{ height: 600, uploader: { insertImageAsBase64URI: true } }}
                                    className="large-editor"
                                />
                            
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default CreateBlog;
