import React from 'react';
import { Link } from 'react-router-dom';
import './AppFooter.scss';
import { FaFacebookSquare, FaYelp, FaTwitter } from 'react-icons/fa'

const AppFooter = () => {
  return (
    <div className="app-footer">
      <img className=".center" src="images/as_logo_blue_sm.png" alt="Auburn Solar Logo"/>
      <h3>Auburn, CA 95602</h3>
      <div className="footer-links">
        <Link className="grid-item" to="/">Home</Link>
        <Link className="grid-item grid-right" to="/">Projects</Link>
        <Link className="grid-item" to="/">Contact</Link>
        <Link className="grid-item grid-right" to="/">Services</Link>
        <Link className="grid-item" to="/">About</Link>
      </div>
      <div className="footer-socials">
        <a href="https://www.facebook.com/auburnsolar.biz">
          <FaFacebookSquare />
        </a>
        <a href="https://www.yelp.com/biz/auburn-solar-auburn-2">
          <FaYelp />
        </a>
        <a href="https://twitter.com/auburnsol">
          <FaTwitter />
        </a>
        <a href="https://www.bbb.org/us/ca/auburn/profile/solar-energy-contractors/auburn-solar-1156-90018456">
          <img src="images/bbb.png" alt="bbb-icon"/>
        </a>
      </div>
      <h3>© 2020 by Auburn Solar</h3>
    </div>
  )
}

export default AppFooter