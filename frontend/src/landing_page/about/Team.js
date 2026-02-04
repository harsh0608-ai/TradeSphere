import React from 'react';

function Team() {
    return (
    <div className="container">
      <div className="row p-3 mt-5 mb-3 border-top">
        <h1 className="text-center mt-5 fs-3">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.1em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/harsh.jpg"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Harsh Shinde</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3 ">
          <p>
             Harsh founded Tradesphere as a learning-driven project to understand how
            modern trading platforms work, inspired by real-world brokerage systems and
            market workflows.
          </p>
          <p>
            The project focuses on backend architecture, secure authentication,
            and scalable API design while simulating essential trading features.
          </p>
          <p>He is currently a third-year engineering student, actively preparing for
            software development roles with a strong interest in backend and full stack
            development..</p>
          <p>
            Connect on <a href="https://github.com/harsh0608-ai">GitHub</a> / <a href="https://www.linkedin.com/in/harsh-shinde-06082005abc/">LinkedIn</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
