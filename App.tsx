import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// --- Shared Components ---

const Button = ({ children, onClick, className = "", variant = "primary", fullWidth = true }: any) => {
    const baseStyle = "font-display font-bold rounded-xl py-4 px-6 transition-all active:scale-[0.98] flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-red-600",
        secondary: "bg-gray-100 dark:bg-surface-dark text-gray-900 dark:text-white border border-transparent hover:border-gray-200",
        outline: "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-transparent",
        ghost: "bg-transparent text-primary hover:bg-primary/5"
    };

    return (
        <button 
            onClick={onClick} 
            className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {children}
        </button>
    );
};

const Input = ({ label, type = "text", placeholder, icon }: any) => (
    <div className="group relative">
        {label && <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 pl-1">{label}</label>}
        <div className="relative">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
            )}
            <input 
                type={type}
                className={`block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-surface-dark py-4 ${icon ? 'pl-11' : 'pl-4'} pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all duration-200 shadow-sm outline-none`}
                placeholder={placeholder}
            />
        </div>
    </div>
);

const BottomNav = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/home', icon: 'home', label: 'Home' },
        { path: '/library', icon: 'library_music', label: 'Songs' }, // Using Library as Songs for now
        { path: '/artists', icon: 'mic_external_on', label: 'Artists' },
        { path: '/profile', icon: 'person', label: 'Profile' },
    ];

    if (['/', '/signin', '/signup', '/forgot-password', '/check-email', '/onboarding-library', '/onboarding-transpose'].includes(location.pathname)) return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-6 flex justify-between items-center z-50 max-w-md mx-auto">
            {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1 group w-16">
                    <div className="relative">
                        <span className={`material-symbols-outlined text-2xl transition-colors ${isActive(item.path) ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500'}`}>
                            {item.icon}
                        </span>
                        {isActive(item.path) && <span className="absolute -top-1 -right-1 size-2 bg-primary rounded-full ring-2 ring-white dark:ring-surface-dark"></span>}
                    </div>
                    <span className={`text-[10px] font-medium transition-colors ${isActive(item.path) ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-400 dark:text-gray-500'}`}>
                        {item.label}
                    </span>
                </Link>
            ))}
        </nav>
    );
};

const Header = ({ title, backTo, rightElement }: { title: string, backTo?: string, rightElement?: React.ReactNode }) => {
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 z-30 w-full px-5 py-4 flex items-center justify-between bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            {backTo ? (
                <button onClick={() => navigate(backTo)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-gray-900 dark:text-white">arrow_back_ios_new</span>
                </button>
            ) : <div className="size-10" />}
            
            <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white flex-1 text-center truncate px-2">
                {title}
            </h1>
            
            <div className="size-10 flex items-center justify-center">
                {rightElement}
            </div>
        </header>
    );
};

// --- Screens ---

