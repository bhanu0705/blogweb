import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateBlog.css";
import JoditEditor from "jodit-react";
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY
function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState("")
  const [aiTitle, setAiTitle] = useState("");
  const [generateContent, setGenerateContent] = useState("");
  const [aiContent, setAiContent] = useState(false);
  const [blogContent, setBlogContent] = useState([]);
  const [blogImages, setBlogImages] = useState([]);
  const contentEditorRef = useRef(null);
  const formRef = useRef(null);


  useEffect(() => {
    async function generate() {
      const jobDescription = aiTitle;
      if (jobDescription) {
        const blogPrompt = `generate a JSON object where key is "blog" and value is a 1000 words single line string about a blog on ${jobDescription} dont create paragraphs just generate a single line string no new lines`;
        const modelName = "gemini-1.5-flash";
        const fetchBlogContent = async (prompt) => {
          try {
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            // Get the specified generative model
            const model = genAI.getGenerativeModel({ model: modelName });

            // Generate content based on the prompt
            const result = await model.generateContent(prompt);
            const response = result.response;
            console.log(response);
            const text = await response.text();

            // Send the generated text back to the client
            console.log(JSON.parse(text));

            setBlogContent(JSON.parse(text));
          } catch (error) {
            console.error("Error fetching blog content:", error);
          }
        };
        const fetchBlogImages = async (jobDescription) => {
          try {
            const response = await axios.get(
              `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                jobDescription
              )}&per_page=5`,
              {
                headers: {
                  Authorization: PEXELS_API_KEY,
                },
              }
            );

            if (response.status !== 200) {
              throw new Error("Failed to fetch images from Pexels");
            }

            const data = response.data;
            const imageUrls = data.photos.map((photo) => photo.src.original);
            console.log(imageUrls);
            setBlogImages(imageUrls);
          } catch (error) {
            console.error("Error fetching blog images:", error);
          }
        };
        await fetchBlogContent(blogPrompt);
        await fetchBlogImages(jobDescription);
      }
    }
    generate().catch(console.error);
  }, [aiContent]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0]);
    
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    setContent(content);
    const email = localStorage.getItem('userEmail');
    console.log(contentEditorRef.current.value)
    // Handle form submission logic here
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Image:', image);
    console.log('Author:', author);
    const postData = new FormData();
    postData.append('file', image);
    postData.append('title', title);
    postData.append('content', content);
    postData.append('author', author);
    postData.append('email', email);
    console.log(postData)
    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    // console.log(formData)
    // const postData = {
    //   title,
    //   content,
    //   author,
    // };
    
    toast.loading('Submitting...');
    try {
      const response = await axios.post(`${apiUrl}/posts/`, postData,config);
      toast.dismiss();
      toast.success('Submitted successfully!');
      console.log('New Post:', response.data);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to submit!');
      console.error('Error:', error);
    }
  };


  const handleGenerateAiPost = (e) => {
    // TO DO: implement AI post generation logic here
    setAiTitle(e);
    setAiContent(false);
  };
  console.log(aiContent);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <div className="mt-5 p-4 bg-light rounded shadow">
            <div className="title-bar">
              <h5>Write your blog</h5>
            </div>
            <form onSubmit={handleSubmit} ref={formRef} encType={'multipart/form-data'}>
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter the Title of Blog"
                  value={title}
                  onChange={handleTitleChange}
                  style={{ height: "40px", fontSize: "18px" }}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter the name of Author"
                  value={author}
                  onChange={handleAuthorChange}
                  style={{ height: "40px", fontSize: "18px" }}
                />
              </div>
              <div className="form-group mb-3 contentt">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <JoditEditor
                  ref={contentEditorRef}
                  value={content}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={newContent => {}}
                  // onChange={handleContentChange}
                  config={{
                    height: 600,
                    uploader: {
                      insertImageAsBase64URI: true,
                    },
                    toolbar: [
                      "source",
                      "|",
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "|",
                      "superscript",
                      "subscript",
                      "|",
                      "ul",
                      "ol",
                      "|",
                      "outdent",
                      "indent",
                      "|",
                      "font",
                      "fontsize",
                      "|",
                      "text",
                      "color",
                      "|",
                      "align",
                      "|",
                      "image",
                      "|",
                      "link",
                      "unlink",
                      "|",
                      "undo",
                      "redo",
                    ],
                  }}
                  className="large-editor"
                />
              </div>
               <div className="form-group mb-3 ima">
                <label htmlFor="image" className="form-label">Upload Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  onChange={handleImageChange}
                  style={{ height: '40px', fontSize: '18px' }}
                />
              </div> 
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-5 p-4 bg-light rounded shadow">
            <div className="title-bar">
              <h5>AI Generated Post</h5>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="ai-title" className="form-label">
                AI Title
              </label>
              <input
                type="text"
                className="form-control"
                id="ai-title"
                onChange={() => handleGenerateAiPost(event.target.value)}
                value={aiTitle}
                style={{ height: "40px", fontSize: "18px" }}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setAiContent(true)}
            >
              Generate AI Post
            </button>
            <div className="form-group mb-3">
              <label htmlFor="ai-content" className="form-label">
                AI Content
              </label>
              <textarea
                className="form-control"
                id="ai-content"
                value={blogContent.blog}
                readOnly={true}
                style={{ height: "700px", fontSize: "18px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;