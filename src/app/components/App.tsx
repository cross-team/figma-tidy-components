import * as React from 'react';
import {Button, Checkbox, Input, Label, Select} from 'react-figma-plugin-ds';
import '../styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';

declare function require(path: string): any;

const App = ({}) => {
    const [state, setState] = React.useState({
        granularity: 1,
        direction: 'VERTICAL',
        groupSpace: 100,
        displayTitle: true,
        spacing: {
            x: 100,
            y: 100,
        },
        rowMax: '',
        renameDuplicate: false,
        zoomCenter: true,
    });

    React.useEffect(() => {
        // console.log(state);
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

    function handleSpacingChange(event, axis) {
        // console.log(event);
        if (axis === 'x') {
            setState({
                ...state,
                spacing: {
                    x: event,
                    y: state.spacing.y,
                },
            });
        } else {
            setState({
                ...state,
                spacing: {
                    y: event,
                    x: state.spacing.x,
                },
            });
        }
    }

    function handleSelectChange(event, name) {
        // console.log(event);
        setState({
            ...state,
            [name]: event.value,
        });
    }

    function handleSubmit() {
        parent.postMessage({pluginMessage: {type: 'organize', state}}, '*');
    }

    return (
        <form id="root">
            <Label htmlFor="granularity">Group Granularity</Label>
            <Input
                type="number"
                name="granularity"
                id="granularity"
                onChange={e => {
                    handleChange(e, 'granularity');
                }}
                defaultValue={1}
            />
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
                defaultValue="VERTICAL"
            />
            <Label htmlFor="groupSpace">Group Space</Label>
            <Input
                type="number"
                name="groupSpace"
                id="groupSpace"
                onChange={e => {
                    handleChange(e, 'groupSpace');
                }}
                defaultValue={100}
            />
            <Label htmlFor="spaceX">Spacing X</Label>
            <Input
                type="number"
                name="spaceX"
                id="spaceX"
                onChange={e => {
                    handleChange(e, 'x');
                }}
                defaultValue={100}
            />
            <Label htmlFor="spaceY">Spacing Y</Label>
            <Input
                type="number"
                name="spaceY"
                id="spaceY"
                onChange={e => {
                    handleSpacingChange(e, 'y');
                }}
                defaultValue={100}
            />
            <Label htmlFor="rowMax">Maximum Rows</Label>
            <Input
                type="number"
                name="rowMax"
                id="rowMax"
                onChange={e => {
                    handleChange(e, 'rowMax');
                }}
                defaultValue={100}
            />
            <Checkbox
                name="displayTitle"
                id="displayTitle"
                label="Display Title"
                onChange={e => {
                    handleChange(e, 'displayTitle');
                }}
                type="checkbox"
            />
            <Checkbox
                name="renameDuplicate"
                id="renameDuplicate"
                label="Rename Duplicate Components"
                onChange={e => {
                    handleChange(e, 'renameDuplicate');
                }}
                type="checkbox"
            />
            <Checkbox
                name="zoomCenter"
                id="zoomCenter"
                label="Zoom to Center"
                onChange={e => {
                    handleChange(e, 'zoomCenter');
                }}
                type="checkbox"
            />
            <Button onClick={handleSubmit}>Submit</Button>
            <Button
                onClick={() => {
                    parent.postMessage({pluginMessage: {type: 'showSelection'}}, '*');
                }}
            >
                Show Selection
            </Button>
        </form>
    );
};

export default App;
