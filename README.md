# 🍽 Sobhy Kaber Restaurant Website

![Website Preview](link-to-screenshot-or-gif)  

**Sobhy Kaber Restaurant** is a modern, interactive restaurant website designed to provide an engaging and seamless experience for users. The site supports multiple languages and features interactive maps and a professional flipbook-style menu.

---

## 🌐 Key Features

- **Multi-language Support:** Arabic (AR), English (EN), French (FR), Spanish (SP), Italian (IT), and Chinese (ZH).  
- **Interactive Map:** Display the restaurant's location with navigation support and interactive exploration.  
- **Professional Flipbook Menu:** Browse the menu in a book-style format for a visually appealing experience.  
- **Responsive Design:** Fully compatible across desktops, tablets, and mobile devices.  
- **User-friendly Information:** Easy access to working hours, contact details, app downloads, and special discounts.  
- **SEO Optimized:** Structured data and best practices implemented for better search engine visibility.  

---

## 💻 Technologies Used

- **Frontend:** Next.js 15, React, TypeScript  
- **Styling:** Tailwind CSS, CSS Modules  
- **Interactive Maps:** Leaflet + OpenStreetMap (free alternative to Google Maps/HERE API)  
- **Multi-language Support:** JSON-based translation files with i18n (e.g., next-i18next or react-intl)  
- **Interactive Menu:** React Page Flip / Custom Flipbook Component  
- **Accessibility & RTL Support:** Full support for right-to-left layout for Arabic.  

---

## 📂 Project Structure

```
root
│
├─ public/ # Static assets (images, icons, fonts)
├─ src/
│ ├─ components/ # Reusable React components (Header, Footer, Menu, Map, Slider)
│ ├─ pages/ # Next.js pages
│ ├─ locales/ # JSON translation files for each language (ar, en, fr, sp, it, zh)
│ ├─ styles/ # Global and modular CSS
│ └─ utils/ # Utility functions and helpers
├─ .env.local # Environment variables (API keys, etc.)
└─ package.json # Project dependencies and scripts

```
## 🚀 Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/sobhy-kaber-restaurant.git
cd sobhy-kaber-restaurant 
```

2. **Install dependencies:**
```
npm install
# or
yarn install

```
 
3. **Create .env.local file:**

```
NEXT_PUBLIC_MAPS_API_KEY=YOUR_API_KEY_HERE

```
4. **Run the development server:**

```
npm run dev
# or
yarn dev

```

5. **Open the website:**

### Navigate to http://localhost:3000

## 🗂 Translation & Multi-language Support

Each language has its own JSON file inside src/locales/.

The supported languages are:

- ar.json → Arabic

- en.json → English

- fr.json → French

- sp.json → Spanish

- it.json → Italian

- zh.json → Chinese

### 🗺 Interactive Map

- The map uses Leaflet with OpenStreetMap tiles for free and interactive mapping.

- Features include:

 - Marker for restaurant location

 - Zoom and pan functionality

 - Optional routing/navigation for users

 ## 📖 Flipbook Menu

- Menu implemented as a flipbook-style component for an engaging experience.

- Users can navigate through pages like a real book.

- Supports dynamic content and multiple categories.


 ## 📝 Additional Features

- Right-to-left (RTL) layout for Arabic content

- Downloadable mobile app section

- Special discount banners

- Contact & inquiry forms

- Fully responsive for desktop, tablet, and mobile

### 📄 License

- This project is open-source and free to use. All rights reserved for Abdalla Yahia.

## 👨‍💻 Developer Information

- **Name:** Abdalla Yahia (Abu Yahya)  
- **Role:** Front-End Web Developer  
- **Experience:** 3+ years, self-taught, specializing in React.js & Next.js  
- **Location:** Beni Suef, Egypt  
- **Phone:** +20 12 111 00554  
- **Email:** abdallayahia75@gmail.com  
- **LinkedIn:** [linkedin.com/in/abdalla-yahia](https://www.linkedin.com/in/abdalla-yahia)  
- **GitHub:** [github.com/abdalla-yahia](https://github.com/abdalla-yahia)  
- **Certificates:**  
  - React Testing (Udacity)  
  - Full Stack with AWS (Udacity)  
  - Front-End with REST API (Udacity)  

---

### 💡 Notes
- The developer is responsible for all frontend features, multi-language support, interactive map integration, and the flipbook-style menu.  
- Always available for freelance or full-time collaboration on Next.js and React projects.
