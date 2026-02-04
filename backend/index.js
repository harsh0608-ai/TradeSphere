require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser=require('body-parser');         //For data parsing 
const cors=require('cors');                     //For cross origin resource sharing and secure networking
const cookieParser = require('cookie-parser');  //For cookie parsing

const {HoldingModel}=require('./model/HoldingModel');
const {PositionModel}=require('./model/PositionModel');
const {OrdersModel}=require('./model/OrdersModel');

const authRoute = require('./Routes/AuthRoute');
const { userVerification, extractUserId } = require('./Middlewares/AuthMiddleware');

const PORT = process.env.PORT || 3000;
const url=process.env.MONGO_URL;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

// app.get('/addHoldings', (req, res) => {
//     let tempHolding=[
//             {
//                 name: "BHARTIARTL",
//                 qty: 2,
//                 avg: 538.05,
//                 price: 541.15,
//                 net: "+0.58%",
//                 day: "+2.99%",
//             },
//             {
//                 name: "HDFCBANK",
//                 qty: 2,
//                 avg: 1383.4,
//                 price: 1522.35,
//                 net: "+10.04%",
//                 day: "+0.11%",
//             },
//             {
//                 name: "HINDUNILVR",
//                 qty: 1,
//                 avg: 2335.85,
//                 price: 2417.4,
//                 net: "+3.49%",
//                 day: "+0.21%",
//             },
//             {
//                 name: "INFY",
//                 qty: 1,
//                 avg: 1350.5,
//                 price: 1555.45,
//                 net: "+15.18%",
//                 day: "-1.60%",
//                 isLoss: true,
//             },
//             {
//                 name: "ITC",
//                 qty: 5,
//                 avg: 202.0,
//                 price: 207.9,
//                 net: "+2.92%",
//                 day: "+0.80%",
//             },
//             {
//                 name: "KPITTECH",
//                 qty: 5,
//                 avg: 250.3,
//                 price: 266.45,
//                 net: "+6.45%",
//                 day: "+3.54%",
//             },
//             {
//                 name: "M&M",
//                 qty: 2,
//                 avg: 809.9,
//                 price: 779.8,
//                 net: "-3.72%",
//                 day: "-0.01%",
//                 isLoss: true,
//             },
//             {
//                 name: "RELIANCE",
//                 qty: 1,
//                 avg: 2193.7,
//                 price: 2112.4,
//                 net: "-3.71%",
//                 day: "+1.44%",
//             },
//             {
//                 name: "SBIN",
//                 qty: 4,
//                 avg: 324.35,
//                 price: 430.2,
//                 net: "+32.63%",
//                 day: "-0.34%",
//                 isLoss: true,
//             },
//             {
//                 name: "SGBMAY29",
//                 qty: 2,
//                 avg: 4727.0,
//                 price: 4719.0,
//                 net: "-0.17%",
//                 day: "+0.15%",
//             },
//             {
//                 name: "TATAPOWER",
//                 qty: 5,
//                 avg: 104.2,
//                 price: 124.15,
//                 net: "+19.15%",
//                 day: "-0.24%",
//                 isLoss: true,
//             },
//             {
//                 name: "TCS",
//                 qty: 1,
//                 avg: 3041.7,
//                 price: 3194.8,
//                 net: "+5.03%",
//                 day: "-0.25%",
//                 isLoss: true,
//             },
//             {
//                 name: "WIPRO",
//                 qty: 4,
//                 avg: 489.3,
//                 price: 577.75,
//                 net: "+18.08%",
//                 day: "+0.32%",
//             },
//     ];
//     tempHolding.forEach( (item) => {
//         const newHolding=new HoldingModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         });
//         newHolding.save();
//     });
//     res.send('Holdings Added');
// });

// app.get('/addPositions', (req, res) => {
//     let temppositions = [
//         {
//             product: "CNC",
//             name: "EVEREADY",
//             qty: 2,
//             avg: 316.27,
//             price: 312.35,
//             net: "+0.58%",
//             day: "-1.24%",
//             isLoss: true,
//         },
//         {
//             product: "CNC",
//             name: "JUBLFOOD",
//             qty: 1,
//             avg: 3124.75,
//             price: 3082.65,
//             net: "+10.04%",
//             day: "-1.35%",
//             isLoss: true,
//         },
//     ];

//     temppositions.forEach((item) => {
//         const newPosition = new PositionModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         });
//         newPosition.save();
//     });
//     res.send('Positions Added');
// });

app.get('/allHoldings', extractUserId, async(req, res) => {
    try {
        let allHoldings = await HoldingModel.find({ userId: req.userId });
        res.json(allHoldings);
    } catch (error) {
        console.error("Error fetching holdings:", error);
        res.status(500).json({ message: 'Error fetching holdings', success: false });
    }
});

app.get('/allPositions', extractUserId, async (req, res) => {
    try {
        let allPositions = await PositionModel.find({ userId: req.userId });
        res.json(allPositions);
    } catch (error) {
        console.error("Error fetching positions:", error);
        res.status(500).json({ message: 'Error fetching positions', success: false });
    }
});

