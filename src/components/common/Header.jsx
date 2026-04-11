import LogoImg from '../../assets/common/logo.png';
import { menuLists } from '../../assets/data/data';
import { Badges, CustomLink, CustomNavLink } from './CustomComponents';

import { IoCartOutline, IoHeartOutline, IoSearchOutline } from "react-icons/io5";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import CartModal from '../cart/CartModal';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    // close menu if clicked outside of menu button
    const closeMenuOutSide = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    // handle scrol with animation
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
        // if (window.scrollY > 0) {
        //     setIsScrolled(true);
        // } else {
        //     setIsScrolled(false);
        // }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeMenuOutSide);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', closeMenuOutSide);
            document.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // only want to show black box in home page menu
    const isHomePage = location.pathname === '/'

    return (
        <header
            className={`header px-12 py-3 z-20 relative ${isScrolled ? 'scrolled' : ''} ${isHomePage ? 'bg-white-100' : ''}`
            }
        >
            {isHomePage &&
                <div className={`lg:h-[88px] lg:absolute lg:top-0 lg:right-0 lg:w-1/3 lg:-z-10 ${isScrolled ? 'lg:bg-none' : 'lg:bg-black'}`}></div>
            }

            <nav className='p-4 flex justify-between items-center relative'>

                {/* header left */}
                <div className="flex items-center gap-14">
                    <NavLink to='/'>
                        <img
                            src={LogoImg}
                            alt="logoImg"
                            className="h-7"
                        />
                    </NavLink>

                    <div className="hidden lg:flex items-center justify-between gap-8">
                        {menuLists.map((menu) => (
                            <CustomNavLink
                                key={menu.id}
                                href={menu.path}
                            >
                                {menu.link}
                            </CustomNavLink>
                        ))}
                    </div>
                </div>

                {/* header right */}
                <div className="flex items-center gap-8 icons">
                    <div className="uppercase hidden lg:block text-inherit relative z-10">
                        <CustomLink
                            className={`${isScrolled || !isHomePage ? 'text-primary' : 'text-white'}`}
                        >
                            Login
                        </CustomLink>
                        <span
                            className={`${isScrolled || !isHomePage ? 'text-primary' : 'text-white'}`}
                        >
                            /
                        </span>
                        <CustomLink
                            className={`${isScrolled || !isHomePage ? 'text-primary' : 'text-white'}`}
                        >
                            Register
                        </CustomLink>
                    </div>

                    {/* right icons section */}
                    <div
                        className={`icon flex justify-center items-center gap-6 ${isScrolled || !isHomePage ? 'text-primary' : 'text-white'}`}
                    >
                        <IoSearchOutline size={23} />

                        {/* cart Modal */}
                        <CartModal />

                        {/* close button */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden flex w-10 h-10 justify-center items-center bg-black text-white focus:outline-none"
                        >
                            {isOpen
                                ? <AiOutlineClose size={24} />
                                : <AiOutlineMenu size={24} />
                            }
                        </button>
                    </div>
                </div>

                {/* responsive menu if below 768px */}
                <div
                    ref={menuRef}
                    onClick={toggleMenu}
                    className={`lg:flex lg:flex-col lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${isOpen ? 'open' : 'close'} `}
                >
                    {menuLists.map((menu) => (
                        <CustomNavLink
                            key={menu.id}
                            href={menu.path}
                            className='flex flex-col text-white'
                        >
                            {menu.link}
                        </CustomNavLink>
                    ))}
                </div>
            </nav>
        </header >
    )
}

export default Header

