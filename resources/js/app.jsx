import '../css/app.css';
import './bootstrap';
import './vendor/js/bootstrap.bundle.min.js';
// import './vendor/js/jquery.min.js';
import './vendor/plugins/simplebar/js/simplebar.min.js';
import './vendor/plugins/simplebar/js/simplebar.min.js';
// import './vendor/plugins/metismenu/js/metisMenu.min.js';
// import './vendor/plugins/perfect-scrollbar/js/perfect-scrollbar.js';
// import './vendor/plugins/chartjs/js/Chart.min.js';
// import './vendor/plugins/vectormap/jquery-jvectormap-2.0.2.min.js';
// import './vendor/plugins/vectormap/jquery-jvectormap-world-mill-en.js';
// import './vendor/plugins/jquery.easy-pie-chart/jquery.easypiechart.min.js';
// import './vendor/plugins/sparkline-charts/jquery.sparkline.min.js';
// import './vendor/plugins/jquery-knob/excanvas.js';
// import './vendor/plugins/jquery-knob/jquery.knob.js';
import './vendor/js/index.js';
import './vendor/js/app.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
        <>
            <App {...props} />

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
    },
    progress: {
        color: '#4B5563',
    },
});
