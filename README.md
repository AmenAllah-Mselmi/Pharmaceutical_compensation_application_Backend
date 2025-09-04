# Pharmaceutical Compensation Management System - Backend

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge)

A comprehensive backend system for automating pharmaceutical compensation calculations and inventory management for Tunisia's central pharmacy system.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Compensation Algorithm](#-compensation-algorithm)
- [Development Progress](#-development-progress)
- [Contributing](#-contributing)
- [License](#-license)

## 🏥 Overview

This backend system revolutionizes how Tunisia's central pharmacy manages pharmaceutical compensations by replacing error-prone manual processes with an automated, accurate, and secure digital solution. The application handles complex compensation calculations, inventory management, and regulatory reporting requirements.

## ✨ Features

- **Automated Compensation Engine**: Sophisticated algorithm for precise pharmaceutical reimbursement calculations
- **Inventory Management**: Complete stock control with batch and expiration tracking
- **Multi-User System**: Role-based access control (Admin, Pharmacist, Auditor)
- **Real-time Reporting**: Generate compliance reports for government submissions
- **Audit Trail**: Comprehensive activity logging for full traceability
- **RESTful API**: Well-documented endpoints for seamless frontend integration
- **Data Validation**: Robust input validation and error handling

## 🛠️ Technology Stack

- **Framework**: NestJS 10+ with TypeScript
- **Database**: MySQL with TypeORM
- **Authentication**: JWT with passport.js
- **Validation**: Class-validator & class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest for unit and integration tests

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pharmaceutical-compensation-backend.git
   cd pharmaceutical-compensation-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials and JWT secret:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=pharmaceutical_compensation
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Database setup**
   ```bash
   # Run migrations
   npm run typeorm migration:run
   
   # Or sync database (development only)
   npm run typeorm schema:sync
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

6. **Access API documentation**
   Navigate to `http://localhost:3000/api` for Swagger documentation

## 🗄️ Database Schema

The system uses a comprehensive relational model:

### Core Entities
- **Users**: Authentication and role management (`id`, `email`, `password`, `role`)
- **Products**: Pharmaceutical catalog (`numPro`, `refProd`, `nouvPrixGrosHT`, `dateNouvPrixGr`)
- **TStock**: Inventory management (`id`, `annee`, `mois`, `quantite`, `prixRevient`, `pghtReel`)
- **Compensations**: Transaction records (`compensationID`, `dateCompensation`, `montantTotal`, `etat`)
- **Reports**: Regulatory documentation (`rapportID`, `titre`, `typeRapport`, `cheminFichier`)

### Relationships
- Users → Compensations (One-to-Many)
- Products → TStock (One-to-Many)
- Compensations ↔ Reports (Many-to-Many through Compensation_Rapport)

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User authentication |
| POST | `/auth/register` | User registration |

### Products Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| POST | `/products` | Create new product |
| GET | `/products/:id` | Get product by ID |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Compensation Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/compensations` | List all compensations |
| POST | `/compensations` | Create compensation |
| GET | `/compensations/total-sum` | Get total compensation sum |
| GET | `/compensations/sum_etat/:etat` | Get sum by status |

### Stock Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stock` | Get all stock entries |
| POST | `/stock` | Add stock entry |
| GET | `/stock/:id` | Get stock by ID |

## 🧮 Compensation Algorithm

The system implements the official compensation calculation formula:

```javascript
// Compensation calculation logic
if (prixRevient > nouvPrixGrosHT) {
    XPERTE = round(prixRevient - nouvPrixGrosHT, 3);
    XMAG = round(pghtReel - prixRevient, 3);
} else {
    XPERTE = 0;
    XMAG = 0;
}

if (nouvPrixGrosHT < pghtReel && nouvPrixGrosHT > prixRevient) {
    XMAG = round(pghtReel - nouvPrixGrosHT, 3);
}

compensationAmount = (XPERTE + XMAG) * quantity;
```

**Variables:**
- `prixRevient`: Cost price
- `nouvPrixGrosHT`: New wholesale price
- `pghtReel`: Real wholesale price
- `quantity`: Product quantity

## 📊 Development Progress

### ✅ Completed
- Database schema implementation
- Core entity models and relationships
- JWT authentication system
- Basic CRUD operations for all entities
- Compensation calculation engine
- Input validation and error handling

### 🚧 In Progress
- Advanced reporting module
- Bulk operations API
- Integration tests
- Performance optimization

### 📋 Planned
- Real-time notifications
- Data export functionality
- Advanced analytics dashboard
- Audit log interface

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

This project is developed as part of a digital transformation initiative for Tunisia's pharmaceutical sector, aiming to modernize compensation processes and improve operational efficiency.

## 📞 Support

For support, please open an issue in the GitHub repository or contact our development team at support@pharmaceutical-compensation.tn

---

*Transforming pharmaceutical compensation through technology and innovation.*