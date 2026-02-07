# TradeSphere - Stock Trading Platform

A comprehensive full-stack web application for stock trading and portfolio management built with React, Node.js, Express, and MongoDB.

---

## What is TradeSphere?

TradeSphere is a stock trading simulator that mimics real-world trading platforms like Zerodha. It provides users with a safe environment to practice buying and selling stocks, tracking their portfolio performance, and managing their investments without risking real money.

Whether you're learning about stock markets or developing your trading strategies, TradeSphere offers a realistic trading experience with real-time calculations and portfolio tracking.

---

## Why TradeSphere?

**For Beginners:**
- Learn stock trading basics without financial risk
- Understand how portfolios work
- Practice buying and selling stocks
- Track gains and losses in real-time

**For Developers:**
- Full-stack project demonstrating modern web technologies
- JWT authentication implementation
- RESTful API design
- React and Node.js integration
- MongoDB database management

**For Educators:**
- Teaching tool for finance and trading concepts
- Demonstrates real-world application architecture
- Shows best practices in web development

---

## Key Features

### User Management
- Secure user registration and login
- Password encryption with bcrypt
- JWT token-based authentication
- Session management with cookies
- Multi-user support with data isolation

### Trading Operations
- Buy stocks with custom quantity and price
- Sell stocks from your holdings
- Automatic portfolio updates
- Order validation to prevent overselling
- Complete transaction history

### Portfolio Tracking
- View all your stock holdings
- See average purchase price for each stock
- Monitor current market prices
- Calculate net gains and losses
- Track daily price changes
- Visual indicators for profitable and loss-making stocks

### Fund Management
- Monitor available trading margin
- Track used margin (invested amount)
- View available cash balance
- Automatic calculation of funds after each trade
- Prevents over-trading beyond available funds

### Performance Analytics
- Real-time profit and loss calculations
- Average cost tracking across multiple purchases
- Daily percentage change tracking
- Overall portfolio performance metrics

---

## Technology Stack

### Frontend
- React 19.2.3
- React Router DOM for navigation
- Axios for API calls
- React Cookie for session management
- Create React App for build tooling

### Backend
- Node.js runtime environment
- Express.js 5.2.1 web framework
- MongoDB with Mongoose ODM
- JWT for authentication
- Passport.js for authentication strategies
- Bcrypt.js for password hashing

### Development Tools
- Nodemon for automatic server restart
- CORS for cross-origin requests
- Body-parser for request handling
- Cookie-parser for cookie management

---

## Project Structure

```
TradeSphere/
│
├── backend/
│   ├── Controllers/
│   │   └── AuthController.js          # Authentication logic
│   ├── Routes/
│   │   └── AuthRoute.js               # API route definitions
│   ├── Middlewares/
│   │   └── AuthMiddleware.js          # JWT verification
│   ├── model/
│   │   ├── HoldingModel.js            # Holdings database model
│   │   ├── PositionModel.js           # Positions database model
│   │   ├── OrdersModel.js             # Orders database model
│   │   └── UserModel.js               # User database model
│   ├── schemas/
│   │   ├── HoldingSchema.js           # Holdings schema
│   │   ├── OrderSchema.js             # Orders schema
│   │   └── UserSchema.js              # User schema
│   ├── util/
│   │   └── SecretToken.js             # JWT token generation
│   ├── index.js                       # Main server file
│   ├── package.json                   # Backend dependencies
│   └── .env                           # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── index.js                   # React entry point
│   │   ├── index.css                  # Global styles
│   │   ├── pages/
│   │   │   └── KiteRedirect.jsx       # Trading page
│   │   └── landing_page/              # Landing page components
│   ├── public/                        # Static assets
│   ├── package.json                   # Frontend dependencies
│   └── .gitignore
│
├── dashboard/
│   ├── src/                           # Dashboard components
│   ├── public/                        # Dashboard assets
│   ├── package.json                   # Dashboard dependencies
│   └── .gitignore
│
└── README.md                          # Project documentation
```

---

## Getting Started

### Prerequisites

Before running TradeSphere, make sure you have these installed:

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation Steps

**Step 1: Clone the Repository**

```bash
git clone 
cd TradeSphere
```

