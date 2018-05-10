import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

    /*
    constructor() {
     super();
        this.goToStore = this.gotoStore.bind(this);
    }
    */

    goToStore(event) {
        //prevent page reload/form submission
        event.preventDefault();

        // get text from textbox
        const storeId = this.storeInput.value;

        //route from root (transition) to /store/:storeID
        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
                <h2>Please enter a store</h2>
                <input type="test" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
                <button type="submit">Visit Store -></button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
};

export default StorePicker;