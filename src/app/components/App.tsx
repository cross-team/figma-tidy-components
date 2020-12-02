import * as React from 'react';
import {Text} from 'react-figma-plugin-ds';
import '../styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';

declare function require(path: string): any;

const App = ({}) => {
    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = event => {
            const {type, message} = event.data.pluginMessage;
            console.log(type, message);
        };
    }, []);

    // call launchControllerFunctions('message1') to launch the message1 command in src/plugin/controller.ts
    function launchControllerFunctions(messageType) {
        parent.postMessage({pluginMessage: {type: messageType}}, '*');
    }

    return (
        <div id="root">
            <Text size="xlarge" weight="bold">
                Welcome to your figma plugin!
            </Text>
            <Text size="large" weight="normal">
                Check out <a href="https://github.com/alexandrtovmach/react-figma-plugin-ds/">react-figma-plugin-ds</a>{' '}
                on gitHub to learn about the available components!
            </Text>
        </div>
    );
};

export default App;