const OnboardingWelcome = () => {
    const navigate = useNavigate();
    return (
        <div className="relative h-screen w-full overflow-hidden flex flex-col bg-black">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-60" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3P_2BpsRo12qNKW_NFnqoCkCODsUJnV5Nc_R9SyaqqfxR2K9I-Qgrb3NhHDyv5WIu9BF8a5xJBNiPdfy0HCpk7DB5D5v1qqwS3uQNjkCJ4wTdYHMuDYAUHKXuYVIF0oo_rkU04lFKyVtPK06G0eM-xrjTD0vfJ5nVBiOW4zWO89znQeYW3eQIZGywjY8d_bkPjZcFHeZ63OLKY2njr-sIK8i2sFVbl1Nx3kaWVNG5TtjljXSXoJ3zM5U21cKSw64b8NZhp7GoYAfS')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-12">
                <div className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-primary text-4xl">music_note</span>
                    <span className="text-white text-2xl font-extrabold tracking-tight">PhinAccords</span>
                </div>
                
                <div className="flex-grow"></div>
                
                <div className="flex flex-col items-center text-center space-y-4 mb-8">
                    <h1 className="text-white text-4xl font-extrabold leading-tight">
                        Become a Piano <br/>Worshiper
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Play the right chords at the right time and focus fully on worship.
                    </p>
                </div>

                <div className="flex w-full justify-center gap-3 py-6">
                    <div className="h-1.5 w-8 rounded-full bg-primary"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-white/30"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-white/30"></div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <Button onClick={() => navigate('/onboarding-library')}>Get Started</Button>
                    <button onClick={() => navigate('/signin')} className="text-white/80 font-medium py-2 hover:text-white transition-colors">
                        Already have an account? <span className="font-bold text-white">Sign In</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const OnboardingLibrary = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
            <div className="flex justify-end p-6">
                <button onClick={() => navigate('/home')} className="text-primary font-bold uppercase text-sm tracking-wider">Skip</button>
            </div>
            
            <div className="flex-1 px-6 flex flex-col items-center justify-center">
                <div className="w-full max-w-xs aspect-[4/5] bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-4 relative mb-12">
                     {/* Decorative Elements simulating chords */}
                     <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-4">
                        <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <span className="material-symbols-outlined text-primary">favorite</span>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="aspect-square bg-primary/5 rounded-lg border border-primary/10 flex flex-col items-center justify-center">
                            <span className="text-primary font-bold text-xl">Ab2</span>
                            <span className="text-[10px] uppercase text-primary/60">Gospel</span>
                        </div>
                        <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                             <span className="text-gray-400 font-bold text-lg">Db/F</span>
                        </div>
                        <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                             <span className="text-gray-400 font-bold text-lg">Gb</span>
                        </div>
                        <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                             <span className="text-gray-400 font-bold text-lg">Eb11</span>
                        </div>
                     </div>
                </div>

                <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
                    All Your Chords <br/><span className="text-primary">in One Place</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-center px-4">
                    Access organized chords for all your favorite worship songs instantly.
                </p>
            </div>

            <div className="p-6 pb-12 flex flex-col gap-6">
                <div className="flex w-full justify-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-1.5 w-8 rounded-full bg-primary"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <Button onClick={() => navigate('/onboarding-transpose')}>
                    Next <span className="material-symbols-outlined">arrow_forward</span>
                </Button>
            </div>
        </div>
    );
};

const OnboardingTranspose = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
            <div className="flex justify-start p-6">
                <button onClick={() => navigate('/onboarding-library')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
            </div>
            
            <div className="flex-1 px-6 flex flex-col items-center justify-center">
                 <div className="relative mb-12">
                     <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                     <div className="relative flex items-center gap-6 z-10">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-20 h-20 bg-white dark:bg-surface-dark rounded-2xl shadow-sm flex items-center justify-center border border-gray-100 dark:border-gray-700">
                                <span className="text-3xl font-extrabold text-gray-300">C</span>
                            </div>
                            <span className="text-xs font-bold uppercase text-gray-400">Original</span>
                        </div>
                        <span className="material-symbols-outlined text-primary text-4xl">trending_flat</span>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 bg-white dark:bg-surface-dark rounded-2xl shadow-xl flex items-center justify-center border-2 border-primary">
                                <span className="text-4xl font-extrabold text-primary">Eb</span>
                            </div>
                            <span className="text-xs font-bold uppercase text-primary">Target</span>
                        </div>
                     </div>
                 </div>

                <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
                    Transpose with Ease
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-center px-4">
                    Instantly change song keys to fit your vocal range or the choir.
                </p>
            </div>

            <div className="p-6 pb-12 flex flex-col gap-6">
                <div className="flex w-full justify-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-1.5 w-8 rounded-full bg-primary"></div>
                </div>
                <Button onClick={() => navigate('/home')}>Start Playing</Button>
            </div>
        </div>
    );
};

