
if (process.env.NODE_ENV==='development') {
    // Must use require here as import statements are only allowed
    // to exist at top-level.
    require("preact/debug");
  }  

import './style/bootstrap-darkly.min.css';
import App from './components/app';

export default App;
