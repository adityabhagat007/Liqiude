# Liquide - Intelligent Investment Platform

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple.svg)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.1-blue.svg)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Liquide is a modern, intelligent investment platform that provides users with curated investment baskets designed to maximize returns while minimizing risk. Built with React and Material-UI, it offers a seamless user experience for managing investment portfolios.

## 🚀 Features

### Core Features
- **Smart Investment Baskets**: Diversified portfolios designed by experts for optimal returns
- **Portfolio Management**: Track and manage your investments in real-time
- **Secure Authentication**: OTP-based login system with secure token management
- **Interactive Charts**: Visualize investment performance with Recharts integration
- **Responsive Design**: Modern, mobile-friendly interface built with Material-UI

### Key Functionalities
- **Dashboard**: Overview of your investment portfolio and available baskets
- **Basket Details**: Detailed view of investment baskets with performance metrics
- **Investment Tracking**: Monitor your current investments and their performance
- **Subscription Management**: Subscribe to new investment baskets
- **Mandate System**: Set up investment mandates for automated investing

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **UI Library**: Material-UI (MUI) 7.3.1
- **Routing**: React Router DOM 7.8.1
- **HTTP Client**: Axios 1.11.0
- **Charts**: Recharts 3.1.2
- **Styling**: Emotion (CSS-in-JS)
- **Code Quality**: ESLint

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd liquide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and configure your environment variables:
   ```env
   VITE_API_BASE_URL=http://10.10.13.33:1337
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
liquide/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Cards/         # Investment and basket cards
│   │   ├── Charts/        # Chart components
│   │   ├── Drawer/        # Navigation drawer
│   │   └── Notification/  # Notification components
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── routes/            # Routing configuration
│   ├── services/          # API services and authentication
│   └── utils/             # Utility functions and configuration
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application uses an OTP-based authentication system:

1. **Login**: Users enter their phone number to receive an OTP
2. **OTP Verification**: Users verify their identity using the received OTP
3. **Token Management**: Secure token storage and automatic API authentication

## 📱 Pages & Routes

### Public Routes
- `/` - Homepage with platform overview
- `/login` - Authentication page

### Protected Routes
- `/dashboard` - Main dashboard with portfolio overview
- `/basket/:id` - Detailed view of specific investment basket
- `/subscribe/:basketId` - Subscription management page
- `/mandate` - Investment mandate setup

## 🎨 UI Components

### Cards
- **BasketCard**: Displays investment basket information with performance metrics
- **InvestmentCard**: Shows user's current investment details
- **Card**: Generic card component for consistent styling

### Charts
- **BasketChart**: Interactive charts for visualizing basket performance

### Navigation
- **Navbar**: Main navigation bar
- **Drawer**: Side navigation drawer for mobile devices

## 🔧 Configuration

### API Configuration
The application connects to a backend API with the following endpoints:

- **Authentication**: `/send-otp`, `/verify-otp`
- **Baskets**: `/baskets`, `/baskets/:id`
- **Investments**: `/investments`
- **Charts**: `/baskets/:id/chart/:period`
- **Subscriptions**: `/investments/:basketId/subscribe`
- **Mandates**: `/investments/:basketId/mandate/:period`

### Environment Variables
- `VITE_API_BASE_URL`: Backend API base URL

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Production
1. Build the application using `npm run build`
2. Serve the contents of the `dist/` directory using your preferred web server
3. Configure your web server to handle client-side routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- Real-time notifications
- Advanced portfolio analytics
- Mobile app development
- Integration with additional financial services
- Enhanced security features

---

**Liquide** - Your gateway to intelligent investing. 🚀
