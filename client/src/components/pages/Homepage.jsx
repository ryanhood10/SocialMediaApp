import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/homepage.css';
import { FaSearch, FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg'

export default function Homepage() {
    return (
        <div className='homepageBody'>
            <nav className='sideNav'>
                <ul>
                    <li>
                    <Link to='/Search'>
                            <FaSearch className='searchIcon' />
                        </Link>
                    </li>
                    <li>
                    <Link to='/Homepage'>
                            <FaHome className='homeIcon' />
                        </Link>
                    </li>
                    <li>
                    <Link to='/Profile'>
                            <CgProfile className='profileIcon' />
                        </Link>
                    </li>
                </ul>
            </nav>

            <section className='homeMain'>

            </section>
        </div>
    );
}
