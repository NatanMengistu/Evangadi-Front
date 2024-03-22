// Layout.js

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/footer";

const Layout = ({ children, isLoggedIn, onLogout, onSignInClick }) => {
  return (
    <div className="layout-container">
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        onSignInClick={onSignInClick}
      />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;


