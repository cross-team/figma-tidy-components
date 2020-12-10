import * as React from 'react';
import {Button, Checkbox, Input, Label, Select, Text} from 'react-figma-plugin-ds';
import InfoTooltip from './InfoTooltip';
import GithubIcon from '../assets/github';
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
        setTimeout(() => {
            console.log(document.getElementById('granularity'));
        }, 1000);
    }, []);

    // function launchControllerFunctions(messageType) {
    //     parent.postMessage({pluginMessage: {type: messageType}}, '*');
    // }

    function handleChange(event, name) {
        if (name === 'granularity' && event < 1) {
            setState({
                ...state,
                [name]: 1,
            });
        } else {
            setState({
                ...state,
                [name]: event,
            });
        }
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
            <div id="body">
                <div className="columnContainer">
                    <div className="column">
                        <Label htmlFor="direction">
                            Direction
                            <InfoTooltip
                                alt="Direction"
                                id="direction"
                                description="The direction in which the component groups will be laid out."
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
                                description="The space between each group of components."
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
                                description="The hierarchy levels in which your components will be organized."
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
                                description="The space between each component inside the groups."
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
            <div className="footer">
                <Text>Version 1.0</Text>
                <a
                    className="ghLink"
                    href="https://github.com/MarcelloPaiva/figma-component-organizer"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Text>Feedback / Issues</Text>
                    <GithubIcon />
                </a>
            </div>
        </div>
    );
};

export default App;
