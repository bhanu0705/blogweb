
## Getting Started

This project requires environment variables to function properly. You will find an `example.env` file in the root directory. Follow the steps below to set up your environment.

### Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) installed on your machine
- A MongoDB account with a database set up
- Accounts for Gemini, Pexels, and Cloudinary with the respective API keys

### Setup Instructions

1. **Rename the Example File:**
   - Copy the `example.env` file and rename it to `.env` in the root directory of the project.

   ```bash
   cp example.env .env
2. **Configure Your API Keys:**
   -**MongoDB Configuration**
   MONGODB_URI=your_mongodb_connection_string
   
  -**Cloudinary Configuration**
   CLOUDINARY_URL=your_cloudinary_url
   
  -**Gemini Configuration**
   GEMINI_API_KEY=your_gemini_api_key
   
  -**Pexels Configuration**
   PEXELS_API_KEY=your_pexels_api_key


