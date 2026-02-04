import React from 'react';
import './Footer.css';

function Footer() {
    return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5  ">
          <div className="col ">
            <div className="row mt-2 ">
                <img src="media/images/logo.png" style={{ width: "50%" }} />
                <p className="mt-4 text-muted" style={{ fontSize: "14px" }}>
                &copy; 2010 - 2024, Tradesphere Broking Ltd. All rights reserved.
                </p>
            </div>
            <div className="row mt-3">
                <i className="fa-brands fa-facebook fa-lg me-3"></i>
                <i className="fa-brands fa-twitter fa-lg me-3"></i>
                <i className="fa-brands fa-youtube fa-lg me-3"></i>
                <i className="fa-brands fa-linkedin fa-lg me-3"></i>
                <i className="fa-brands fa-instagram fa-lg me-3"></i>
            </div>
          </div>
          <div className="col footer-links ">
            <p>Company</p>
            <a href="http://localhost:3002/about">About</a>
            <br />
            <a href="http://localhost:3002/products">Products</a>
            <br />
            <a href="http://localhost:3002/pricing">Pricing</a>
            <br />
            <a href="">Referral programme</a>
            <br />
            <a href="">Careers</a>
            <br />
            <a href="">Tradesphere.tech</a>
            <br />
            <a href="">Press & media</a>
            <br />
            <a href="">Tradesphere cares (CSR)</a>
            <br />
          </div>
          <div className="col footer-links">
            <p>Support</p>
            <a href="">Contact</a>
            <br />
            <a href="http://localhost:3002/support">Support portal</a>
            <br />
            <a href="">Z-Connect blog</a>
            <br />
            <a href="">List of charges</a>
            <br />
            <a href="">Downloads & resources</a>
            <br />
          </div>
          <div className="col footer-links">
            <p>Account</p>
            <a href="http://localhost:3001/signup">Open an account</a>
            <br />
            <a href="">Fund transfer</a>
            <br />
            <a href="">60 day challenge</a>
            <br />
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            Tradesphere Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Tradesphere Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Tradesphere Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Tradesphere Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@tradesphere.com, for DP related to dp@tradesphere.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Tradesphere and offering such services, please
            create a ticket here.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;