import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../common/Title';
import { breakpoints, defaultTheme } from '../../styles/themes/default';
import ProductListUser from '../product/ProductListUser';

const NavMenuWrapper = styled.nav`
  margin-top: 32px;

  .nav-menu-list {
    row-gap: 8px;

    @media (max-width: ${breakpoints.md}) {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
  }

  .nav-menu-item {
    border-radius: 4px;

    @media (max-width: ${breakpoints.sm}) {
      flex: 1 1 0;
    }
  }

  .nav-menu-link {
    padding-left: 36px;
    width: 100%;
    height: 40px;
    column-gap: 12px;
    border: 1px solid transparent;

    &:hover {
      background-color: ${defaultTheme.color_whitesmoke};
    }

    .nav-link-text {
      color: ${defaultTheme.color_gray};
    }

    &.active {
      border-left: 2px solid ${defaultTheme.color_gray};
      background-color: ${defaultTheme.color_whitesmoke};

      @media (max-width: ${breakpoints.md}) {
        border-bottom: 2px solid ${defaultTheme.color_gray};
        border-left: 0;
        background-color: transparent;
      }
    }

    @media (max-width: ${breakpoints.md}) {
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (max-width: ${breakpoints.sm}) {
      padding-left: 8px;
      padding-right: 8px;
      column-gap: 8px;
    }
  }
`;

const UserMenu = () => {
  const location = useLocation();
  const [userDetail, setUserDetail] = useState({ username: '' });

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.post(`/api/v1/users/FindUser`, {}, {
          withCredentials: true,
        });
        setUserDetail(response.data.data);
      } catch (error) {
        //console.log(error);
        alert('Please try again later!');
      }
    };

    fetchUserDetail();
  }, []);

  return (
    <div>
      <Title titleText={userDetail.username} />
      <p className="text-base font-light italic">Welcome to your account</p>

      <NavMenuWrapper>
        <ul className="nav-menu-list grid">
          <li className="nav-menu-item"></li>
          <li className="nav-menu-item">
            <Link
              to="/wishlist"
              className={`nav-menu-link flex items-center ${
                location.pathname === "/wishlist" ||
                location.pathname === "/empty_wishlist"
                  ? "active"
                  : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <i className="bi bi-heart"></i>
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Wishlist
              </span>
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link
              to="/NewProduct"
              className={`nav-menu-link flex items-center ${
                location.pathname === "/NewProduct" ? "active" : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <i className="bi bi-box-seam"></i>
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Create Ad
              </span>
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/" className={`nav-menu-link flex items-center`}>
              <span className="nav-link-icon flex items-center justify-center">
                <i className="bi bi-box-arrow-right"></i>
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Sign out
              </span>
            </Link>
          </li>
        </ul>
      </NavMenuWrapper>

      {location.pathname === '/userProduct' && (
        <div>
          <h2>Your Ads</h2>
          <ProductListUser />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
