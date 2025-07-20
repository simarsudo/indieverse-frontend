# Image Segmentation App

A modern web app for generating colorful segmentation masks on images using a FastAPI backend and a React (Vite) frontend.

---

## Features

- Upload an image and generate segmentation masks by clicking on regions.
- Colorful, interactive mask overlays.
- FastAPI backend for mask generation.

---

## Installation & Setup

### 1. Clone the repository

```sh
git clone https://github.com/simarsudo/indieverse-frontend.git
cd indieverse-frontend
```

### 2. Backend Setup (FastAPI)

Follow the instructions in the backend repository:  
[https://github.com/simarsudo/indieverse-backend](https://github.com/simarsudo/indieverse-backend)

### 3. Frontend Setup (React + Vite)

```sh
cd frontend/indie-frontend
cp .env.example .env  # Edit VITE_API_BASE_URL to your backend URL
npm install
npm run dev
```

**Sample `.env.example`:**
```
VITE_API_BASE_URL=http://localhost:8000
```

---

## Usage

1. Start both the backend and frontend servers.
2. Open [http://localhost:5173](http://localhost:5173) in your browser.
3. Upload an image, click on a region, and view the generated segmentation mask.

---

## Notes

- Do **not** commit your `.env` files. They are gitignored.
