# Caddy UI

A beautiful web interface for managing Caddy web server reverse proxies with authentication. Caddy UI provides an intuitive dashboard to manage Caddy's reverse proxy configurations without editing config files manually.

![Caddy UI Screenshot](https://via.placeholder.com/800x450.png?text=Caddy+UI+Screenshot)

## Features

- 🔒 **User authentication and authorization**
  - Secure login system with email/password
  - Role-based permissions (admin/user)
  - Session management with NextAuth.js
- 🌐 **Manage reverse proxy configurations**
  - Create, edit, and delete reverse proxy entries
  - Enable/disable configurations without deleting them
  - Automatic updates to Caddy via Admin API
- 🚀 **Easy-to-use interface**
  - Clean, modern UI built with Tailwind CSS
  - Responsive design that works on all devices
  - Dark/light mode support
- 🔄 **Real-time updates to Caddy configuration**
  - Changes apply immediately through Caddy's Admin API
  - No need to restart Caddy or edit config files
- 📱 **Responsive design for desktop and mobile**
  - Beautiful on any device
  - Consistent experience across all screen sizes

## Screenshots

<details>
<summary>Click to expand screenshots</summary>

### Dashboard
![Dashboard](https://via.placeholder.com/800x450.png?text=Caddy+UI+Dashboard)

### Configurations List
![Configurations](https://via.placeholder.com/800x450.png?text=Caddy+UI+Configurations)

### Add New Proxy
![Add Proxy](https://via.placeholder.com/800x450.png?text=Caddy+UI+Add+Proxy)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x450.png?text=Caddy+UI+Dark+Mode)
</details>

## Prerequisites

- Node.js 18+ and npm
- Caddy web server (v2.x) installed and running with the admin API enabled
- Git for cloning the repository

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/caddyui.git
cd caddyui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the `.env` file and update it with your settings:

```bash
cp .env.example .env
```

Make sure to set:
- `DATABASE_URL`: Path to your SQLite database (default: file:./dev.db)
- `NEXTAUTH_SECRET`: A random string for session encryption (generate a strong secret for production)
- `NEXTAUTH_URL`: Your application URL (http://localhost:3000 for development)
- `CADDY_ADMIN_URL`: URL to your Caddy admin API (default: http://localhost:2019)

### 4. Set up the database

```bash
# Push the schema to the database
npm run db:push
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. On first run, you'll be presented with a setup page to create your administrator account.

## First-Time Setup

When you first run Caddy UI, you'll be presented with a setup page where you can create your administrator account:

1. Fill in your name, email address, and a secure password
2. Click "Complete Setup" to create your admin account
3. You'll be redirected to the login page where you can sign in with your new credentials

This secure setup process ensures you create your own administrator credentials instead of using default ones.

## Deployment

### Build for production

```bash
npm run build
```

### Start the production server

```bash
npm start
```

For a production environment, consider:
- Using a process manager like PM2
- Setting up SSL
- Using a reverse proxy for the UI itself
- Securing the Caddy Admin API

## Caddy Configuration

Make sure your Caddy server has the admin API enabled. You can start Caddy with:

```bash
caddy run --config Caddyfile --watch
```

Your Caddyfile should include:

```
{
  admin localhost:2019
}
```

> ⚠️ **Security Notice**: For production environments, you should secure the Caddy admin API by binding it to localhost and using a firewall, or by setting up authentication and TLS.

### Caddy API Integration

The application interacts with Caddy's Admin API through the following endpoints:

- `GET /config/` - Fetch current Caddy configuration
- `POST /load` - Replace entire configuration
- `PUT` - Add reverse proxy configurations
- `DELETE` - Remove configurations

For more information on Caddy's Admin API, see the [official documentation](https://caddyserver.com/docs/api).

## Project Architecture

The project is built using:

- **Next.js**: React framework for the frontend and API routes
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **Prisma**: ORM for database operations
- **NextAuth.js**: Authentication framework
- **SQLite**: Database (can be changed in Prisma config)

### Directory Structure

```
/src
  /app              # Next.js App Router pages
    /(protected)    # Protected routes requiring authentication
    /api            # API endpoints
  /components       # Reusable React components
  /contexts         # React contexts (auth, theme)
  /lib              # Utility functions and libraries
  /types            # TypeScript types
/prisma             # Prisma schema and migrations
/public             # Static assets
```

## Troubleshooting

### Common Issues

- **Connection Error**: Ensure Caddy is running with the admin API enabled
- **Authentication Issues**: Check your .env configuration for proper NEXTAUTH settings
- **Database Errors**: Ensure the SQLite file is writable by the process

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the code style guidelines.

### Development Guidelines

- Follow the existing code style and structure
- Write clean, documented code
- Add tests for new features
- Keep dependencies to a minimum
- Update documentation as needed

## Security

If you discover a security vulnerability, please use the issue tracker. Security issues will be addressed promptly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Caddy Server](https://caddyserver.com/) for the amazing web server
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- All the open source libraries used in this project
