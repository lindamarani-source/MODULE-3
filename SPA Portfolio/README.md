# Aurelia Jewellery

## Project Description
Aurelia Jewellery is a React + Vite single-page application for managing a jewellery storefront. The app includes a Home landing page, a Shop page with live search and location filters, and an Admin Portal for adding new products.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Notes](#notes)

## Installation
1. Clone the repository:

```bash
git clone <your-repository-url>
```

2. Navigate into the project folder:

```bash
cd "SPA Portfolio"
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## Usage
Open the local URL shown in the terminal (usually `http://localhost:5173`) and use the navigation buttons to move between:

- Home page
- Shop page
- Admin Portal

On the Shop page you can search products, filter by location, update price/status inline, and remove products. On the Admin Portal page you can add new jewellery items.

## Project Structure
- `src/App.jsx` — application shell, route state, data handling, and page rendering
- `src/components/Navbar.jsx` — top navigation component
- `src/components/SearchBar.jsx` — search input and results count
- `src/components/ProductCard.jsx` — individual product card with inline editing and deletion
- `src/App.css` — application styles

## Features
- Route-based page content for Home, Shop, and Admin sections
- Product search and location filtering
- Editable product cards with price/status updates
- Add new products through the Admin form
- Product data persisted locally using `localStorage`

## Notes
- Product data is seeded in `src/App.jsx` as mock jewellery inventory.
- No backend service is required for this version; the app is functional with local mock data.

