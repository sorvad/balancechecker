# Balance Checker PWA

A Progressive Web App (PWA) for tracking and projecting your account balance through the end of the month. Built with vanilla JavaScript, HTML, and CSS - no build tools or frameworks required!

## ✨ Features

- **💰 Balance Projection**: See how your balance will look through the end of the current month
- **📱 Progressive Web App**: Install on any device (phone, tablet, desktop)
- **🌙 Dark Terminal UI**: Distinctive brutalist design with terminal aesthetics
- **⚡ Fast & Lightweight**: No dependencies, loads instantly
- **📴 Offline Ready**: Works without internet after first load
- **📊 Transaction Types**:
  - Daily transactions
  - Monthly transactions (with weekend handling)
  - End of month transactions
  - Yearly transactions
  - Three-monthly transactions
- **🎨 Visual Indicators**: 
  - Green for income
  - Red warning when below £-2000 overdraft limit
  - Hover effects and animations

## 🚀 Installation

### Option 1: Open Directly in Browser (Easiest!)

1. **Download the files** to a folder on your computer
2. **Double-click `index.html`** - it will open in your default browser
3. That's it! No web server needed for basic use.

### Option 2: Install as PWA (Recommended)

For full PWA features (offline access, home screen icon), you need a simple web server:

#### Using Python (if you have Python installed):

```bash
# Navigate to the folder containing the files
cd path/to/balance-checker

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

#### Using Node.js (if you have Node installed):

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to the folder
cd path/to/balance-checker

# Run server
http-server -p 8000
```

Then open: `http://localhost:8000`

#### Using VS Code:

1. Install the "Live Server" extension
2. Right-click `index.html` and select "Open with Live Server"

### Install to Home Screen:

Once running on a server:

**On Mobile (Chrome/Safari):**
- Click the "📱 Install App" button that appears, OR
- Chrome: Tap menu ⋮ → "Install app" or "Add to Home Screen"
- Safari: Tap Share → "Add to Home Screen"

**On Desktop (Chrome/Edge):**
- Click the install icon in the address bar, OR
- Click the "📱 Install App" button, OR
- Menu → "Install Balance Checker"

## 📖 How to Use

1. **Enter your current balance** in the input field (e.g., 1500.50)
2. **Click "Calculate Projections"**
3. **View your results**:
   - Starting balance and projected end balance at the top
   - Complete transaction list showing each transaction that will occur
   - Running balance column shows your balance after each transaction
4. **Click "New Calculation"** to start over

## 🎨 Design Features

The app uses a distinctive **brutalist/terminal aesthetic**:

- **JetBrains Mono** for code-like appearance
- **Space Mono** for bold headings
- **Dark theme** with green accent (inspired by old terminal screens)
- **Scan line animation** in the header
- **Blinking cursor** effect
- **Glowing effects** on focus/hover
- **Responsive design** works on all screen sizes

## ⚙️ Customization

### Adding/Editing Transactions

Open `index.html` in a text editor and find the `setupTransactions()` function (around line 550):

```javascript
function setupTransactions() {
    return [
        // Add your own transactions here!
        new MonthlyTransaction("Spotify", "OUT", 9.99, 5),
        new DailyTransaction("Coffee", "OUT", 3.50),
        new EndOfMonthTransaction("Salary", "IN", 3000),
        // ... existing transactions
    ];
}
```

**Transaction Types:**

```javascript
// Daily (happens every day)
new DailyTransaction("Name", "OUT", 10)

// Monthly (on specific day, handles weekends)
new MonthlyTransaction("Name", "OUT", 50, 15)  // 15th of month

// End of Month (last day, handles weekends)
new EndOfMonthTransaction("Salary", "IN", 2500)

// Yearly (specific day and month)
new YearlyTransaction("Insurance", "OUT", 200, 15, 6)  // June 15th

// Three Monthly (every 3 months starting from a specific month)
new ThreeMonthlyTransaction("Hosting", "OUT", 60, 25, 1)  // Jan, Apr, Jul, Oct on 25th
```

### Changing the Overdraft Limit

Find line ~805 in `index.html`:

```javascript
if (result.balance < -2000) {  // Change -2000 to your limit
    row.classList.add('overdraft');
}
```

And line ~727:

```javascript
if (endBalance < -2000) {  // Change -2000 to your limit
    endBalanceCard.classList.add('warning');
}
```

### Changing Colors

Edit the CSS variables at the top of the `<style>` section (around line 15):

```css
:root {
    --bg-primary: #0a0a0a;      /* Main background */
    --bg-secondary: #1a1a1a;    /* Card backgrounds */
    --accent-green: #00ff41;    /* Success/income color */
    --accent-red: #ff1744;      /* Warning/danger color */
}
```

## 📱 Browser Compatibility

- ✅ Chrome/Edge (desktop & mobile) - Full support
- ✅ Firefox (desktop & mobile) - Full support
- ✅ Safari (iOS & macOS) - Full support
- ✅ Samsung Internet - Full support

## 🔧 Technical Details

- **Size**: ~30KB total (extremely lightweight!)
- **No dependencies**: Pure vanilla JavaScript
- **No build process**: Just HTML, CSS, and JS
- **Offline capable**: Service worker caches everything
- **Mobile optimized**: Responsive design with mobile-specific layouts

## 📂 File Structure

```
balance-checker/
├── index.html          # Main app (includes all HTML, CSS, JS)
├── manifest.json       # PWA manifest for installation
├── sw.js              # Service worker for offline functionality
└── README.md          # This file
```

**Note**: For icons, you can create simple PNG files:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

Or the app will work fine without them!

## 💡 Tips

- **Press Enter** while in the balance input to calculate quickly
- **Install to home screen** for fastest access
- **Works offline** after first load
- **Mobile-friendly** - hides less important columns on small screens
- **Keyboard accessible** - fully navigable with keyboard

## 🆘 Troubleshooting

**No transactions showing up / Balance stays the same:**
- If you're at the **end of the month** (like Jan 30-31), there may be no transactions remaining in the current month!
- The app projects from TODAY through the end of the CURRENT month
- Try again on the 1st of next month to see a full month projection
- Open browser console (F12) to see debug information about what dates are being processed

**"Install App" button doesn't appear:**
- Make sure you're running on a web server (not just file://)
- Try Chrome/Edge for best PWA support
- Check that you're using HTTPS (or localhost)

**Transactions not calculating correctly:**
- Check the date formats in your custom transactions
- Verify month numbers (1-12, not 0-11)
- Make sure amounts are numbers, not strings

**App looks broken on mobile:**
- Try rotating your device
- Zoom out if text is overlapping
- Clear browser cache and reload

## 🎯 Future Enhancements

Potential features for future versions:
- Export results to PDF/CSV
- Save multiple balance scenarios
- Add custom transaction types
- Budget vs actual tracking
- Notifications for large upcoming transactions
- Multiple account support
- Dark/light theme toggle
- Chart/graph visualization

## 📄 License

Free to use and modify for personal use.

## 🤝 Contributing

Feel free to customize this app for your needs! The code is well-commented and easy to modify.

---

**Enjoy tracking your finances! 💰**