const SignIn = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center px-6 py-12">
             <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8 text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white dark:bg-surface-dark shadow-sm mb-6">
                     <span className="material-symbols-outlined text-4xl text-primary">piano</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Sign in to continue your lessons</p>
             </div>

             <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
                 <Input label="Email Address" type="email" placeholder="pianist@example.com" icon="mail" />
                 <div>
                    <Input label="Password" type="password" placeholder="Enter your password" icon="lock" />
                    <div className="flex justify-end mt-2">
                        <Link to="/forgot-password" class="text-sm font-bold text-gray-500 hover:text-primary transition-colors">Forgot Password?</Link>
                    </div>
                 </div>
                 
                 <Button onClick={() => navigate('/home')}>
                    Sign In <span className="material-symbols-outlined">arrow_forward</span>
                 </Button>

                 <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
                    <div className="relative flex justify-center"><span className="bg-background-light dark:bg-background-dark px-4 text-xs font-semibold uppercase text-gray-400">OR</span></div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <span className="material-icons">play_arrow</span> Google
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <span className="material-icons">apple</span> Apple
                    </button>
                 </div>

                 <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    Don't have an account? <Link to="/signup" className="font-bold text-primary hover:underline">Sign Up</Link>
                 </p>
             </div>
        </div>
    );
};

const SignUp = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center px-6 py-12">
             <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                     <span className="material-symbols-outlined text-3xl">person_add</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Create Account</h2>
             </div>

             <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm space-y-5">
                 <Input label="Full Name" placeholder="Enter your full name" icon="person" />
                 <Input label="Email Address" type="email" placeholder="name@example.com" icon="mail" />
                 <Input label="Password" type="password" placeholder="Create a password" icon="lock" />
                 
                 <div className="flex items-start">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <label className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                        I agree to the <a href="#" className="font-semibold text-primary">Terms</a> and <a href="#" className="font-semibold text-primary">Privacy Policy</a>
                    </label>
                 </div>

                 <Button onClick={() => navigate('/home')}>Create Account</Button>

                 <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
                    Already have an account? <Link to="/signin" className="font-bold text-primary hover:underline">Sign In</Link>
                 </p>
             </div>
        </div>
    );
};

const ForgotPassword = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col px-6 py-8">
            <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
                <div className="mb-8 p-6 bg-white dark:bg-surface-dark rounded-full shadow-lg shadow-primary/5">
                    <span className="material-symbols-outlined text-4xl text-primary">lock_reset</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h1>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
                    Enter your email address and we will send you a link to reset your password.
                </p>
                
                <div className="w-full space-y-6">
                    <Input label="Email Address" type="email" placeholder="name@example.com" icon="mail" />
                    <Button onClick={() => navigate('/check-email')}>Send Reset Link</Button>
                </div>
            </div>
            <div className="text-center">
                <Link to="/signin" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary font-semibold">
                    <span className="material-symbols-outlined">arrow_back</span> Back to Sign In
                </Link>
            </div>
        </div>
    );
};

