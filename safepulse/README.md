# SafePulse - Health-Aware Amusement Platform

The world's first health-aware platform for safer, smarter, and more engaging amusement park experiences.

## 🎢 Overview

SafePulse is a comprehensive analytics dashboard that tracks guest activity, calories, and vitals — and adapts the amusement park experience in real time. Built with Next.js, HeroUI, and Tailwind CSS, it provides park operators with real-time insights into guest health and safety.

## ✨ Key Features

### 🏃 Health Monitoring

- **Real-time Heart Rate Tracking**: Monitor guest heart rates with color-coded status indicators
- **Calorie Burn Analytics**: Track calories burned throughout the day with detailed breakdowns
- **Hydration Monitoring**: Monitor guest hydration levels and send alerts when needed
- **Safety Alerts**: Real-time notifications for health concerns and safety violations

### 🎯 Ride Safety Management

- **Dynamic Ride Access Control**: Restrict ride access based on health metrics
- **Safety Status Dashboard**: Real-time status of all rides with safety indicators
- **Guest Health Distribution**: Visual representation of guest health status across the park

### 📊 Analytics & Reporting

- **Weekly Health Score**: Comprehensive health scoring system
- **Active Guest Tracking**: Real-time monitoring of all active guests
- **Ride Session Analytics**: Detailed tracking of ride usage and safety metrics
- **Safety Alert Management**: Centralized alert system for health and safety issues

### 👥 Guest Management

- **Real-time Guest Status**: Live tracking of guest locations and health status
- **Health Profile Management**: Individual guest health profiles with historical data
- **Activity Tracking**: Monitor guest movement and activity patterns
- **Ride Access Control**: Manage guest access to rides based on health status

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: HeroUI (Heroicons + Headless UI)
- **Charts**: ECharts
- **Icons**: Lucide React
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd safepulse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
safepulse/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main dashboard page
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── HealthMetrics.tsx   # Health monitoring components
│       └── GuestManagement.tsx # Guest management interface
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🎨 Features in Detail

### Real-time Health Monitoring

- **Heart Rate Tracking**: Live monitoring with status indicators (Normal, Elevated, High, Critical)
- **Calorie Analytics**: Real-time calorie burn tracking with activity breakdown
- **Safety Alerts**: Automated alerts for health concerns and safety violations
- **Ride Safety Status**: Real-time status monitoring of all park rides

### Guest Management System

- **Active Guest Dashboard**: Real-time table of all active guests with health status
- **Health Metrics**: Individual guest health data including heart rate, hydration, and activity
- **Location Tracking**: Real-time guest location within the park
- **Ride Access Control**: Dynamic access management based on health status

### Analytics Dashboard

- **KPI Cards**: Key performance indicators for health scores, active guests, ride sessions, and safety alerts
- **Health Distribution Chart**: Pie chart showing distribution of guest health status
- **Ride Safety Metrics**: Bar chart tracking safe vs caution rides over time
- **Trend Analysis**: Mini line charts showing trends for each KPI

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_NAME=SafePulse
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Customization

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Data**: Update sample data in component files for your specific use case
- **Charts**: Customize chart configurations in the respective components

## 📊 Sample Data

The application includes comprehensive sample data for demonstration:

- **Guest Profiles**: 5 sample guests with realistic health metrics
- **Health Data**: Heart rate and calorie burn data over time
- **Ride Information**: 4 sample rides with safety status
- **Safety Alerts**: Real-time alerts for health concerns

## 🎯 Use Cases

### For Park Operators

- Monitor guest health in real-time
- Manage ride safety and access control
- Track park performance metrics
- Respond to health emergencies quickly

### For Health & Safety Teams

- Proactive health monitoring
- Automated safety alerts
- Historical health data analysis
- Compliance reporting

### For Guest Experience

- Personalized ride recommendations
- Health-aware activity suggestions
- Safety-first park experience
- Gamified health tracking

## 🔮 Future Enhancements

- **Wearable Integration**: Direct integration with Fitbit, Apple Watch, and other wearables
- **AI-Powered Insights**: Machine learning for predictive health analytics
- **Mobile App**: Guest-facing mobile application
- **API Integration**: RESTful API for third-party integrations
- **Multi-Park Support**: Support for multiple amusement parks
- **Advanced Analytics**: Predictive analytics and trend forecasting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- Email: support@safepulse.com
- Documentation: [docs.safepulse.com](https://docs.safepulse.com)
- Issues: [GitHub Issues](https://github.com/safepulse/issues)

---

**SafePulse** - Making fun safe again. 🎢❤️
