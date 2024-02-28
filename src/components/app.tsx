import { h } from 'preact';
import { Route, Router, LocationProvider } from 'preact-iso';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import GenerateResume from '../routes/generate';
import Footer from './footer';

export default function App() {
    return (
        <LocationProvider>
        <main>
            <Header />
            <Router>
                <Route path="/" component={Home} />
                <Route path="/generate" component={GenerateResume} />
                <Route default component={NotFound} />
            </Router>
            {/*             <Footer /> */}
        </main>
        </LocationProvider>
    );
}

function NotFound() {
    return <p>I think you are lost !</p>
}