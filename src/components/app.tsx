import { h } from 'preact';
import { Route, Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import GenerateResume from '../routes/generate';
import Footer from './footer';

export default function App() {
    return (
        <div id="preact-root">
            <Header />
            <Router>
                <Route path="/" component={Home} />
                <Route path="/generate" component={GenerateResume} />
                <Route path='*' component={NotFound} />
            </Router>
            {/*             <Footer /> */}
        </div>
    );
}

function NotFound() {
    return <p>I think you are lost !</p>
}