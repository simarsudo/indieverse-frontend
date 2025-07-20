# Image Segmentation App

A modern web app for generating colorful segmentation masks on images using a FastAPI backend and a React (Vite) frontend.

- **Deployed App:** [https://indieverse-frontend-tmxh.vercel.app/](https://indieverse-frontend-tmxh.vercel.app/)

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
npm install
npm run dev
```

**Sample `.env`:**

```
VITE_API_BASE_URL=http://localhost:8080
```


## Notes

- Do **not** commit your `.env` files. They are gitignored.
