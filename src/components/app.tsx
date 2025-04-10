import { useLocalStorage } from '@uidotdev/usehooks';
import { LocationProvider, Route, Router } from 'preact-iso';

import Header from './header/header';

import '../style/index.css';

// Code-splitting is automated for `routes` directory
import Awards from '../routes/awards/awards';
import Formations from '../routes/formations/formations';
import GenerateResume from '../routes/generate';
import Home from '../routes/home/Home';
import WorkExperiences from '../routes/workExperiences/workExperiences';

export default function App() {

    const [theme, _] = useLocalStorage('theme', 'light');

    return (
        <LocationProvider>
        <main class="app bg-body-secondary">
            <Header />
            <div class ={`container p-5 mh-100`}>
                <Router>
                    <Route path="/" component={Home} />
                    <Route path="/generate" component={GenerateResume} />
                    <Route path="/work-experiences" component={WorkExperiences} />
                    <Route path="/formations" component={Formations} />
                    <Route path="/awards" component={Awards} />
                    <Route default component={NotFound} />
                </Router>
            </div>
            {/*             <Footer /> */}
        </main>
        </LocationProvider>
    );
}

function NotFound() {
    return <p>I think you are lost !</p>
}