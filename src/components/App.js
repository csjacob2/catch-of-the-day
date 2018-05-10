import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

// the app would define the components that are used and what props are *in* it and what text goes into the props

class App extends React.Component {
    constructor() {
        super();

        //need to do this to bind "this" (App) to functions (but only functions that are calling "this" inside)
        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);

        // get initial state
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount() {
        //this runs before the <App> is rendered

        // hook into Firebase
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`
            , {
            context: this,
            state: 'fishes'
        });

        // check if any items are in localstorage and populate into view
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if (localStorageRef) {
            //update App component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish(fish) {
        //this is a method that changes the state of "fish" in the application
        // it takes one argument, the fish object

        // update state
        // to update state, you can directly update state by:
        //      this.state.fishes.fish1 = fish
        // but this is not best practices
        // 1) take a copy of current state
        // 2) update actual state
        // this is done for performance and to accidentally update some states and then have race condition issues

        // copy existing fishes and puts it into a new state of fishes
        const fishes = {...this.state.fishes};

        // get unique ID
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        // set state
        this.setState({fishes});

    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};

        // hooked up to firebase so have to remove from there
        fishes[key] = null;
        this.setState({fishes});
    }

    loadSamples() {
    // we put this function here instead of Inventory.js because it needs to happen where the *state* lives
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key) {
        // adds the key (fish key) to order)
        // take a copy of state
        const order = {...this.state.order};

        //update or add the new number of fish ordered
        // this increments the number of fish in the order by 1 OR sets it to 1 if it doesn't exist yet
        order[key] = order[key] + 1 || 1;

        //update the state
        this.setState({ order });
    }

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    storeId={this.props.params.storeId}
                />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;