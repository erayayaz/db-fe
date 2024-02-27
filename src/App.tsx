import React, {useEffect, useState, lazy, Suspense} from 'react';
import './App.scss';
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import logo from "./img/logo.png";
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import About from "./components/AboutUs/About";
import Regions from "./components/Regions/Regions";
import Media from "./components/Media/Media";
import Vehicles from "./components/Vehicles/Vehicles";
import Appointment from "./components/Appointment/Appointment";
import WhyUs from "./components/WhyUs/WhyUs";
import TravelRoutes from "./components/TravelRoutes/TravelRoutes";
import Payments from "./components/Payments/Payments";
import Footer from "./components/Footer/Footer";
import Facetime from "./components/Facetime/Facetime";
import Whatsapp from "./components/Whatsapp/Whatsapp";
import Reservation from "./components/Reservation/Reservation";
//import Form from "./components/Form/Form";
import AdminPanel from "./Panel/AdminPanel/AdminPanel";
import Login from "./Panel/Login/Login";
import {useTranslation} from "react-i18next";
import Animation from "./components/Animation/Animation";

function App() {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAboutVisible, setIsAboutVisible] = useState(true);
    const [isAdminPanel, setIsAdminPanel] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const Form = lazy(() => import('./components/Form/Form'));

    const urls = [
        {url: "/regions"},
        {url: "/about-us"},
        {url: "/media"},
        {url: "/admin"},
        {url: "/vehicles"},
        {url: "/contacts"},
        {url: "/form"},
        {url: "/admin"},
        {url: "/reservation"},
        {url: "/login"},

    ];
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleUrl = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setIsAboutVisible(false);
    };

    const toggleHome = () => {
        navigate('/');
        setIsAdminPanel(false);
        setIsAboutVisible(true);
    }

    const toggleFromForm = () => {
        setShowAnimation(true);

        navigate('/');
        setIsAdminPanel(false);
        setIsAboutVisible(true);
    }

    const routeMenu = () => {
        setIsAboutVisible(false);
    }

    const loginSuccess = () => {
        navigate('/admin');
        setIsAdminPanel(true);
        setIsAboutVisible(false);
        setIsLoggedIn(true);
    }

    const routeAdminPanel = () => {
        setIsAdminPanel(true);
        setIsAboutVisible(false);
    }

    const routeWebsite = () => {
        setIsLoggedIn(false);
        setIsAdminPanel(false);
    }
    const location = useLocation();
    const navigate = useNavigate();
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    const handlePopState = () => {
        toggleHome();
    };

    useEffect(() => {
        handleLanguageChange('tr');
        const currentPath = location.pathname;
        urls.forEach((item) => {
                if (currentPath === item.url) {
                    if (currentPath === '/login' || currentPath === '/admin') {
                        if (isLoggedIn) {
                            navigate('/admin');
                        } else {
                            navigate('/login');
                        }

                        routeAdminPanel();
                    } else {
                        routeMenu();
                        routeWebsite();
                        navigate(item.url);
                    }
                }
            }
        );

        window.addEventListener('resize', handleResize);
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const {i18n} = useTranslation();
    const languages = [
        {id: 0, language: 'tr'},
        {id: 1, language: 'en'},
        {id: 2, language: 'ru'},
        {id: 3, language: 'ar'},
    ];
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('tr');
    const toggleLanguageDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handleLanguageChange = async (newLang: string) => {
        setSelectedLanguage(newLang);
        setDropdownVisible(false);
        await i18n.changeLanguage(newLang);
    };
    return (
        <div className="app">
            <Animation/>
            {showAnimation && <Animation/>}

            {isMobile && !isAdminPanel ? (
                <>
                    <Link to="/" className="app-logo" onClick={toggleHome}>
                        <img src={logo} alt="DB Transfer"/>
                    </Link>
                    <div className="language-dropdown">
                        <button onClick={toggleLanguageDropdown} className="language-button">
                            {selectedLanguage.toUpperCase()}
                        </button>

                        {dropdownVisible && (
                            <div className="dropdown-content">
                                {languages.map((lang) => lang.language !== selectedLanguage && (
                                    <button key={lang.id} onClick={() => handleLanguageChange(lang.language)}>
                                        {lang.language.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={toggleSidebar} className="sidebar-btn">
                        ☰
                    </button>
                    <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} menuButtonClicked={toggleUrl}/>
                </>
            ) : (
                <>
                    {!isAdminPanel && <Navbar iconClicked={toggleHome} menuButtonClicked={routeMenu}/>}
                </>
            )}

            {isAboutVisible && <Appointment searchButtonClicked={routeMenu} isMobile={isMobile}/>}
            {isAboutVisible && <WhyUs/>}
            {isAboutVisible && <TravelRoutes toggleRegions={routeMenu}/>}
            {isAboutVisible && <Payments/>}
            {isAboutVisible && <Footer menuButtonClicked={routeMenu}/>}
            {!isAdminPanel && <Facetime/>}
            {!isAdminPanel && <Whatsapp/>}

            <Routes>
                <Route path="/about-us" element={<About/>}/>
                <Route path="/regions" element={<Regions />}/>
                <Route path="/media" element={<Media/>}/>
                <Route path="/vehicles" element={<Vehicles reservationButtonClicked={toggleHome}/>}/>
                <Route path="/form" element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Form returnHome={toggleFromForm} />
                    </Suspense>
                }/>
                <Route path="/login" element={<Login loginSuccess={loginSuccess}/>}/>
                <Route path="/admin" element={<AdminPanel iconClicked={toggleHome}/>}/>
                <Route path="/reservation" element={<Reservation reservationButtonClicked={routeMenu}/>}/>
            </Routes>
        </div>
    );
}

export default App;
