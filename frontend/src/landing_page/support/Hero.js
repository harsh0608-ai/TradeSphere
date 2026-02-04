import React from "react";
import './Hero.css';
function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5 " id="supportWrapper">
        <h3>Support Portal</h3>
        <a href="">Track Tickets</a>
      </div>
      <div className="row p-5">
        <div className="col-6 p-3  ">
          <h2 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h2>
          <input placeholder="Eg. how do I activate F&O" className="mt-4 mb-4" />
          <br />
          <a href="">Track account opening</a>&nbsp;&nbsp;
          <a href="">Track segment activation</a>&nbsp;&nbsp;
          <a href="">Intraday margins</a>&nbsp;&nbsp;<br></br>
          <a href="">Kite user manual</a>&nbsp;&nbsp;
        </div>
        <div className="col-6 p-3 ">
            <div className="col2">
                <h2 className="fs-3 mb-3 ">Featured</h2>
                <ol>
                    <li className="mb-3">
                    <a href="">Current Takeovers and Delisting - January 2024</a>
                    </li>
                    <li>
                    <a href="">Latest Intraday leverages - MIS & CO</a>
                    </li>
                </ol>
            </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;