const CheckEmail = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col px-6 py-8">
            <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative w-32 h-32 bg-white dark:bg-surface-dark rounded-full shadow-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-primary">mark_email_unread</span>
                        <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-2 border-4 border-white dark:border-surface-dark">
                            <span className="material-symbols-outlined text-base font-bold">check</span>
                        </div>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Check Your Email</h1>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-10 px-4">
                    We've sent a password reset link to your email address.
                </p>
                <Button onClick={() => alert("Opening Email App...")}>Open Email App</Button>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Didn't receive the email? <button className="text-primary font-bold hover:underline">Resend</button>
                    </p>
                </div>
            </div>
            <div className="text-center">
                <Link to="/signin" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary font-semibold">
                    <span className="material-symbols-outlined">arrow_back</span> Back to Sign In
                </Link>
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div className="pb-24 bg-background-light dark:bg-background-dark min-h-screen">
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">menu</span>
                    <span className="text-xl font-bold text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined filled">play_circle</span> StreamMusic
                    </span>
                </div>
                <div className="flex gap-3 text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined">search</span>
                    <span className="material-symbols-outlined">account_circle</span>
                </div>
            </header>

            <div className="p-4 space-y-6 max-w-md mx-auto">
                {/* Hero */}
                <div className="relative h-56 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAppXx-wXD4SM7aouDpWicBQJjW4vUgVuOCXvw95kC1wNrayBeZYplLJurjRenu03F0LQuwfJI2uRq9W5MmwFoNUijRxk0ryoWwJGVlKe9He6jLhF3TEtV_fLReK3dMuIMswHmr62ua35H4cYgyQzizGmp0S78-zEq5r3Xd_NHPGGj62YFnn778HRqWwETICVC_MxH8JqID18uY9JYUxKmc57AsPaVKm2QO-q9OXivj8VjZOZZh0ycfn1EFJ3cqzXgclWMi8KvcbpFZ" className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-700" alt="Piano" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                        <h2 className="text-white text-2xl font-bold leading-tight mb-2">Service is a worship with <span className="text-primary">Your Piano</span></h2>
                        <button className="bg-primary hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center w-max gap-1">
                            <span className="material-symbols-outlined text-sm">play_arrow</span> Start Playing
                        </button>
                    </div>
                </div>

                {/* Search & Tags */}
                <div className="relative">
                    <input type="text" placeholder="Search songs..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-surface-dark border-none shadow-sm text-sm focus:ring-2 focus:ring-primary placeholder-gray-400" />
                    <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">search</span>
                </div>
                
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                    {['All', 'Gospel', 'Live', 'Songs', 'Artists'].map((tag, i) => (
                        <button key={tag} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-gray-900 dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}>
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Featured */}
                <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPGC_HfMVGNXVDTJHtRye9bQW1kDcJ4JGAaFeXVW5gNQEx-p-JeLkAEH8W8x7tnA0QBz4u9Sw94I-Y2jZjYJuLtwZtTSFcfcD2yxyVDvove8Lb85FrZZt6SqD1AMeAOt2On4o488HunjOJuB5Tv552rNMh07eeDP1h5ICsNMpVrrqjFUQhnCwZdiRq0mFuMcEKRhlGrFHiqsbVFgq6Z05CyWaT0eC0yjHhnbrl5iZ9_63lnOTKa_KDbiOOfor105tYkTISziAbfoxR" className="w-10 h-10 rounded-full object-cover ring-2 ring-primary ring-offset-2" alt="Artist" />
                        <div>
                            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Featured: The Worship Project</h3>
                            <p className="text-xs text-gray-500">Contemporary Christian Music</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        Discover the powerful new album taking the charts by storm. Immersive faith, hope, and love.
                    </p>
                </div>

                {/* Song List */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Songs</h2>
                        <Link to="/library" className="text-primary text-sm font-bold">See all</Link>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { title: "JESUS EST ROI", artist: "Bethel Friends", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9_oLgBimhATAeV1Wq9qKwqabS_JEMhQza75XkCRP5uXwSqoB2xI-on7Jvovsk5F-OSC_zR7HNa-SoCKz2VFaX-N0x8dIfNy0jZ_tVa-ZKl9PRKAOCBe8HyDqwgbyPHcKuBM8RwsrlBdne3h7GBH13WpNQadqGO1N-GmjF10Lf3hPrfjz99ZQb3B3k4Kyzx-7pHFdmJ2vIEnPvHHYnzUsc3PFHB2bY3uh6NRmzDASsO6aPZaVw3i3189RmCNpdyI0i2pHaD4B0IvFz", dur: "05:32" },
                            { title: "Royal Priesthood", artist: "Kingdom Sounds", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzMigUBtb1uWoxc93xM2y6Vyh4u2sR6scYKAzRldLOFcw4y2szxw99xsa0cvMdOs2h5ZIFWMil825xB2BMtzhAlNR470HvHPxtbmHuGgM9t3k_GDfM9nnkzdmsBlwgd08lRFpue-gq-Q38rfOVf7F6zqSSBfeag2kcn6A4ROGtfFQx8TKHBDgwocTGFBy_eBqBP_JWRqZ7kNfrBU6nii4dsN817jHxGk8FpOps6DsBLXrZ2Th9GFVxXK8zCyYPDXuAz7_TL_xf3UsD", dur: "03:45" }
                        ].map((song, i) => (
                            <Link to="/practice" key={i} className="block group bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                                <div className="relative h-40">
                                    <img src={song.img} className="w-full h-full object-cover" alt="Song" />
                                    <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded flex gap-1 items-center"><span className="material-symbols-outlined text-[10px]">music_note</span> SONG</div>
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{song.dur}</div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                        <div className="bg-primary/90 p-3 rounded-full shadow-lg transform active:scale-95 transition-transform"><span className="material-symbols-outlined text-white text-3xl">play_arrow</span></div>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-gray-900 dark:text-white truncate">{song.title}</h3>
                                    <p className="text-xs text-gray-500">{song.artist}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Library = () => {
    // This doubles as the "Unlocked Songs" or "Liked Songs" view based on props, simply hardcoded for demo
    const navigate = useNavigate();
    return (
        <div className="pb-24 bg-background-light dark:bg-background-dark min-h-screen">
            <Header title="Unlocked Songs" />
            <div className="p-4 max-w-md mx-auto space-y-6">
                <div className="text-center py-2">
                     <p className="text-sm text-gray-500">Songs you have full access to for practice</p>
                </div>
                {[
                    { title: "AWESOME GOD", artist: "Michael W. Smith", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5NwjDMGfwhbOePYK4Geu1CGHb5UKUYWOMoDpdNI7ScJ9sHZWSumaYNrxWgVo-tAGxoy4kjT7l-RXmHrzjV2RYRTWW8K6AEKjcXItuo8uNddCZWwSiLliZCUyktOYfDaIZNoiS15GrT2TG2iI493guwn7QAEYb7Ha6Xv1Jo42ToTyVNykN-95ae_Hw3c34VXGtJ1u8wHQQGOLrRgFHIo3rEdH4Y6kNZd11A6D4GILcb1n4ohNIunBfPsgeh2gp2sFVxD7VOPLCWHOw", dur: "4:52" },
                    { title: "In extremis Alleluia", artist: "Dena Mwana", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTh_kD2e2kU9aJUzg9cWXxtqZhQ41Gw3KRGheOhcL_B70FWvbrF13YF657AKCzZvw00VaXv-2YUTdqF_fPvQbq5ouTGBYWzxg0ZEe7uuQa2WB4KOTzBzvPRovWQvHO00kmnYT7NBiGAkEujNrxJPNCGMdZiRCE85l2MZLtsCaaM_BHWdQu-wqzADP-AlqNOxAnpL_XvqC3yf6vUbXSti06aP-WR_B6vxapt3tcpV_cAIjh56Opir5EsXSY4hv3ngjSgx5QpfClHPhy", dur: "10:09", extra: "73 BPM" },
                    { title: "Way Maker", artist: "Sinach", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXtRIKovR1oam0Wp9dUWhakfi8x_D8HLBOkiJv5ez3t7wQogMo5y15oE54vri7G2XVU9_lFM7eTkUpDos5R3AGWbgu9GCB3IGgyVRNGfVBbV7PUwXb3baw6-eeS7Adnn3GRGFTPOk1R42BOIZdRbjQia1yiI7q0JHjDcK0tlzz4_tsWrHMvYHPENDyL_vgkl1LlyNrhOiJ8VGikt_GHa2IdAV__IJDs5JKuxjn601sev7itIUEfkDrkAq3LrzWpT9vozMZn03d5v0i", dur: "6:15" }
                ].map((song, i) => (
                    <div key={i} className="flex flex-col gap-2 group">
                        <div className="relative rounded-xl overflow-hidden aspect-video shadow-sm">
                            <img src={song.img} className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500" alt={song.title} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="size-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                    <span className="material-symbols-outlined text-red-500 text-3xl filled">favorite</span>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 rounded">{song.dur}</div>
                            {song.extra && <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">speed</span> {song.extra}</div>}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{song.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{song.artist}</p>
                            <Button fullWidth onClick={() => navigate('/practice')}><span className="material-symbols-outlined">play_circle</span> Practice</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Player = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
            <header className="px-4 py-3 flex items-center justify-between">
                <Link to="/home"><span className="material-symbols-outlined text-gray-700 dark:text-gray-300">expand_more</span></Link>
                <div className="text-primary font-black italic text-2xl tracking-tighter">PhinAccords.</div>
                <div className="flex items-center gap-4">
                     <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">search</span>
                     <span className="material-symbols-outlined text-gray-700 dark:text-gray-300 filled text-2xl">account_circle</span>
                </div>
            </header>

            <main className="flex-1 max-w-md mx-auto w-full px-4 pb-12 overflow-y-auto hide-scrollbar">
                <div className="mt-2 mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yahweh Sabaoth</h1>
                    <p className="text-gray-500">Nathaniel Bassey</p>
                </div>

                {/* Controls Card */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 mb-4">
                    {/* Progress */}
                    <div className="mb-4">
                        <div className="relative w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div className="absolute h-full w-[35%] bg-primary rounded-full"></div>
                            <div className="absolute left-[35%] top-1/2 -translate-y-1/2 size-3 bg-primary border-2 border-white rounded-full shadow-sm"></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-medium text-gray-400">
                            <span>4:18</span>
                            <span>11:40</span>
                        </div>
                    </div>

                    {/* Play Buttons */}
                    <div className="flex items-center justify-center gap-8 mb-6">
                        <span className="material-symbols-outlined text-4xl text-gray-800 dark:text-white cursor-pointer">skip_previous</span>
                        <button className="size-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform">
                             <span className="material-symbols-outlined text-4xl filled">play_arrow</span>
                        </button>
                        <span className="material-symbols-outlined text-4xl text-gray-800 dark:text-white cursor-pointer">skip_next</span>
                    </div>

                    {/* Tools */}
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1 bg-gray-50 dark:bg-black/20 rounded-lg p-2 flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Transpose D</span>
                            <span className="material-symbols-outlined text-gray-400 text-lg">tune</span>
                        </div>
                        <div className="flex-[1.5] bg-gray-50 dark:bg-black/20 rounded-lg p-1 flex items-center justify-between">
                            <button className="size-8 flex items-center justify-center bg-white dark:bg-surface-dark rounded shadow-sm text-gray-500">-</button>
                            <span className="text-xs font-bold text-gray-800 dark:text-white">126 BPM</span>
                            <button className="size-8 flex items-center justify-center bg-white dark:bg-surface-dark rounded shadow-sm text-gray-500">+</button>
                        </div>
                    </div>
                     {/* Volume */}
                     <div className="bg-gray-50 dark:bg-black/20 rounded-lg p-2 flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400">volume_up</span>
                        <input type="range" className="flex-1 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                     </div>
                </div>

                {/* Chords Horizontal Scroll */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 mb-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Chords</h3>
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 items-center">
                        {['A#', 'C', 'Dm', 'A#', 'C', 'Dm'].map((chord, i) => (
                             <div key={i} className={`flex-shrink-0 size-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm transition-transform ${i === 3 ? 'bg-primary text-white scale-110 shadow-md' : 'bg-gray-50 dark:bg-black/20 text-gray-700 dark:text-white'}`}>
                                {chord}
                             </div>
                        ))}
                    </div>
                </div>

                {/* Piano Roll */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex justify-center mb-2"><span className="text-xs font-bold text-gray-400 uppercase">Current</span></div>
                    <div className="relative h-44 border border-gray-200 dark:border-gray-700 rounded-lg bg-white overflow-hidden select-none">
                         {/* Simple visual representation of piano keys using grid */}
                         <div className="flex h-full">
                            {['G','A','B','C','D','E','F'].map((note, i) => (
                                <div key={i} className="flex-1 piano-key-white flex items-end justify-center pb-2">
                                    <span className={`text-xs font-bold z-20 ${note === 'D' || note === 'F' ? 'text-white' : 'text-gray-500'}`}>{note}</span>
                                    {note === 'D' && <div className="absolute bottom-0 w-full h-[60%] bg-primary rounded-b opacity-90 z-10"></div>}
                                    {note === 'F' && <div className="absolute bottom-0 w-full h-[85%] bg-primary rounded-b opacity-90 z-10"></div>}
                                    {['G','A','C','D','F'].includes(note) && (
                                        <div className="piano-key-black">
                                            {note === 'A' && (
                                                <div className="w-full h-full bg-red-900 rounded-b relative overflow-hidden flex flex-col justify-end items-center pb-1">
                                                     <div className="absolute inset-0 bg-primary opacity-80"></div>
                                                     <span className="text-[10px] text-white font-bold z-10 relative">A#</span>
                                                     <div className="size-1.5 bg-red-300 rounded-full z-10 mb-1"></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                         </div>
                    </div>
                    <div className="text-center mt-2 font-bold text-gray-900 dark:text-white">A#</div>
                </div>
            </main>
        </div>
    );
};

const Profile = () => {
    const navigate = useNavigate();
    return (
        <div className="pb-24 bg-background-light dark:bg-background-dark min-h-screen">
             <header className="px-4 py-3 flex items-center justify-between bg-white dark:bg-surface-dark shadow-sm">
                <div className="flex items-center gap-2 text-primary font-bold text-xl"><span className="material-symbols-outlined">music_note</span> PhinAccords</div>
                <div className="font-bold text-gray-900 dark:text-white">Profile</div>
             </header>

             <main className="px-4 py-8 max-w-md mx-auto">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPGC_HfMVGNXVDTJHtRye9bQW1kDcJ4JGAaFeXVW5gNQEx-p-JeLkAEH8W8x7tnA0QBz4u9Sw94I-Y2jZjYJuLtwZtTSFcfcD2yxyVDvove8Lb85FrZZt6SqD1AMeAOt2On4o488HunjOJuB5Tv552rNMh07eeDP1h5ICsNMpVrrqjFUQhnCwZdiRq0mFuMcEKRhlGrFHiqsbVFgq6Z05CyWaT0eC0yjHhnbrl5iZ9_63lnOTKa_KDbiOOfor105tYkTISziAbfoxR" className="size-24 rounded-full object-cover border-4 border-white dark:border-surface-dark shadow-md" alt="Profile" />
                        <div className="absolute bottom-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white dark:border-surface-dark">PRO</div>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">Sarah Jenkins</h2>
                    <p className="text-sm text-gray-500">sarah.j@example.com</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">You</h3>
                        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            {[
                                { icon: 'history', label: 'History', to: '/library' },
                                { icon: 'lock_open', label: 'Unlocked Songs', to: '/library' },
                                { icon: 'favorite', label: 'Liked Songs', to: '/library' },
                                { icon: 'queue_music', label: 'Request Song', to: '/request' },
                            ].map((item, i) => (
                                <Link to={item.to} key={i} className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-black/20">
                                    <div className="flex items-center gap-4">
                                        <div className="size-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-lg">{item.icon}</span></div>
                                        <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Settings</h3>
                        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                             <Link to="/settings/account" className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-black/20">
                                <div className="flex items-center gap-4">
                                    <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500"><span className="material-symbols-outlined text-lg">person</span></div>
                                    <span className="font-medium text-gray-900 dark:text-white">Account</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                            </Link>
                            <Link to="/settings/subscription" className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-black/20">
                                <div className="flex items-center gap-4">
                                    <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500"><span className="material-symbols-outlined text-lg">credit_card</span></div>
                                    <span className="font-medium text-gray-900 dark:text-white">Manage Subscription</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                            </Link>
                            <Link to="/settings/notifications" className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-black/20">
                                <div className="flex items-center gap-4">
                                    <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500"><span className="material-symbols-outlined text-lg">notifications</span></div>
                                    <span className="font-medium text-gray-900 dark:text-white">Notifications</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                            </Link>
                            <Link to="/settings/language" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-black/20">
                                <div className="flex items-center gap-4">
                                    <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500"><span className="material-symbols-outlined text-lg">language</span></div>
                                    <span className="font-medium text-gray-900 dark:text-white">Language</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400">English</span>
                                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    <button onClick={() => navigate('/')} className="w-full py-3 text-primary font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
                        Log Out
                    </button>
                </div>
             </main>
        </div>
    );
};

const RequestSong = () => {
    return (
        <div className="pb-24 bg-background-light dark:bg-background-dark min-h-screen">
             <Header title="Request a Song" backTo="/profile" />
             <div className="px-6 py-6 max-w-md mx-auto flex flex-col h-full">
                <div className="mb-8">
                    <p className="text-gray-600 dark:text-gray-300">Can't find a song? Tell us which one you'd like to see added next.</p>
                </div>
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <div className="flex justify-between items-baseline mb-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">Song Title</label>
                            <span className="text-[10px] font-bold text-yellow-600 uppercase">Required</span>
                        </div>
                        <Input placeholder="e.g. Oceans (Where Feet May Fail)" icon="music_note" />
                    </div>
                    <div>
                        <div className="flex justify-between items-baseline mb-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">Artist Name</label>
                            <span className="text-[10px] font-bold text-yellow-600 uppercase">Required</span>
                        </div>
                        <Input placeholder="e.g. Hillsong United" icon="mic" />
                    </div>
                    <div>
                         <label className="text-sm font-bold text-gray-900 dark:text-white mb-2 block">Link (YouTube or Spotify)</label>
                         <Input placeholder="Paste link here" icon="link" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-900 dark:text-white mb-2 block">Message</label>
                        <textarea rows={4} className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-surface-dark p-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Specific version, key, or any other notes..."></textarea>
                    </div>
                    <div className="mt-4">
                        <Button>Submit Request <span className="material-symbols-outlined">send</span></Button>
                        <p className="text-center text-xs text-gray-400 mt-4">We review requests weekly.</p>
                    </div>
                </form>
             </div>
        </div>
    );
};

const ManageSubscription = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen">
            <Header title="Manage Subscription" backTo="/profile" />
            <div className="px-6 pt-8 max-w-md mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center size-20 bg-red-50 dark:bg-red-900/20 rounded-full mb-4 ring-1 ring-red-100 dark:ring-red-900 text-primary">
                        <span className="material-symbols-outlined text-4xl">star</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Current Plan</p>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Free Plan</h1>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                        <h4 className="font-bold text-gray-900 dark:text-white">Plan Details</h4>
                    </div>
                    <div className="p-6 space-y-5">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Status</span>
                            <span className="flex items-center gap-2 text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-medium"><span className="size-1.5 rounded-full bg-green-500"></span> Active</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Billing Cycle</span>
                            <span className="font-medium text-gray-900 dark:text-white">Monthly</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Next Renewal</span>
                            <span className="font-medium text-gray-900 dark:text-white">Nov 28, 2023</span>
                        </div>
                    </div>
                </div>

                <div className="pl-2 space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Unlimited offline listening</div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> High-fidelity audio quality</div>
                </div>

                <Button>Upgrade to Pro</Button>
                <div className="text-center mt-4">
                    <button className="text-xs text-gray-500 underline decoration-gray-300">Cancel Subscription</button>
                </div>
            </div>
        </div>
    );
}

// --- App Container ---

const App = () => {
    return (
        <HashRouter>
            <div className="font-display">
                <Routes>
                    <Route path="/" element={<OnboardingWelcome />} />
                    <Route path="/onboarding-library" element={<OnboardingLibrary />} />
                    <Route path="/onboarding-transpose" element={<OnboardingTranspose />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/check-email" element={<CheckEmail />} />
                    
                    <Route path="/home" element={<Home />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/practice" element={<Player />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/request" element={<RequestSong />} />
                    <Route path="/settings/subscription" element={<ManageSubscription />} />
                    
                    {/* Fallbacks for demo */}
                    <Route path="/artists" element={<Home />} />
                    <Route path="/settings/*" element={<Profile />} />
                </Routes>
                <BottomNav />
            </div>
        </HashRouter>
    );
};

export default App;