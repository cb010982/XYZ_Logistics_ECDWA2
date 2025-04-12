import React, { useState } from 'react';
import { 
    FaHome, 
    FaShoppingCart, 
    FaTable, 
    FaColumns, 
    FaUser, 
    FaSignInAlt, 
    FaUserPlus 
} from 'react-icons/fa';

// A reusable NavLink component that changes background on hover.
const NavLink = ({ children, style, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <a
            {...props}
            style={{
                ...style,
                backgroundColor: isHovered ? '#f4f7fe' : 'transparent',
                transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </a>
    );
};

const Sidebar = () => {
    return (
        <aside style={styles.sidebar}>
            <div style={styles.logoContainer}></div>
            <div style={styles.logoContainer}>
                <h2 style={{ ...styles.logoText, fontSize: '2rem' }}>XYZ</h2>
            </div>
            
            {/* Main Nav Links */}
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <NavLink 
                        href="#" 
                        style={{ 
                            ...styles.navLink, 
                            color: '#4318ff', 
                            padding: '0.5rem 1.5rem', 
                            fontSize: '1.05rem' 
                        }}
                    >
                        <FaHome style={styles.icon} />
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li style={styles.navItem}>
                    <NavLink 
                        href="#" 
                        style={{ 
                            ...styles.navLink, 
                            color: '#4318ff', 
                            padding: '0.5rem 1.5rem', 
                            fontSize: '1.05rem' 
                        }}
                    >
                        <FaShoppingCart style={styles.icon} />
                        <span>NFT Marketplace</span>
                    </NavLink>
                </li>
                <li style={styles.navItem}>
                    <NavLink 
                        href="#" 
                        style={{ 
                            ...styles.navLink, 
                            color: '#4318ff', 
                            padding: '0.5rem 1.5rem', 
                            fontSize: '1.05rem' 
                        }}
                    >
                        <FaTable style={styles.icon} />
                        <span>Tables</span>
                    </NavLink>
                </li>
                <li style={styles.navItem}>
                    <NavLink 
                        href="#" 
                        style={{ 
                            ...styles.navLink, 
                            color: '#4318ff', 
                            padding: '0.5rem 1.5rem', 
                            fontSize: '1.05rem' 
                        }}
                    >
                        <FaColumns style={styles.icon} />
                        <span>Kanban</span>
                    </NavLink>
                </li>
                <li style={styles.navItem}>
                    <NavLink 
                        href="#" 
                        style={{ 
                            ...styles.navLink, 
                            color: '#4318ff', 
                            padding: '0.5rem 1.5rem', 
                            fontSize: '1.05rem' 
                        }}
                    >
                        <FaUser style={styles.icon} />
                        <span>Profile</span>
                    </NavLink>
                </li>
            </ul>

            {/* Auth Links (Sign In / Sign Up) */}
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <NavLink 
                        href="#" 
                        style={{ 
                            ...styles.navLink, 
                            color: '#4318ff', 
                            padding: '0.5rem 1.5rem', 
                            fontSize: '1.05rem' 
                        }}
                    >
                        <FaSignInAlt style={styles.icon} />
                        <span>Sign In</span>
                    </NavLink>
                </li>
                <li style={styles.navItem}>
                    <NavLink 
                        href="#" 
                        style={{ 
                            ...styles.navLink, 
                            color: '#4318ff', 
                            padding: '0.5rem 1.5rem', 
                            fontSize: '1.05rem' 
                        }}
                    >
                        <FaUserPlus style={styles.icon} />
                        <span>Sign Up</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

const styles = {
  sidebar: {
    width: '300px',
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    padding: '1rem',
    boxSizing: 'border-box',
  },
  logoContainer: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  logoText: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#3B3F5C',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    margin: '1rem 0',
  },
  navItem: {
    marginBottom: '1rem',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    color: '#3B3F5C',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    marginRight: '-100px',   // Added property
    borderRadius: '10px',     // Added property
    height: '30px',           // Added property
  },
  icon: {
    marginRight: '0.75rem',
  },
};

export default Sidebar;
