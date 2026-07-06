<div align="center">

# 🌿 Virtual Herbal Garden

### Preserving India's Medicinal Plant Heritage Through Technology

A full-stack web application for exploring medicinal plants, disease-wise herbal remedies, and traditional AYUSH knowledge through a modern, responsive, and user-friendly platform.

<br>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8BC34A?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white)

</div>

---

## Introduction

**Virtual Herbal Garden** is a full-stack web application developed to preserve and promote India's rich medicinal plant heritage through digital technology.

The platform enables users to explore medicinal plants, discover disease-wise herbal remedies, understand Ayurveda, Siddha, Unani and other traditional medicinal systems, and access scientifically organized plant information from a single, user-friendly interface.

The application includes secure authentication, role-based authorization, image management using Cloudinary, dynamic search functionality, and a responsive interface designed to provide an informative and seamless user experience.


---

# Project Overview

Virtual Herbal Garden is a full-stack web application developed to digitally preserve and promote India's rich medicinal plant heritage. It serves as an educational platform where users can explore medicinal plants, understand their scientific and traditional uses, discover disease-wise herbal remedies, and learn about different AYUSH systems.

The application provides an intuitive interface for browsing medicinal plant information, searching across multiple datasets, and accessing detailed knowledge about natural remedies. It also includes a secure administration module for managing plant and disease records through a role-based authentication system.

The primary objective of this project is to bridge traditional herbal knowledge with modern web technologies, making valuable medicinal plant information easily accessible through a centralized digital platform.

---

# Objectives

- Develop a centralized digital repository of medicinal plants.
- Preserve and promote traditional AYUSH knowledge.
- Provide disease-wise herbal remedy information.
- Implement secure user authentication and authorization.
- Allow administrators to manage plant and disease records.
- Enable intelligent universal search across the application.
- Provide a responsive and user-friendly interface for all devices.
- Store and manage images using Cloudinary.

---

#  Features

##  Medicinal Plant Module

- Browse medicinal plants with an attractive card-based interface.
- View detailed information for each medicinal plant.
- Scientific Name
- Common Name
- Botanical Family
- Plant Category
- AYUSH System
- Medicinal Uses
- Preparation Methods
- Dosage Information
- Precautions
- Side Effects
- Plant Images

---

##  Disease Management Module

- Browse common diseases.
- View complete disease details.
- Symptoms
- Causes
- Herbal Remedies
- Recommended Medicinal Plants
- Prevention Methods
- Related Disease Images

---

##  Universal Search

Search information using a single search bar across multiple datasets.

Supports searching by:

- Plant Name
- Scientific Name
- Disease Name
- Symptoms
- Medicinal Uses
- Plant Category
- AYUSH System

---

##  User Authentication

- User Registration
- Secure Login
- Logout
- Session Management
- Flash Messages
- Password Encryption using Passport.js

---

##  Admin Panel

Role-Based Access Control (RBAC)

Only administrators can:

- Add New Plants
- Update Plant Information
- Delete Plants
- Add New Diseases
- Update Disease Information
- Delete Diseases
- Upload Images

---

##  Image Management

Integrated with Cloudinary for:

- Cloud Image Upload
- Image Storage
- Image Optimization
- Secure Media Management

---

##  Dynamic Homepage

- Responsive Hero Section
- Animated Statistics Counter
- Featured Medicinal Plants
- Featured Diseases
- Plant Categories
- FAQ Section
- Responsive Footer

---

##  Responsive Design

- Desktop
- Laptop
- Tablet
- Mobile Devices

Built using Bootstrap 5 and custom CSS.



---

#  Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | HTML5, CSS3, Bootstrap 5, JavaScript, EJS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Passport.js, Passport Local, Express Session, Connect Flash |
| **Image Storage** | Cloudinary, Multer |
| **Development Tools** | VS Code, Git, GitHub |
| **Deployment Ready** | Render / Railway *(can be deployed)* |

---

# 📁 Project Structure

```text
Virtual-Herbal-Garden
│
├── controllers/
│   ├── disease.js
│   ├── plant.js
│   └── user.js
│
├── middleware/
│   └── index.js
│
├── models/
│   ├── disease.js
│   ├── plant.js
│   └── user.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── routes/
│   ├── disease.js
│   ├── plant.js
│   ├── search.js
│   └── user.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── diseases/
│   ├── plants/
│   ├── users/
│   ├── includes/
│   ├── layouts/
│   └── home.ejs
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
└── README.md
```

---

#  Installation & Setup

## Prerequisites

Before running this project, make sure the following are installed on your system:

- Node.js (v18 or above recommended)
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account
- Git

---

## Clone the Repository

```bash
git clone https://github.com/yourusername/virtual-herbal-garden.git
```

Navigate to the project directory.

```bash
cd virtual-herbal-garden
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root directory.

Add the following variables:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_secret_key

CLOUD_NAME=your_cloudinary_cloud_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_api_secret
```

---

## Run the Application

Start the development server:

```bash
npm start
```

or

```bash
nodemon app.js
```

---

## Open in Browser

Visit the following URL:

```
http://localhost:8080
```

The application should now be running successfully.

---

---

#  Application Screenshots

##  Home Page

![Home Page](screenshots/home.png)

---

##  Medicinal Plants

![Medicinal Plants](screenshots/featured-plants.png)

---

##  Plant Details

![Plant Details](screenshots/plant-details.png)

---

##  Diseases

![Diseases](screenshots/diseases.png)

---

##  Disease Details

![Disease Details](screenshots/disease-details.png)

---

##  Universal Search

![Universal Search](screenshots/search.png)

---

## Authentication

### Login

![Login](screenshots/login.png)

### Signup

![Signup](screenshots/signup.png)

---

---

#  Future Enhancements

The following features are planned for future versions of the Virtual Herbal Garden:

-  AI-powered medicinal plant recommendation system
-  Plant identification using image recognition
-  Voice-based search for medicinal plants
-  Multi-language support
-  Mobile application (Android & iOS)
-  Nearby herbal garden locator
-  QR code-based plant information system
-  Personalized herbal recommendations
-  Advanced analytics dashboard
-  Deployment on cloud platforms for public access

---

#  Learning Outcomes

During the development of this project, I gained practical experience in:

- Full-Stack Web Development
- MVC Architecture
- RESTful Routing
- MongoDB Database Design
- Authentication & Authorization using Passport.js
- Session Management
- Cloudinary Image Integration
- CRUD Operations
- Express Middleware
- Server-side Rendering with EJS
- Responsive UI Design using Bootstrap 5
- Git & GitHub Version Control


---

#  Contributing

Contributions, suggestions, and improvements are welcome.

If you'd like to contribute:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---


#  Developer

**Md Fahim**

Full Stack Web Developer

📧 Email: mdfahim002003@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/md-fahim-dev/

💻 GitHub: https://github.com/mdfahim10



#  License

This project is intended for educational and portfolio purposes.

---

#  Acknowledgements

Special thanks to all the open-source technologies and communities that made this project possible.

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bootstrap
- Cloudinary
- Passport.js
- Font Awesome