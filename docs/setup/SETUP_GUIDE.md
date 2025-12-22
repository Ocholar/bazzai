# Quick Setup Guide - Bazztech Networks Landing Page

## Prerequisites

Before you can run the application, you need to install Node.js on your Windows system.

### Step 1: Install Node.js

1. Download Node.js from: https://nodejs.org/
2. Choose the LTS (Long Term Support) version
3. Run the installer and follow the installation wizard
4. Restart your terminal/PowerShell after installation

### Step 2: Verify Installation

Open PowerShell and run:
```powershell
node --version
npm --version
```

You should see version numbers for both commands.

## Installation Steps

### 1. Navigate to Project Directory
```powershell
cd c:\Users\Administrator\Documents\Antigravity\bazzai-production
```

### 2. Install Dependencies

The project uses `pnpm` as the package manager. Install it first:
```powershell
npm install -g pnpm
```

Then install project dependencies:
```powershell
pnpm install
```

This will install all required packages including:
- React & React DOM
- Framer Motion (for animations)
- Lucide React (for icons)
- Tailwind CSS
- TypeScript
- Vite (build tool)
- And all other dependencies listed in package.json

### 3. Start Development Server

```powershell
pnpm dev
```

The application will start and you'll see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. Open in Browser

Open your browser and navigate to: `http://localhost:5173/`

You should now see the enhanced landing page with all animations and features!

## Building for Production

When ready to deploy:

```powershell
pnpm build
```

This creates optimized production files in the `dist` folder.

## Troubleshooting

### Issue: "pnpm is not recognized"
**Solution**: Make sure you installed pnpm globally:
```powershell
npm install -g pnpm
```

### Issue: Port 5173 is already in use
**Solution**: Kill the process using that port or specify a different port:
```powershell
pnpm dev --port 3000
```

### Issue: TypeScript errors after installation
**Solution**: The errors should resolve automatically after `pnpm install`. If not, try:
```powershell
pnpm install --force
```

### Issue: Module not found errors
**Solution**: Clear node_modules and reinstall:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item pnpm-lock.yaml
pnpm install
```

## Environment Variables

If you need to configure environment variables, create a `.env` file in the project root:

```env
VITE_API_URL=your_api_url_here
VITE_APP_TITLE=Bazztech Networks
```

## Testing the Features

Once the app is running, test these features:

1. **Hero Section**: Check animations on page load
2. **Products**: Hover over product cards to see effects
3. **Features**: Scroll to features section for entrance animations
4. **Testimonials**: View customer feedback cards
5. **FAQ**: Check FAQ section styling
6. **Contact Form**: Try submitting the form
7. **Footer**: Test smooth scroll navigation buttons
8. **WhatsApp FAB**: Click the floating WhatsApp button (bottom-right)

## Development Commands

```powershell
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm check

# Format code
pnpm format

# Run tests
pnpm test
```

## Project Structure

```
bazzai-production/
├── src/
│   ├── pages/
│   │   └── Home.tsx          # Main landing page (enhanced)
│   ├── components/
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utilities and helpers
│   └── global.d.ts           # TypeScript declarations
├── public/                   # Static assets
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## Next Steps After Setup

1. ✅ Verify all animations work smoothly
2. ✅ Test form submission functionality
3. ✅ Check responsive design on different screen sizes
4. ✅ Update content as needed
5. ✅ Add real social media links
6. ✅ Configure analytics if needed
7. ✅ Deploy to production

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Option 2: Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Configure build settings

### Option 3: Railway
1. Push code to GitHub
2. Connect repository to Railway
3. Configure deployment

## Support

If you encounter any issues:
1. Check the console for error messages
2. Review the LANDING_PAGE_ENHANCEMENTS.md file
3. Ensure all dependencies are installed correctly
4. Verify Node.js version is compatible (v18+ recommended)

---

**Happy Coding! 🚀**
