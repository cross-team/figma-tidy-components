import * as React from 'react';
import {Button, Checkbox, Input, Label, Select} from 'react-figma-plugin-ds';
import InfoTooltip from './InfoTooltip';
import '../styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';

declare function require(path: string): any;

const defaultSettings = {
    granularity: 1,
    direction: 'VERTICAL',
    margin: 100,
    gutter: 100,
    displayTitle: true,
    sortAlphabetically: false,
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
                    <Label className="big" htmlFor="direction">
                        Direction
                        <InfoTooltip
                            alt="Direction"
                            id="direction"
                            description="The direction in which the component groups will be laid out"
                        />
                    </Label>
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
                    <Label htmlFor="margin">
                        Margin
                        <InfoTooltip
                            alt="Margin"
                            id="margin"
                            description="The space between each group of components"
                        />
                    </Label>
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
                    <Label htmlFor="granularity">
                        Group Granularity
                        <InfoTooltip
                            alt="Group Granularity"
                            id="granularity"
                            description="How deep the component separation should go. 1 is the least specific and the higher the number, the more specific the groups will be until there is one component in each group."
                        />
                    </Label>
                    <Input
                        type="number"
                        name="granularity"
                        id="granularity"
                        onChange={e => {
                            handleChange(e, 'granularity');
                        }}
                        defaultValue={defaultSettings.granularity}
                    />
                    <Label htmlFor="gutter">
                        Gutter
                        <InfoTooltip
                            alt="Gutter"
                            id="gutter"
                            description="The space between each component in the groups"
                        />
                    </Label>
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
            <Checkbox
                name="sortAlphabetically"
                id="sortAlphabetically"
                label="Sort Alphabetically"
                onChange={e => {
                    handleChange(e, 'sortAlphabetically');
                }}
                type="checkbox"
                defaultValue={defaultSettings.sortAlphabetically}
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
