import * as React from 'react';
import {Button, Checkbox, Input, Label, Select} from 'react-figma-plugin-ds';
import '../styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';

declare function require(path: string): any;

const defaultSettings = {
    granularity: 1,
    direction: 'VERTICAL',
    margin: 100,
    gutter: 100,
    displayTitle: true,
    renameDuplicate: false,
    zoomCenter: true,
};

const App = ({}) => {
    const [state, setState] = React.useState({
        ...defaultSettings,
    });

    React.useEffect(() => {
        console.log(state);
    }, [state]);

    // function launchControllerFunctions(messageType) {
    //     parent.postMessage({pluginMessage: {type: messageType}}, '*');
    // }

    function handleChange(event, name) {
        // console.log(event);
        setState({
            ...state,
            [name]: event,
        });
    }

    function handleSelectChange(event, name) {
        console.log(event);
        setState({
            ...state,
            [name]: event.value,
        });
    }

    function handleSubmit() {
        parent.postMessage({pluginMessage: {type: 'organize', state}}, '*');
    }

    return (
        <div id="root">
            <div className="columnContainer">
                <div className="column">
                    <Label htmlFor="direction">Direction</Label>
                    <Select
                        name="direction"
                        id="direction"
                        onChange={e => {
                            handleSelectChange(e, 'direction');
                        }}
                        options={[
                            {value: 'VERTICAL', label: 'Vertical'},
                            {value: 'HORIZONTAL', label: 'Horizontal'},
                        ]}
                        defaultValue={defaultSettings.direction}
                    />
                    <Label htmlFor="margin">Margin</Label>
                    <Input
                        type="number"
                        name="margin"
                        id="margin"
                        onChange={e => {
                            handleChange(e, 'margin');
                        }}
                        defaultValue={defaultSettings.margin}
                    />
                </div>
                <div className="column">
                    <Label htmlFor="granularity">Group Granularity</Label>
                    <Input
                        type="number"
                        name="granularity"
                        id="granularity"
                        onChange={e => {
                            handleChange(e, 'granularity');
                        }}
                        defaultValue={defaultSettings.granularity}
                    />
                    <Label htmlFor="gutter">Gutter</Label>
                    <Input
                        type="number"
                        name="gutter"
                        id="gutter"
                        onChange={e => {
                            handleChange(e, 'margin');
                        }}
                        defaultValue={defaultSettings.margin}
                    />
                </div>
            </div>
            <Checkbox
                name="displayTitle"
                id="displayTitle"
                label="Display Title"
                onChange={e => {
                    handleChange(e, 'displayTitle');
                }}
                type="checkbox"
                defaultValue={defaultSettings.displayTitle}
            />
            <Checkbox
                name="renameDuplicate"
                id="renameDuplicate"
                label="Rename Duplicate Components"
                onChange={e => {
                    handleChange(e, 'renameDuplicate');
                }}
                type="checkbox"
                defaultValue={defaultSettings.renameDuplicate}
            />
            <Checkbox
                name="zoomCenter"
                id="zoomCenter"
                label="Zoom to Center"
                onChange={e => {
                    handleChange(e, 'zoomCenter');
                }}
                type="checkbox"
                defaultValue={defaultSettings.zoomCenter}
            />
            <Button onClick={handleSubmit}>Submit</Button>
            {/* <Button
                onClick={() => {
                    parent.postMessage({pluginMessage: {type: 'showSelection'}}, '*');
                }}
            >
                Show Selection
            </Button> */}
        </div>
    );
};

export default App;
