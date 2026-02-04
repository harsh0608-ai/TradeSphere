import React from 'react';
import './Hero.css';

function Hero(){
    return(
        <div className="container">
            <div className="row p-5 mt-5 mb-5 border-bottom text-center">
                <h1 className='fs-2'>Pricing</h1>
                <h3 className="text-muted mt-3 fs-5">
                Free equity investments and flat ₹20 traday and F&O trades
                </h3>
            </div>
            <div className='Pricing mb-5'>
                <div>
                    <img src="media/images/pricingEquity.svg" style={{width:250}}/>
                    <h1 className="fs-3">Free equity delivery</h1>
                    <p className="text-muted">
                        All equity delivery investments (NSE, BSE),<br></br> are absolutely free — ₹
                        0 brokerage.
                    </p>
                </div>
                <div>
                    <img src="media/images/intradayTrades.svg" style={{width:250}} className='mt-5'/>
                    <h1 className="fs-3">Intraday and F&O trades</h1>
                    <p className="text-muted">
                        Flat Rs. 20 or 0.03% (whichever is lower) per<br></br> executed order on
                        intraday trades across<br></br> equity, currency, and commodity trades.Flat<br></br> ₹20 on all option trades.
                    </p>
                </div>
                <div>
                    <img src="media/images/pricingEquity.svg" style={{width:250}} className='mt-3'/>
                    <h1 className="fs-3">Free direct MF</h1>
                    <p className="text-muted ">
                        All direct mutual fund investments are absolutely free — ₹ 0
                        commissions & DP charges.
                    </p>
                </div>
            </div>
        </div>

        
    )
}   
export default Hero;