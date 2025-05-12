# Investments App

This project is a modern React-based platform designed to display and manage client investment and pension products. It emphasizes component isolation, component embedding into third party (legacy) pages, Shadow DOM, iframe rendering, and CSS tokenization.

---

## 🔍 Project Overview

This platform provides:
- A categorized product listing (e.g., pension vs. investment)
- Product detail views accessible via IBAN
- Responsive and themed styling via design tokens
- Embeddable widgets that can run in an iframe for convenient integration into third-party sites
- A proxy API to handle authentication and token management for legacy applications
- Login and authentication flows for secure access to the platform

---

## 🧩 Architectural Decisions

### 1. Shadow DOM

**Why:**  
To isolate styles and avoid global CSS leakage or collisions when embedding components into third-party environments.

**How:**  
- Key UI components (e.g., product widgets) are rendered inside a [Shadow DOM root](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).
- Encapsulation ensures scoped styling without impacting or being impacted by host page styles.

**Benefits:**
- Prevents style conflicts with external pages
- Simplifies cross-app integration
- Ensures predictable rendering of components in unknown environments

---

### 2. Iframe Rendering

**Why:**  
To support fully encapsulated widgets that can be safely embedded in external sites with maximum isolation.

**How:**
- Some product visualizations are rendered inside an `<iframe>` dynamically injected into the host using **createPortal**.
- This enables embedding in external sites, including those with legacy code or CMS systems.

**Benefits:**
- Avoids JavaScript conflicts with host pages
- Enables strict security boundaries
- Allows embedding even in legacy or CMS-controlled environments

**Trade-offs:**
- Slightly more complex architecure
- Potential overhead from iframe sandboxing
- May require additional styling adjustments for iframe content

---

### 3. CSS Generation and Design Tokens

**Why:**  
To ensure scalable, maintainable, and themeable styling across the app.

**How:**
- We use a central `tokens.css` file to define spacing, colors, typography, border-radius, and shadows.
- Regular CSS (with nesting) is used for clarity and compatibility.
- `fonts.css` ensures consistent typography loading across all environments.
- No external CSS-in-JS libraries are used to keep the build lean and standards-based.

**Benefits:**
- Centralized control over look & feel
- Easy to theme or adapt to the third party branding
- Works seamlessly inside both Shadow DOM and light DOM contexts

---

### 4. Proxy API

**Why:**

In order to request pages from the legacy application, we need to use a proxy API that will handle the authentication and token management.

**How:**

- The proxy API is a simple Express server that handles the authentication and token management.
- It captures the token from the incoming client request query, and passes it to the legacy application in a header.
- The legacy application will then use this token to authenticate the request and return the requested page.
- The proxy API is also responsible handling the assets and serving them to the client.

## 🧪 Development

- **React** is used for UI development
- **TanStack Query** handles data fetching with caching and error boundaries
- **React Router** manages route-based product views

---

### 5. Authentication

**Why:**

To ensure secure access to the platform and protect sensitive data.

**How:**

- The authentication flow is handled by the `auth` components, which uses a simple login form to capture the user's credentials.
- The credentials are then sent to the product API, which handles the authentication and returns a token.
- Silent authentication and user authentication are used to refresh the token when it expires, or when the user logs in.
- Protected routes are used to ensure that only authenticated users can access the product pages.

## 📦 Embedding Components

To embed a widget we created a `LegacyEmbed` component that handles the iframe creation and mounting of the React component into the Shadow DOM.
This component takes care of:
- Creating the iframe
- Injecting the React component into the iframe
- Handling the loading of the iframe and React component

```JavaScript
<>
      {/* The embedded legacy page */}
      <LegacyEmbed
        url={`/product/overview/${clientId}?token=${encodeURIComponent(token)}`}
        title="Legacy Product Detail"
        onLoad={(doc) => mountToShadowRoot(doc, 'myreactapp')}
      />
      {/* The React component */}
      {shadowRoot && createPortal(<ProductSection clientId={clientId} />, shadowRoot)}
</>
```

## 📦 Shadow DOM Mounting

To help embedding the shadow container into the third party page, we created a `useShadowMount` hook that handles the mounting of the React component into the Shadow DOM. It takes care of:
- Creating the Shadow DOM
- Injecting the React component into the Shadow DOM
- Handling the loading of the Shadow DOM and React component

The `mountToShadowRoot` function is responsible for mounting the React component into the Shadow DOM.



## Folder Structure Highlights

```bash
src/
├── assets/                      # Static assets (images, fonts, etc.)
│   ├── css/                       
│   │   ├── tokens.css           # Design tokens for spacing, colors, etc.
│   │   └── fonts.css            # Font styles and imports
├── components/                  # Reusable components
│   ├── auth/                    # Authentication components
│   ├── product/                 # Product-related components
├── pages/                       # Page components
│   ├── product-verview.tsw      # Product page that embeds the legacy page
│   ├── product-detail.tsw       # Product detail page
├── api/                         # API calls and data fetching
├── hooks/                       # Custom hooks
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start each of the backend services:
    - `node backend/product-api/src/index.js`
    - `node backend/products-ui/src/index.js`
    - `node backend/proxy-ui/src/index.js`
4. Start the React app: `npm run dev`
5. Open your browser and navigate to `http://localhost:5173`