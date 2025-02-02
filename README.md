# 🍽️ Pantry Chef

**Pantry Chef** is a smart recipe generator that suggests recipes based on available ingredients. It features image-based ingredient detection, dietary restriction filtering, and AI-powered recipe retrieval.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Workflow](#-workflow)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

✅ **Image-based Ingredient Detection** – Upload images, and the app detects ingredients using Google Vision API.  
✅ **Manual Ingredient Entry** – Users can manually enter ingredients.  
✅ **Dietary Restrictions** – Supports vegetarian, vegan, and other dietary filters.  
✅ **AI-Powered Recipe Suggestions** – Recipes are fetched from Spoonacular API based on selected ingredients.  
✅ **Detailed Recipe View** – Each recipe includes step-by-step instructions and ingredient lists.  

---

## 🏗️ Tech Stack

| **Technology** | **Usage** |
|---------------|----------|
| ReactJS (Vite) | Frontend framework |
| Tailwind CSS | UI styling |
| Express.js | Backend framework |
| Google Vision API | Image-based object detection |
| Spoonacular API | Recipe retrieval |

---


---

## 🔄 Workflow

1. **User uploads an image** containing ingredients.
2. **Backend sends the image** to **Google Vision API** for object detection.
3. **Google Vision API returns detected objects**; the backend filters and extracts ingredients.
4. **Ingredients are populated** in the ingredient list box, and users can manually modify them.
5. **User selects dietary restrictions** and the number of recipes to generate.
6. **Request is sent to the Spoonacular API** via the backend.
7. **Spoonacular API returns a list of recipes**, displayed in the UI as recipe cards.
8. **Users can click "Show Detailed Recipe"** to view full instructions and ingredients.

---

### 1️⃣ Clone the Repository

sh
git clone https://github.com/your-username/pantry-chef.git
cd pantry-chef


📌 Usage
1) Upload an image or manually enter ingredients.
2) Select dietary restrictions and the number of recipes.
3) Click "Generate Recipe" to fetch recipes.
4) Click "Show Detailed Recipe" to view full instructions.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
