import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/MainComponent/Sidebar';
import Header from '@/Components/MainComponent/Header';
import Footer from '@/Components/MainComponent/Footer';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =useState(false);

    return (
        <>
            <div className="wrapper">
                <Sidebar />
                <Header />
                    <main>{children}</main>
                <Footer />
            </div>
        </>
    );
}
