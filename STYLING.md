// GIA-CODE/gia-t-books/STYLING.md

# High-Craft Styling Principles (CSS Modules)

This document codifies the core principles and patterns for writing CSS in the **gia-t-books** project. Adhering to these guidelines is essential for maintaining a consistent, robust, and high-craft user interface.

---

### Core Principles

#### 1. The CSS Modules Contract: Local by Default

Our styling architecture is built on CSS Modules to ensure predictability and prevent style collisions.

-   **The Contract:** Every React component that requires styling must have a co-located `[ComponentName].module.css` file.
-   **Implementation:** Import the styles into your component (`import styles from './Component.module.css'`) and apply them via the `className` prop (`className={styles.myClass}`). This guarantees that all class names are unique and scoped to that component only.

#### 2. The Global vs. Local Boundary

Clarity on what is global versus what is local is critical.

-   **Global (`src/styles/globals.css`):** This file is strictly for styles that MUST apply to the entire document. This includes:
    -   CSS Resets (e.g., `box-sizing: border-box`).
    -   Root-level CSS Custom Properties (variables) like `--primary-font`.
    -   Base styles for raw HTML elements (`body`, `h1`, `p`).
    -   `@font-face` definitions.
-   **Local (`*.module.css`):** Everything else. All component-specific styles, layout logic, and variations belong in a CSS Module.

#### 3. Diagnose, Don't Guess

When debugging a UI issue, follow this simple diagnostic process to find the root cause instead of guessing at solutions:

1.  **Isolate:** Use the browser inspector to find the exact element that is failing.
2.  **Inspect:** Analyze its "Computed" styles. Don't just look at the CSS you wrote; look at what the browser *actually rendered*. A `width: 0px` or unexpected `margin` is the key clue.
3.  **Hypothesize:** Form a hypothesis based on CSS fundamentals. "My hypothesis is the element has no width because it's absolutely positioned without horizontal constraints."
4.  **Test:** Use the browser's style editor to test your hypothesis in real-time (e.g., add `left: 0; right: 0;`). If it works, you've found the solution.

#### 4. Trust, but Verify the Final DOM

React components, UI libraries (Radix), and animation libraries (Framer Motion) can all add wrapper `divs` or change the final DOM structure. Your React code is not the final source of truth—the browser's "Elements" panel is. Always debug the final rendered HTML, not the JSX you assume is being rendered.

---

### Key Architectural Patterns

#### The "Safe Zone" Padding Contract for Focus Rings

To ensure visual consistency and prevent UI bugs, we standardize on a **`2px` outer focus ring** for all interactive components.

-   **Problem:** Parent containers with `overflow: hidden` will clip this outer focus ring, making it invisible and creating an accessibility issue.
-   **Solution (The Contract):** Any container component that must use `overflow: hidden` **must also provide an internal "safe zone" of padding** to accommodate the focus rings of its children. A `2px` padding is standard.

#### The Component Variable Contract
This powerful pattern allows components to communicate layout information to the rest of the application, even when using CSS Modules.

-   **The Contract:** A component can measure its own dimensions (e.g., height) after it renders and set that value as a CSS Custom Property (variable) on its root element.
-   **The Benefit:** Parent components or even sibling components can use this variable to dynamically position themselves relative to the first component. This creates a robust, decoupled layout system.
-   **Example:** A `Header` component could set a `--header-height` variable on its root `div`. The main page layout component could then use `padding-top: var(--header-height)` to ensure content never appears underneath the header.