**Step 2: Set Up Backend**

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?appName=<appname>
TOKEN_KEY=your_secret_jwt_key_here
PORT=3000
INDIA_API_KEY=your_api_key_here
```

Start the backend server:

```bash
npm start
```

The backend will run on http://localhost:3000

**Step 3: Set Up Frontend**

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will run on http://localhost:3000 or the next available port.

**Step 4: Set Up Dashboard (Optional)**

Open another terminal:

```bash
cd dashboard
npm install
npm start
```

---

## How to Use TradeSphere

### Creating an Account

1. Open the application in your browser
2. Click on the Sign Up button
3. Enter your email, username, and password
4. Click Register
5. You'll be automatically logged in and redirected to your dashboard

### Logging In

1. Go to the login page
2. Enter your email and password
3. Click Login
4. Access your personalized trading dashboard

### Buying Stocks

1. Navigate to the trading interface
2. Enter the stock symbol (for example, "INFY" for Infosys)
3. Specify the quantity you want to buy
4. Enter the price per share
5. Select "BUY" as the transaction mode
6. Confirm your order
7. The stock will be added to your holdings

### Selling Stocks

1. Go to your holdings section
2. Select the stock you want to sell
3. Click the Sell button
4. Enter the quantity to sell
5. Specify the selling price
6. Select "SELL" as the transaction mode
7. Confirm the transaction
8. Your holdings and funds will update automatically

### Viewing Your Portfolio

**Holdings Tab:**
- See all stocks you currently own
- View quantity, average purchase price, and current price
- Check your profit or loss for each stock
- Monitor daily price changes

**Positions Tab:**
- Track your intraday trading positions
- View active trades

**Orders Tab:**
- See your complete order history
- Review all past buy and sell transactions
- Check order timestamps

**Funds Tab:**
- Monitor your available trading margin
- See how much margin you've used
- Check your available cash balance
- View opening and closing balances

---

## Understanding the Calculations

### Average Purchase Price

When you buy the same stock multiple times, TradeSphere calculates your average cost:

```
Average Price = (Previous Average × Previous Quantity + New Price × New Quantity) / Total Quantity
```

**Example:**
- You buy 10 shares of INFY at 1,500 rupees
- Later, you buy 5 more shares at 1,600 rupees
- New average = (1,500 × 10 + 1,600 × 5) / 15 = 1,533.33 rupees

### Profit and Loss

**Net Gain or Loss:**
```
Net % = ((Current Price - Average Cost) / Average Cost) × 100
```

**Daily Change:**
```
Daily % = ((Current Price - Opening Price) / Opening Price) × 100
```

### Margin Management

**Used Margin:**
```
Used Margin = Sum of (Average Price × Quantity) for all holdings
```

**Available Margin:**
```
Available Margin = Total Margin - Used Margin
```

By default, TradeSphere provides 100,000 rupees as your initial trading margin.

---

## API Documentation

### Authentication Endpoints

**Register a New User**
- Method: POST
- Endpoint: `/signup`
- Body: `{ email, username, password }`
- Returns: User token and user information

**Login**
- Method: POST
- Endpoint: `/login`
- Body: `{ email, password }`
- Returns: JWT token and user information

**Verify Token**
- Method: POST
- Endpoint: `/verify`
- Headers: `Authorization: Bearer <token>`
- Returns: User validation status

### Trading Endpoints

**Get All Holdings**
- Method: GET
- Endpoint: `/allHoldings`
- Headers: `Authorization: Bearer <token>`
- Returns: Array of user holdings

**Get All Positions**
- Method: GET
- Endpoint: `/allPositions`
- Headers: `Authorization: Bearer <token>`
- Returns: Array of user positions

**Get All Orders**
- Method: GET
- Endpoint: `/allOrders`
- Headers: `Authorization: Bearer <token>`
- Returns: Array of user order history

**Place New Order**
- Method: POST
- Endpoint: `/newOrder`
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, qty, price, mode }`
- Returns: Order confirmation

**Get Funds Information**
- Method: GET
- Endpoint: `/funds`
- Headers: `Authorization: Bearer <token>`
- Returns: Margin and fund details

---

## Database Schema Details

### Users Collection

Stores user account information:
- email: Unique user email address
- username: Display name for the user
- password: Hashed password using bcrypt
- createdAt: Account creation timestamp

### Holdings Collection

Stores user stock holdings:
- userId: Reference to the user who owns the stock
- name: Stock symbol or ticker
- qty: Number of shares owned
- avg: Average purchase price
- price: Current market price
- net: Net gain or loss percentage
- day: Daily price change percentage
- isLoss: Boolean flag indicating if position is in loss
- openPrice: Previous day's opening price

### Orders Collection

Stores all trading transactions:
- userId: Reference to the user who placed the order
- name: Stock symbol
- qty: Quantity traded
- price: Transaction price
- mode: "BUY" or "SELL"
- createdAt: Order timestamp

### Positions Collection

Stores intraday trading positions:
- userId: Reference to the user
- product: Product type (CNC, MIS, etc.)
- name: Stock symbol
- qty: Position quantity
- avg: Average entry price
- price: Current price
- net: Net percentage
- day: Daily percentage change
- isLoss: Loss indicator

