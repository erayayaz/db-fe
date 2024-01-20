import React, {useEffect, useState} from 'react';
import './App.scss';
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import logo from "./img/logo.png";
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import About from "./components/AboutUs/About";
import Regions from "./components/Regions/Regions";
import Media from "./components/Media/Media";
import Vehicles from "./components/Vehicles/Vehicles";
import Contacts from "./components/Contact/Contact";
import Appointment from "./components/Appointment/Appointment";
import WhyUs from "./components/WhyUs/WhyUs";
import Memories from "./components/Memories/Memories";
import TravelRoutes from "./components/TravelRoutes/TravelRoutes";
import Payments from "./components/Payments/Payments";
import Footer from "./components/Footer/Footer";
import Facetime from "./components/Facetime/Facetime";
import Whatsapp from "./components/Whatsapp/Whatsapp";
import Reservation from "./components/Reservation/Reservation";
import Form from "./components/Form/Form";
import AdminPanel from "./Panel/AdminPanel/AdminPanel";
import Login from "./Panel/Login/Login";

function App() {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAboutVisible, setIsAboutVisible] = useState(true);
    const [isAdminPanel, setIsAdminPanel] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    useEffect(() => {
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
        });

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="app">
            {isMobile && !isAdminPanel ? (
                <>
                    <Link to="/" className="app-logo" onClick={toggleHome}>
                        <img src={logo} alt="DB Transfer"/>
                    </Link>
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
            {isAboutVisible && <Appointment searchButtonClicked={routeMenu}/>}
            {isAboutVisible && <WhyUs/>}
            {isAboutVisible && <Payments/>}
            {isAboutVisible && <TravelRoutes toggleRegions={routeMenu}/>}
            {isAboutVisible && <Memories/>}
            {isAboutVisible && <Footer menuButtonClicked={routeMenu}/>}
            {!isAdminPanel && <Facetime/>}
            {!isAdminPanel && <Whatsapp/>}
            <Routes>
                <Route path="/about-us" Component={About}/>
                <Route path="/regions" Component={Regions}/>
                <Route path="/media" Component={Media}/>
                <Route path="/vehicles" Component={() => <Vehicles reservationButtonClicked={toggleHome}/>}/>
                <Route path="/contacts" Component={Contacts}/>
                <Route path="/form" Component={Form}/>
                <Route path="/login" Component={() => <Login loginSuccess={loginSuccess}/>}/>
                <Route path="/admin" Component={() => <AdminPanel iconClicked={toggleHome}/>}/>
                <Route path="/reservation" Component={() => <Reservation reservationButtonClicked={routeMenu}/>}/>
            </Routes>
        </div>
    );
}

export default App;
