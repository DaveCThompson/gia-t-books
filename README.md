// GIA-CODE/gia-t-books/README.md

# Interactive Storybook: "Slimey" POC

This project is a high-craft proof-of-concept for a mobile-first, interactive children's storybook platform. The initial release features the book **"Slimey,"** written by **Gia**. It is built on a robust foundation of modern web technologies to create a delightful, engaging, and scalable reading experience.

---

## 1. Core Principles

-   **Mobile-First Design:** Layouts, components, and interactions are designed for touch-based devices first, then gracefully enhanced for larger screens.
-   **High-Craft UI:** All interactions are designed to be smooth, intuitive, and visually polished, leveraging performant animations and a consistent design language.
-   **Component-Based Architecture:** The UI is composed of small, reusable, and accessible components built on top of Radix UI primitives.
-   **Simple & Scalable State:** Global state is managed with Zustand, ensuring a minimal, performant, and predictable state layer with built-in persistence.
-   **Building a Scalable Platform:** The architecture is designed from the ground up to support a full library of books, not just a single story.

## 2. Technology Stack

-   **Framework:** Next.js
-   **Language:** TypeScript
-   **Styling:** CSS Modules for component-scoped styles, with a global stylesheet for base styles and fonts.
-   **State Management:** Zustand
-   **Animation:** Framer Motion
-   **UI Primitives:** Radix UI
-   **Page Swiping:** Swiper.js
-   **Audio Management:** Howler.js
-   **Content Parser:** html-react-parser

## 3. Proof-of-Concept Features

-   **Swipe Navigation:** A smooth, horizontal swipe gesture for navigating between pages of the book.
-   **Dual Reading Modes:** A user-selectable choice between an automated "Read to Me" mode with narration and an "I'll Read" mode for self-paced reading.
-   **Interactive Vocabulary:** Tappable words that reveal definitions in a tooltip.
-   **Expressive Typography:** Dynamic use of fonts and styles to make the text an integral part of the storytelling.
-   **Artistic Visuals:**
    -   **Image Masking:** Illustrations are presented within artistic, non-rectangular frames.
    -   **Dynamic Text Flow:** Text intelligently wraps around the contours of transparent images.

## 4. Directory Structure

-   **/src**: Contains all application source code.
-   **/src/books**: Contains self-contained book content modules, each with its own `data.json` and co-located `assets`.
-   **/src/features**: Contains major, user-facing areas of the application, organized into "vertical slices" of functionality (e.g., `/BookReader`, `/Library`).
-   **/src/components**: Contains only **truly generic and reusable** UI primitives that are application-agnostic.
-   **/src/data**: A single, consolidated directory for all non-visual logic, including the Zustand store, custom hooks, type definitions, and application-wide constants.
-   **/src/styles**: Contains the global styling architecture, including `globals.css` for resets and `fonts.css`.

## 5. Styling Architecture

The project uses **CSS Modules** for a robust, component-scoped styling strategy.

-   **Local by Default:** Every component is paired with its own `[ComponentName].module.css` file. All class names are locally scoped by default, preventing style collisions.
-   **Global Styles:** A single `src/styles/globals.css` file is used for CSS resets, font definitions, and root-level CSS Custom Properties (variables). It is the only global stylesheet.
-   **Composition:** Where needed, class names are composed using utility libraries or template literals to apply multiple styles conditionally.

## 6. State Management

The project uses **Zustand** for its minimal and powerful state management model.

-   **Centralized Store:** Global UI state (e.g., the current reading mode) is managed in a central store located in `src/data/settings.ts`.
-   **Persistence:** The store uses Zustand's `persist` middleware to automatically save and rehydrate user settings from `localStorage`, ensuring a consistent experience between sessions.

## 7. Developer Notes

-   **File Naming Convention:** When providing files to the AI agent, TypeScript files (`.ts`, `.tsx`) may be uploaded with a `.txt` extension. The filenames are correct on the local file system.