# YouTubeClone

A full-featured video streaming platform inspired by YouTube. Users can upload, browse, and watch videos with a clean and responsive UI.


## 🚀 Features

- 📺 **Video Uploading & Playback**: Users can upload and watch videos.
- 🔍 **Search & Explore**: Browse videos across categories.
- 🛒 **User Profiles & History**: View uploaded videos, history, and favorites.
- 🧑‍💻 **Responsive Design**: Works across all devices using a grid-based layout.
- 🔑 **Authentication**: Secure login & user-specific content.
- 🎨 **Dark Mode Support** (Planned)
---
## 🛠️ Tech Stack

- **Frontend**: React, Redux, React Router, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Storage**: Google Drive API for video uploads
- **Authentication**: JWT-based authentication
---
## ⚙️ Project Setup

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/YouTubeClone.git
   cd YouTubeClone
   ```
2. Install dependencies

```
npm install
```
3. Run the development server

```
npm start
```
4. Backend setup
   Navigate to the server folder and install dependencies:

```
cd server
npm install
npm start
```

5. Configure .env for environment variables

```
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
GOOGLE_DRIVE_API_KEY=<Your Google API Key>
```
---
## File Structure
📂 Frontend (React - Vite)
```
/client
├── public/                  # Static assets  
│   ├── index.html           # Main HTML file  
│   ├── favicon.ico          # App icon  
├── src/  
│   ├── assets/              # Images, logos, icons, etc.  
│   ├── components/          # Reusable UI components  
│   │   ├── Sidebar.jsx  
│   │   ├── Navbar.jsx  
│   │   ├── VideoCard.jsx  
│   │   ├── VideoList.jsx  
│   │   ├── UploadForm.jsx  
│   │   ├── CommentSection.jsx  
│   │   ├── LikeButton.jsx  
│   ├── pages/               # Main pages  
│   │   ├── Home.jsx  
│   │   ├── VideoPlayer.jsx  
│   │   ├── Upload.jsx  
│   │   ├── Profile.jsx  
│   │   ├── History.jsx  
│   ├── redux/               # Redux store & slices  
│   │   ├── store.js  
│   │   ├── videoSlice.js  
│   │   ├── authSlice.js  
│   ├── styles/              # CSS files  
│   │   ├── Sidebar.css  
│   │   ├── VideoList.css  
│   ├── utils/               # Helper functions  
│   │   ├── api.js           # API calls helper  
│   │   ├── formatDate.js    # Date formatting helper  
│   ├── App.jsx              # Root component  
│   ├── main.jsx             # React entry point  
│   ├── index.css            # Global styles  
├── package.json  
├── vite.config.js  
├── README.md  
```
📂 Backend (Node.js - Express)
```
├── config/  
│   ├── db.js                # MongoDB connection  
│   ├── googleDrive.js       # Google Drive API setup  
├── controllers/  
│   ├── videoController.js   # Video upload & fetch logic  
│   ├── userController.js    # Authentication & user handling  
│   ├── commentController.js # Comment management  
├── middleware/  
│   ├── authMiddleware.js    # JWT authentication  
│   ├── errorHandler.js      # Error handling middleware  
├── models/  
│   ├── Video.js             # Video schema  
│   ├── User.js              # User schema  
│   ├── Comment.js           # Comment schema  
├── routes/  
│   ├── videoRoutes.js       # Video-related routes  
│   ├── userRoutes.js        # Authentication routes  
│   ├── commentRoutes.js     # Comment-related routes  
├── utils/  
│   ├── generateToken.js     # JWT token generator  
│   ├── uploadToDrive.js     # Google Drive upload helper  
├── .env                     # Environment variables  
├── server.js                # Main Express server file  
├── package.json             # Dependencies  
├── README.md                # Documentation

