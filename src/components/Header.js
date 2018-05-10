import React from 'react';

// this contains the HTML and styling and JS prop declarations
// the JS defines where the prop text gets placed (but the prop text is declared in the App.js file)

// stateless -> simple components that don't do anything, just render something out
// don't need a full react component
// if you don't need other methods other than render, can use a stateless functional component
// this Header component doesn't do anything other than render(), so we can convert it to a stateless functional component
// remove class and render() and turn it into a const/fat arrow function

const Header = (props) => {
    return (
        <header className="top">
            <h1>
                Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                Day
            </h1>
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>
    )
}

Header.propTypes = {
    tagline: React.PropTypes.string.isRequired
}

export default Header;