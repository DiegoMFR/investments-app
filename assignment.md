
# Front-End Developer Interview Assignment

## 🧩 Context

We’re in the process of migrating our existing server-side rendered application to a modern single-page application (SPA). The goal is to adopt a SPA architecture while preserving and integrating with our existing server-rendered pages with minimal changes.

This assignment is designed to test your ability to build scalable, maintainable frontend applications—ideally using **React**—in a real-world migration context.

---

## 🎯 Assignment Overview

You are tasked with building a small frontend application that displays financial products, using data provided from [a simple API](backend/products-api/) we will provide. Additionally, you will integrate this UI with an [existing static server-rendered page](backend/products-ui/). Please ensure that the integration/transition between the two is smooth, with the same look & feel. 

You may use a framework of your choice, but **React** is preferred. TypeScript is encouraged.

---

## 🧪 Requirements

### UI Features

#### 1. Product Overview Page

- Display two sections:
  - **Pension Products** (e.g., investments/savings marked as pension products)
  - **Non-Pension Investment Products**
- This should be a **single web page** that:
  - Integrates the existing **server-rendered static HTML page** provided.
  - Stitches your SPA components **into or alongside** that page without altering the server-rendered markup.
- Product lists must be retrieved from the provided API.
- Products should be grouped accordingly and presented in a clean, readable UI.

#### 2. Product Detail Page

- When a user clicks on a product, navigate to a **separate product detail page**.
- Load the correct data based on the product selected (retrieving data from the API)

#### 3. OAuth Integration

- Before accessing the server-side webapp/API, your app must retrieve an **OAuth token** from `/oauth2/token`.
- Use this token for subsequent server-side webapp/API requests.

#### 4. Code & Structure

- Organize your code in a way that reflects how you would structure a real-world project.
- You can use a **monorepo** setup if preferred, but this is not required.
- The app must use **multiple reusable components**.
- Proper **state management**, error handling, and loading states should be implemented.

---

## 🔧 Provided Resources

1. **Static HTML Pages**
   - Product list overview page
   
2. **REST API**
   - `GET /products`: Returns a list of investment and savings products
   - `POST /oauth2/token`: Returns an OAuth token (you will need this token to access the products endpoint)

---

## 📦 Submission Guidelines

- Create a new **public Git repository** and push your code there.
- Include a `README.md` with:
  - Setup instructions
  - A short explanation of your architectural choices
  - How the OAuth flow is implemented
  - Anything else you think we should know

---

## 🏁 Bonus Points

- Use of **TypeScript**
- Demonstrated understanding of **accessibility** and **responsive design**
- Clean, scalable **component structure**
- Use of **React Router** (or equivalent) for navigation
- Writing a few **unit or integration tests** with your framework's testing utilities

---

## ⏳ Time Expectation

This assignment is scoped to be completable in **4–6 hours**. Please don't feel the need to over-engineer—it’s better to deliver something clean, functional, and well-structured than to try to go far beyond the scope.

---

## 📝 Final Notes

Let us know if you have any questions or need clarifications. Good luck—and we’re looking forward to seeing what you build!