---

## Security Features

### Password Security
- All passwords are hashed using bcrypt before storage
- Salt rounds ensure strong encryption
- Original passwords are never stored in the database

### Authentication
- JWT tokens for secure API access
- Tokens expire after 3 days
- Middleware validates tokens on protected routes

### Data Isolation
- Each user's data is completely isolated
- User ID verification on all data access
- No cross-user data leakage

### Session Management
- HTTP-only cookies prevent XSS attacks
- Secure cookie transmission
- Automatic session expiration

---

## Development Guidelines

### Running in Development Mode

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm start
```

Dashboard:
```bash
cd dashboard
npm start
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

This creates optimized production files in the `build` directory.

Backend:
```bash
cd backend
NODE_ENV=production npm start
```

### Environment Variables

Create a `.env` file with:
- MONGO_URL: Your MongoDB connection string
- TOKEN_KEY: Secret key for JWT signing
- PORT: Server port (default: 3000)
- INDIA_API_KEY: API key for external services

Never commit the `.env` file to version control.

---

## Common Issues and Solutions

### MongoDB Connection Error

**Problem:** Cannot connect to MongoDB

**Solution:**
- Check your MONGO_URL in the .env file
- Verify MongoDB is running (if local installation)
- Check MongoDB Atlas IP whitelist (if using cloud)
- Ensure correct username and password

### Port Already in Use

**Problem:** Port 3000 is already in use

**Solution:**
- Stop other applications using port 3000
- Change PORT in .env file
- Use `npx kill-port 3000` to free the port

### CORS Errors

**Problem:** Cross-origin request blocked

**Solution:**
- Verify CORS configuration in backend index.js
- Add your frontend URL to allowed origins
- Check that both frontend and backend are running

### Token Verification Failed

**Problem:** Authentication token invalid

**Solution:**
- Clear browser cookies
- Log out and log in again
- Check TOKEN_KEY matches in .env
- Verify token hasn't expired

---

## Contributing to TradeSphere

We welcome contributions from the community! Here's how you can help:

### Reporting Bugs

1. Check if the bug has already been reported
2. Create a detailed bug report with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - System information

### Suggesting Features

1. Open a GitHub discussion
2. Describe the feature and its benefits
3. Explain how it would work
4. Provide examples if possible

### Submitting Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use meaningful variable names
- Add comments for complex logic
- Follow existing code formatting
- Write clean, readable code
- Update documentation as needed

---

## Future Roadmap

### Planned Features

**Phase 1: Core Enhancements**
- Real-time stock price updates using WebSockets
- Advanced charting with technical indicators
- Stock watchlist functionality
- Market screener with filters

**Phase 2: User Experience**
- Mobile application (React Native)
- Email notifications for orders
- Two-factor authentication (2FA)
- Dark mode theme

**Phase 3: Advanced Features**
- Payment gateway integration
- Multiple portfolio support
- Social trading features
- Trading bots and automation

**Phase 4: Developer Tools**
- API documentation with Swagger
- Docker containerization
- CI/CD pipeline with GitHub Actions
- Comprehensive testing suite

---

## Testing

### Manual Testing Checklist

**Authentication:**
- [ ] User can register successfully
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong password
- [ ] Token expires after 3 days
- [ ] Session persists across page refreshes

**Trading:**
- [ ] User can buy stocks
- [ ] User can sell stocks
- [ ] Average price calculates correctly
- [ ] Cannot sell more than owned quantity
- [ ] Holdings update after transactions

**Portfolio:**
- [ ] Holdings display correctly
- [ ] Profit/loss calculates accurately
- [ ] Daily changes show properly
- [ ] Funds update after trades
- [ ] Order history shows all transactions

---

## Performance Optimization

### Frontend Optimization
- Code splitting for faster load times
- Lazy loading of components
- Memoization of expensive calculations
- Optimized re-renders with React hooks

### Backend Optimization
- Database indexing on frequently queried fields
- Query optimization with Mongoose
- Response caching where appropriate
- Connection pooling for MongoDB

### Network Optimization
- Compressed API responses
- Minimized API calls
- Efficient data transfer formats
- CDN for static assets (in production)

---

## Deployment

### Deploying to Production

**Backend Deployment (Example: Heroku)**

```bash
heroku create tradesphere-backend
heroku config:set MONGO_URL=
heroku config:set TOKEN_KEY=
git push heroku main
```

**Frontend Deployment (Example: Vercel)**

```bash
cd frontend
npm run build
vercel --prod
```

**Environment Setup**

Production environment variables:
- Set NODE_ENV to "production"
- Use production MongoDB instance
- Enable HTTPS
- Configure production CORS origins
- Set secure cookie flags
