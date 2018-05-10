import React from 'react';

// this is importing one method from the entire package
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';


import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const githubRepo = `/${window.location.pathname.split('/'[1])}`;

const Root = () =>  {
    return (
        <BrowserRouter basename={githubRepo}>
            <div>
                {/* match exactly pattern = homepage (/) or root page */}
                <Match exactly pattern="/" component={StorePicker}/>
                <Match pattern="/store/:storeId" component={App}/>
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
};

// rendering the component
render(<Root/>, document.querySelector('#main'));