app.post('/newOrder', extractUserId, async(req, res) => {
    try {
        // Save the order with userId
        let newOrder = new OrdersModel({
            userId: req.userId,
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            mode: req.body.mode,
        });
        await newOrder.save();

        // If it's a BUY order, update holdings
        if (req.body.mode === "BUY") {
            const currentPrice = parseFloat(req.body.price);
            const buyQty = parseInt(req.body.qty);

            // Check if stock already exists in holdings for this user
            let existingHolding = await HoldingModel.findOne({ userId: req.userId, name: req.body.name });

            if (existingHolding) {
                // Update existing holding - recalculate average cost
                const totalQty = existingHolding.qty + buyQty;
                const totalCost = (existingHolding.avg * existingHolding.qty) + (currentPrice * buyQty);
                const newAvg = totalCost / totalQty;

                // Calculate net change percentage
                const netChange = ((currentPrice - newAvg) / newAvg) * 100;
                const dayChange = ((currentPrice - (existingHolding.openPrice || newAvg)) / (existingHolding.openPrice || newAvg)) * 100;
                const isLoss = netChange < 0;

                await HoldingModel.findByIdAndUpdate(existingHolding._id, {
                    qty: totalQty,
                    avg: newAvg,
                    price: currentPrice,
                    net: netChange.toFixed(2) + "%",
                    day: dayChange.toFixed(2) + "%",
                    isLoss: isLoss,
                    openPrice: existingHolding.openPrice || newAvg,
                });
            } else {
                // Create new holding for this user
                let newHolding = new HoldingModel({
                    userId: req.userId,
                    name: req.body.name,
                    qty: buyQty,
                    avg: currentPrice,
                    price: currentPrice,
                    net: "+0.00%",
                    day: "+0.00%",
                    isLoss: false,
                    openPrice: currentPrice,
                });
                await newHolding.save();
            }
        } 
        // If it's a SELL order, update holdings
        else if (req.body.mode === "SELL") {
            const sellPrice = parseFloat(req.body.price);
            const sellQty = parseInt(req.body.qty);

            // Check if stock exists in holdings for this user
            let existingHolding = await HoldingModel.findOne({ userId: req.userId, name: req.body.name });

            if (!existingHolding) {
                return res.status(400).json({ 
                    message: 'Stock not found in holdings', 
                    success: false 
                });
            }

            // Check if enough quantity to sell
            if (existingHolding.qty < sellQty) {
                return res.status(400).json({ 
                    message: `Insufficient quantity. You have ${existingHolding.qty} shares`, 
                    success: false 
                });
            }

            const remainingQty = existingHolding.qty - sellQty;

            if (remainingQty === 0) {
                // Delete holding if all shares are sold
                await HoldingModel.findByIdAndDelete(existingHolding._id);
            } else {
                // Update holding with remaining quantity
                const netChange = ((sellPrice - existingHolding.avg) / existingHolding.avg) * 100;
                const dayChange = ((sellPrice - (existingHolding.openPrice || existingHolding.avg)) / (existingHolding.openPrice || existingHolding.avg)) * 100;
                const isLoss = netChange < 0;

                await HoldingModel.findByIdAndUpdate(existingHolding._id, {
                    qty: remainingQty,
                    price: sellPrice,
                    net: netChange.toFixed(2) + "%",
                    day: dayChange.toFixed(2) + "%",
                    isLoss: isLoss,
                });
            }
        }

        res.json({ message: 'Order Placed and Holdings Updated', success: true });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: 'Error placing order', success: false });
    }
});

app.get('/allOrders', extractUserId, async (req, res) => {
    try {
        let allOrders = await OrdersModel.find({ userId: req.userId });
        res.json(allOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: 'Error fetching orders', success: false });
    }
});

app.get('/funds', extractUserId, async (req, res) => {
    try {
        // Fetch holdings for this user only
        let allHoldings = await HoldingModel.find({ userId: req.userId });
        
        // Calculate total investment (used margin)
        const usedMargin = allHoldings.reduce((sum, stock) => {
            return sum + (stock.avg * stock.qty);
        }, 0);

        // Default funds data
        const fundsData = {
            availableMargin: 100000.00 - usedMargin,
            usedMargin: usedMargin,
            availableCash: 100000.00 - usedMargin,
            openingBalance: 100000.00,
            closingBalance: 100000.00 - usedMargin,
            payin: 100000.00,
            span: 0.00,
            deliveryMargin: usedMargin,
            exposure: 0.00,
            optionsPremium: 0.00,
            collateralLiquid: 0.00,
            collateralEquity: 0.00,
            totalCollateral: 0.00,
        };

        res.json(fundsData);
    } catch (error) {
        console.error("Error fetching funds data:", error);
        res.status(500).json({ message: 'Error fetching funds data', success: false });
    }
});

// Authentication Routes
app.use("/", authRoute);

// User Verification Route
app.post("/verify", userVerification);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    mongoose.connect(url)
        .then(() => {
            console.log("Connected to MongoDB Successfully");
        })
        .catch((error) => {
            console.error("MongoDB Connection Failed:", error.message);
        });
});
