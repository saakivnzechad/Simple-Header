![Project Status](https://img.shields.io/badge/Status-Completed-green.svg)
![Technologies](https://img.shields.io/badge/Tech-React%2C%20TypeScript%2C%20Tailwind%2C%20Vite%2C%20Framer%20Motion-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

# Simple-Header: Fullscreen Menu and Header Component
a simple project created to present the source code and execution logic within the framework of a given test task, focusing on **UI interaction, advanced animation, and adaptive design**.

---

## Project Overview

This repository contains the solution for a Frontend Developer test task, which required the development and implementation of a **fixed header** and a **full-screen drop-down navigation menu** based on a provided Figma layout.
The core focus of this project was to achieve **pixel-perfect compliance**, robust **responsiveness**, and highly **polished interactive animations**. This evolved into implementing complex, state-driven animations and ensuring a bug-free experience on difficult platforms (like mobile iOS).
The implementation utilizes **React with TypeScript**, **Tailwind CSS** for styling, and **Framer Motion** for complex state-driven animations.

---

## Features Implemented & Technical Highlights

This project successfully fulfills and expands upon the requirements of the test task, with specific attention to advanced interaction and stability:
* **Pixel-Perfect & Responsive Layout:**
    * The Header component is **fixed** (`position: fixed`) and adapts correctly across all screen resolutions.
    * Custom design tokens are defined within `index.css` using the **Tailwind CSS `@theme` block** for design system consistency.
* **Advanced Morphing Toggle Button:**
    * The toggle button was entirely re-implemented as a standalone component using **`framer-motion`**.
    * It features a true **morph animation** between the burger and cross states and internally manages four distinct interaction states (hover, press, open-hover, open-press) for a fluid and robust user experience.
* **Dynamic Background Animation:**
    * Added a custom React hook (`useFloatingAnimation`) that leverages **`simplex-noise`** to create a smooth, non-repetitive "floating" effect for the background blur elements, bringing the static design to life on desktop.
* **Polished Mobile UX & Critical Bug Fixes:**
    * Proactively identified and resolved critical, platform-specific **mobile rendering and scroll-locking bugs** (especially on iOS) to ensure a stable and visually correct experience.
    * Implemented a smooth **accordion animation** (`AnimatePresence`) for the mobile "Services" submenu.
* **Clean Component Architecture:**
    * Logic is cleanly separated into dedicated components (`Header`, `Menu`, `MenuToggle`) and custom hooks (`useFloatingAnimation`).
    * The entire codebase is documented with **JSDoc comments** and adheres to a high standard of code hygiene.

---

## Technologies Used

The project leverages a modern and efficient frontend stack:
| Technology | Purpose |
| :--- | :--- |
| **React** | Component-based UI structure. |
| **TypeScript** | Static typing for improved code quality and maintainability. |
| **Tailwind CSS (v4.1)** | Utility-first framework for rapid styling and responsive layout. |
| **Vite** | Fast development server and optimized build tool. |
| **Framer Motion** | Powering advanced, state-driven morph animations and UI transitions. |
| **`simplex-noise`** | Generating organic, non-linear procedural motion for background elements. |
| **Tailwind `@theme` Block** | Defining all custom design tokens (spacing, typography, breakpoints). |

---

## Technical Discussion & Adaptability

### 1. The Burger Transformation (framer-motion)
The initial implementation (a simple fade/slide interchange) was completely discarded. The button was rebuilt from the ground up using **`framer-motion`** to achieve a true, complex **CSS/JS morph**. This new component acts as a standalone state machine, handling its own hover and press states independently of the menu's open/closed state.

### 2. Design Consistency & Tailwind Configuration
The use of the **`@theme` block within `index.css`** was necessary to configure the design tokens (like custom sizes and line-heights) directly into the modern **Tailwind v4.1 engine**. This practice ensures design tokens are managed centrally and applied consistently for the required pixel-perfect accuracy.

### 3. Mobile Stability (iOS)
A significant portion of the effort went into solving platform-specific bugs on mobile browsers, particularly Mobile Safari. This included implementing robust **scroll-locking** and fixing **rendering artifacts** related to `position: fixed` and CSS `blur()` filters by adjusting layout logic. The background animation was conditionally disabled on mobile to prioritize stability and performance over effects.

---

## Setup

To set up and run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saakivnzechad/Simple-Header 
    cd simple-header
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the application, usually at `http://localhost:5173`.

---

## Author

**Danil Klimov**

* GitHub: [@saakivnzechad](https://github.com/saakivnzechad)
* Telegram: [@sarthriles](https://t.me/sarthriles)

---

## License

This project is licensed under the **MIT License**. Full license text available in the `LICENSE` file.
