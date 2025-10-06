# Hospital Management System

A comprehensive web-based hospital management system built with React.js frontend and Spring Boot backend, designed to streamline hospital operations and patient management.

## 🏥 Features

- **User Authentication & Authorization**
  - Secure login system for administrators
  - Role-based access control
  - CSRF protection for session management

- **Patient Management**
  - Add new patients
  - View patient information
  - Update patient details
  - Delete patient records

- **Dashboard**
  - Overview of hospital operations
  - Quick access to key functions
  - Responsive design for all devices

- **Security**
  - Spring Security integration
  - Secure RESTful API endpoints
  - Protected routes and data access

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.3.3**
- **Spring Security**
- **Spring Data JPA**
- **MySQL Database**
- **Maven** (Build Tool)

### Frontend
- **React 18.3.1**
- **React Router DOM**
- **Axios** (HTTP Client)
- **Tailwind CSS** (Styling)
- **Create React App**

## 📁 Project Structure

```
Hospital-Management-System-main/
├── Back-End/
│   └── HospitalM-1/
│       ├── src/main/java/com/example/Hospital/
│       │   ├── config/          # Security configuration
│       │   ├── controller/      # REST controllers
│       │   ├── dto/            # Data Transfer Objects
│       │   ├── entity/         # JPA entities
│       │   ├── Impl/           # Service implementations
│       │   ├── repo/           # Repository interfaces
│       │   ├── response/       # Response models
│       │   └── service/        # Service interfaces
│       ├── src/main/resources/
│       │   └── application.properties
│       └── pom.xml
├── Front-End/
│   ├── src/
│   │   ├── component/          # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js** (v14 or higher)
- **MySQL** database
- **Maven** (for backend)
- **npm** or **yarn** (for frontend)

### 📋 Initial Setup (Important!)

Since some configuration files are ignored by `.gitignore`, you need to create them locally:

#### 1. **Clone and Navigate to Project**
```bash
git clone <your-repository-url>
cd Hospital-Management-System-main
```

#### 2. **Database Setup**
```bash
# Start MySQL service
# Windows: Start MySQL service from Services
# Linux/Mac: sudo systemctl start mysql

# Create database and tables
mysql -u root -p < database-setup.sql
```

#### 3. **Backend Configuration**
```bash
cd Back-End/HospitalM-1/src/main/resources

# Copy the example configuration file
cp application.properties.example application.properties

# Edit application.properties with your database credentials
# Windows: notepad application.properties
# Linux/Mac: nano application.properties
```

**Update these values in `application.properties`:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db?createDatabaseIfNotExist=true
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

#### 4. **Frontend Configuration**
```bash
cd Front-End

# Copy the example environment file
cp env.example .env

# Edit .env with your configuration
# Windows: notepad .env
# Linux/Mac: nano .env
```

**Update these values in `.env`:**
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_BASE_URL=http://localhost:8080/api
```

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd Back-End/HospitalM-1
   ```

2. **Install dependencies and run:**
   ```bash
   # Install Maven dependencies
   mvn clean install
   
   # Run the Spring Boot application
   mvn spring-boot:run
   ```
   
   The backend will be available at `http://localhost:8080`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd Front-End
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   The frontend will be available at `http://localhost:3000`

### 🔧 Files You Need to Create Locally

The following files are ignored by `.gitignore` and need to be created locally:

| File | Purpose | How to Create |
|------|---------|---------------|
| `Back-End/HospitalM-1/src/main/resources/application.properties` | Database configuration | Copy from `application.properties.example` |
| `Front-End/.env` | Frontend environment variables | Copy from `env.example` |
| `node_modules/` (Frontend) | Node.js dependencies | Run `npm install` |
| `target/` (Backend) | Maven build output | Run `mvn clean install` |
| Database files | MySQL database | Run `database-setup.sql` |

## 🔧 Configuration

### Backend Configuration

The application uses Spring Boot's auto-configuration. Key configuration files:

- `application.properties` - Database and application settings
- `SecurityConfig.java` - Security configuration
- `pom.xml` - Maven dependencies

### Frontend Configuration

- `package.json` - Node.js dependencies and scripts
- `src/App.js` - Main application component
- Components are located in `src/component/`

## 📊 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Admin registration

### Patient Management
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient

## 🧪 Testing

### Backend Testing
```bash
cd Back-End/HospitalM-1
mvn test
```

### Frontend Testing
```bash
cd Front-End
npm test
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. **Database Connection Issues**
```bash
# Error: Could not create connection to database server
```
**Solution:**
- Ensure MySQL service is running
- Check database credentials in `application.properties`
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`
- Create database manually: `mysql -u root -p -e "CREATE DATABASE hospital_db;"`

#### 2. **Port Already in Use**
```bash
# Error: Port 8080 was already in use
```
**Solution:**
- Change port in `application.properties`: `server.port=8081`
- Or kill process using port: `netstat -ano | findstr :8080` (Windows) / `lsof -ti:8080 | xargs kill` (Linux/Mac)

#### 3. **Node Modules Not Found**
```bash
# Error: Cannot find module
```
**Solution:**
```bash
cd Front-End
rm -rf node_modules package-lock.json
npm install
```

#### 4. **Maven Build Issues**
```bash
# Error: Failed to execute goal
```
**Solution:**
```bash
cd Back-End/HospitalM-1
mvn clean
mvn install -DskipTests
```

#### 5. **Environment Variables Not Loading**
```bash
# Error: process.env.REACT_APP_API_URL is undefined
```
**Solution:**
- Ensure `.env` file exists in `Front-End/` directory
- Restart React development server after creating `.env`
- Variables must start with `REACT_APP_`

#### 6. **CORS Issues**
```bash
# Error: Access to fetch at 'http://localhost:8080' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution:**
- Check if backend is running on correct port
- Verify `REACT_APP_API_URL` in `.env` matches backend URL
- Ensure backend CORS configuration allows frontend origin

### 🔍 Quick Health Check

Run these commands to verify your setup:

```bash
# Check Java version
java -version

# Check Node.js version
node --version
npm --version

# Check MySQL connection
mysql -u root -p -e "SELECT 1;"

# Check if ports are available
netstat -an | findstr :8080  # Windows
lsof -i :8080                # Linux/Mac
```

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/HospitalM-1-0.0.1-SNAPSHOT.jar
   ```

### Frontend Deployment
1. Build for production:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Spring Boot community for excellent documentation
- React team for the amazing frontend framework
- MySQL for reliable database management