```
---
## 📌 API Endpoints(Most Important) 

### 🔹 **Authentication**
| Method | Endpoint         | Description       |
|--------|----------------|-------------------|
| POST   | `/api/auth/signup` | User Signup |
| POST   | `/api/auth/login`  | User Login  |

### 🎥 **Videos**
| Method | Endpoint         | Description          |
|--------|----------------|----------------------|
| POST   | `/api/videos/upload` | Upload a new video |
| GET    | `/api/videos`       | Fetch all videos |
| GET    | `/api/videos/:id`   | Fetch a single video |

### 💬 **Comments**
| Method | Endpoint              | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/comments/:videoId` | Add a comment to a video |
| GET    | `/api/comments/:videoId` | Fetch comments for a video |

### 👍 **Likes & Views**
| Method | Endpoint            | Description           |
|--------|-------------------|-----------------------|
| POST   | `/api/videos/:id/like` | Like a video |
| POST   | `/api/videos/:id/view` | Register a view |

### 👤 **User Profile**
| Method | Endpoint           | Description          |
|--------|------------------|----------------------|
| GET    | `/api/users/:id` | Fetch user profile  |

---

## 🚧 Challenges Faced During YouTubeClone Development
Developing Theatrum, a video streaming platform, came with multiple technical and architectural challenges. Here are some key obstacles we tackled:

1️⃣ Video Upload & Storage
📌 Challenge:

Storing large video files efficiently without overwhelming our backend.

Managing upload speed, bandwidth, and storage limitations.

✅ Solution:

Used Google Drive API for video storage instead of direct backend storage.

Implemented chunked uploads to handle large video files seamlessly.

2️⃣ Video Streaming Optimization
📌 Challenge:

Providing smooth video playback without buffering issues.

Generating different video resolutions (480p, 720p, 1080p).

✅ Solution:

Leveraged Google Drive streaming links instead of self-hosting videos.

Plan to use FFmpeg in the future for adaptive bitrate streaming.

3️⃣ Fetching Video Metadata Efficiently
📌 Challenge:

Extracting and storing metadata like duration, resolution, codec, etc.

Preventing redundant API calls for metadata fetching.

✅ Solution:

Stored metadata (title, description, duration, URL, etc.) in MongoDB for quick retrieval.

Used metadata.js endpoint to serve video details instead of repeatedly fetching from Google Drive.
---
4️⃣ Implementing User Authentication
📌 Challenge:

Secure authentication without slowing down user experience.

Managing JWT token expiration and refresh strategy.

✅ Solution:

Used JWT-based authentication with access and refresh tokens.

Implemented auto-refresh mechanism to maintain sessions seamlessly.
---
5️⃣ Video Thumbnails & Preview System
📌 Challenge:

Storing and retrieving thumbnails efficiently.

Keeping load times low while fetching thumbnails.

✅ Solution:

Thumbnails are stored in GitHub repositories, categorized by video ID.

Frontend fetches only the required thumbnail folder instead of all thumbnails at once.
---
6️⃣ Handling High Traffic & Performance Optimization
📌 Challenge:

Ensuring the backend handles multiple video requests efficiently.

Preventing API rate limits when fetching video details.

✅ Solution:

Caching video metadata using Redis (planned) to reduce database calls.

Used lazy loading for video lists to optimize performance.
---
7️⃣ Responsive UI & Grid-Based Layout
📌 Challenge:

Making the video layout dynamic across different screen sizes.

Ensuring a smooth experience on mobile and desktop.

✅ Solution:

Switched from flexbox to CSS Grid for better responsiveness.

Sidebar automatically collapses on smaller screens to enhance UX.
---
## 🎯 Future Goals
🎨 Dark Mode

📹 Live Streaming

🌎 Multi-language Support

🤖 AI-Powered Recommendations

## 🎯 Contributing
We welcome contributions! Please fork the repository and submit a pull request. For major changes, open an issue first.

⭐ Feel free to fork, contribute, or raise issues!
Kshitij Bagal - Developer
