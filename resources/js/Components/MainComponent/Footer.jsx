import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div>
      <div className="overlay toggle-icon"></div>

      <a href="#" className="back-to-top">
        <i className="bx bxs-up-arrow-alt"></i>
      </a>

      <footer className="page-footer">
        <p className="mb-0">
          Copyright © {currentYear}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
