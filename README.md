![Project Status](https://img.shields.io/badge/Status-Completed-green.svg)
![Technologies](https://img.shields.io/badge/Tech-React%2C%20TypeScript%2C%20Tailwind%2C%20Vite-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

# Simple-Header: Fullscreen Menu and Header Component

a simple project created to present the source code and execution logic within the framework of a given test task, focusing on **UI interaction and adaptive design**.

---

## Project Overview

This repository contains the solution for a Frontend Developer test task, which required the development and implementation of a **fixed header** and a **full-screen drop-down navigation menu** based on a provided Figma layout.

The core focus of this project was to achieve **pixel-perfect compliance**, robust **responsiveness**, and highly **polished interactive animations**, specifically addressing the complex behavior of the menu toggle button.

The implementation utilizes **React with TypeScript** for component-based architecture and **Tailwind CSS** for efficient, utility-first styling and managing complex transitions.

---

## Features Implemented & Technical Highlights

This project successfully fulfills the requirements of the test task, with specific attention to the nuances of interactive behavior across devices:

* **Pixel-Perfect & Responsive Layout:**
    * The Header component is **fixed** (`position: fixed`) and adapts correctly across modern screen resolutions (mobile, tablet, desktop) using predefined, custom Tailwind breakpoints.
    * Custom design tokens are defined within `index.css` using the **Tailwind CSS `@theme` block**, which is the required and best practice method for configuring design systems in the latest version of Tailwind (v4.1).

* **Functional Correction of Design Flaw:**
    * The original design lacked a dedicated close button on mobile, which violates core UX principles. The **Close Button (Cross)** was proactively implemented on **all breakpoints** (including mobile) to ensure the menu is functionally closable, if this was an intentional design decision, the code allows for the possibility of changing the behavior of this element to implicit hiding, however, this contradicts paragraph 2.1 of the terms of reference.

* **Advanced Menu Toggle Animation:**
    * The requirement for the burger icon to "transform into a cross" was implemented using a dynamic transition: the **burger button smoothly slides out and fades away** (`translate-x`, `opacity`, `transition-all`) when the menu opens, simultaneously revealing the dedicated cross icon in the `Menu.tsx` component.
    * The close icon's SVG **rotation is triggered immediately** upon opening, providing a dynamic visual welcome to the full-screen menu.

* **Clean Component Architecture:**
    * Logic is cleanly separated into dedicated components (`Header.tsx`, `Menu.tsx`) and managed via global state in `App.tsx`.
    * The entire codebase has been refactored, documented with **minimal JSDoc comments**, and adheres to a high standard of code hygiene.

---

## Technologies Used

The project leverages a modern and efficient frontend stack:

| Technology | Purpose |
| :--- | :--- |
| **React** | Component-based UI structure. |
| **TypeScript** | Static typing for improved code quality and maintainability. |
| **Tailwind CSS (v4.1)** | Utility-first framework for rapid styling and responsive layout. |
| **Vite** | Fast development server and optimized build tool. |
| **Tailwind `@theme` Block** | Used in `index.css` for defining all custom design tokens (spacing, typography, breakpoints). |

---

## Technical Discussion & Adaptability

### 1. The Burger Transformation

The requirement to "transform the icon into a cross" was fulfilled via a smooth **animated interchange** of two distinct elements (burger button sliding out, cross appearing). This approach was chosen over complex CSS/JS morphing of the three `<span>` elements because it is **more robust, maintains better accessibility**, and satisfies the UX goal with maximum stability.

**Adaptability:** *Should a literal CSS-morphing transformation be absolutely required (e.g., non-negotiable from the designer), I am ready to implement this using React state and CSS transforms (`rotate`, `translate`) on the `span` elements.*

### 2. Design Consistency & Tailwind Configuration

The use of the **`@theme` block within `index.css`** was necessary to configure the design tokens (like custom sizes and line-heights) directly into the modern **Tailwind v4.1 engine**. This practice ensures design tokens are managed centrally and applied consistently for the required pixel-perfect accuracy.

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
