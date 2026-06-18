# Portfolio Backend Setup (Node.js + Express)

## 1. Install Node.js

Install :contentReference[oaicite:0]{index=0}

Check installation:

```bash
node -v
npm -v
```

---

## 2. Create Backend Project

```bash
mkdir backend
cd backend
npm init -y
```

---

## 3. Install Dependencies

Install :contentReference[oaicite:1]{index=1}

```bash
npm install express
```

Install CORS

```bash
npm install cors
```

Install :contentReference[oaicite:2]{index=2}

```bash
npm install nodemon --save-dev
```

---

## 4. Update package.json

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

---

## 5. Create Project Structure

```bash
mkdir controllers routes services
touch index.js
touch controllers/heroController.js
touch routes/heroRoutes.js
touch services/heroServices.js
```

Project structure:

```bash
backend/
├── controllers/
│   └── heroController.js
├── routes/
│   └── heroRoutes.js
├── services/
│   └── heroServices.js
├── index.js
├── package.json
```

---

## 6. Add Code

### index.js

```javascript
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4005;

app.use(cors());
app.use(express.json());

const heroRoutes = require("./routes/heroRoutes");

app.use("/api", heroRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### services/heroServices.js

```javascript
const getHeroData = () => {
  return {
    greeting: "Hello, I'm",
    name: "Mohammed Wasim",
    role: "React & Next.js Developer",
    description: "Freelance React.js and Next.js developer",
    resumeUrl: "/assets/files/resume.pdf",
    socials: {
      linkedin: "https://linkedin.com/in/iamwasim124",
      email: "mailto:iamwasim124@gmail.com",
      phone: "tel:+918123833968",
    },
    image: "/assets/images-videos/wasim.png",
  };
};

module.exports = { getHeroData };
```

---

### controllers/heroController.js

```javascript
const heroService = require("../services/heroServices");

const getHeroData = (req, res) => {
  res.json(heroService.getHeroData());
};

module.exports = { getHeroData };
```

---

### routes/heroRoutes.js

```javascript
const express = require("express");
const router = express.Router();

const heroController = require("../controllers/heroController");

router.get("/hero", heroController.getHeroData);

module.exports = router;
```

---

## 7. Start Backend

```bash
npm run dev
```

Server runs at:

```bash
http://localhost:4005
```

API:

```bash
http://localhost:4005/api/hero
```

---

## 8. Connect Frontend

In :contentReference[oaicite:3]{index=3}:

```javascript
const res = await fetch("http://localhost:4005/api/hero");
const data = await res.json();
```

---

## 9. Auto Restart During Development

Use:

```bash
npm run dev
```

Nodemon auto restarts when files change.

---

## 10. Useful Commands

Run backend:

```bash
npm run dev
```

Install package:

```bash
npm install package-name
```

Check port:

```bash
lsof -i :4005
```

Stop server:

```bash
Ctrl + C
```
