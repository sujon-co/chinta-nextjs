import ReactFullpage from '@fullpage/react-fullpage';
import Head from 'next/head';
import React from 'react';

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
     * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
     */
};

const originalColors = [
    'blue',
    '#0798ec',
    '#fc6c7c',
    '#435b71',
    'orange',
    'blue',
    'purple',
    'yellow',
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionsColor: [...originalColors],
        };
    }

    onLeave(origin, destination, direction) {
        console.log('onLeave', { origin, destination, direction });
        // arguments are mapped in order of fullpage.js callback arguments do something
        // with the event
    }

    handleChangeColors() {
        const newColors =
            this.state.sectionsColor[0] === 'yellow'
                ? [...originalColors]
                : ['yellow', 'blue', 'white'];
        this.setState({
            sectionsColor: newColors,
        });
    }

    moveSectionDown() {
        fullpage_api.moveSectionDown();
    }

    render() {
        const Menu = () => (
            <div
                className="menu"
                style={{
                    position: 'fixed',
                    top: 0,
                    zIndex: 100,
                }}
            >
                <ul className="actions">
                    <li>
                        <button onClick={() => this.moveSectionDown()}>
                            Move Section Down
                        </button>
                    </li>
                </ul>
            </div>
        );

        return (
            <div className="App">
                <Head>
                    <title>My styled page</title>
                </Head>
                <Menu />
                <ReactFullpage
                    navigation
                    pluginWrapper={pluginWrapper}
                    onLeave={this.onLeave.bind(this)}
                    // scrollHorizontally = {true}
                    sectionsColor={this.state.sectionsColor}
                    render={(comp) =>
                        console.log('render prop change') || (
                            <ReactFullpage.Wrapper>
                                <div className="section">
                                    <h1>Section 1</h1>
                                </div>
                                <div className="section">
                                    <h1>Section 2</h1>
                                </div>
                                <div className="section">
                                    <h1>Section 3</h1>
                                </div>
                                <div className="section">
                                    <h1>Section 4</h1>
                                </div>
                                <div className="section">
                                    <h1>Section 4</h1>
                                </div>
                            </ReactFullpage.Wrapper>
                        )
                    }
                />
            </div>
        );
    }
}

export default App;
