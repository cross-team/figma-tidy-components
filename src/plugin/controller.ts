figma.showUI(__html__, {
    height: 400,
});

figma.loadFontAsync({family: 'Roboto', style: 'Regular'});

const clearFill: SolidPaint = {
    opacity: 0,
    type: 'SOLID',
    color: {
        r: 0,
        g: 0,
        b: 0,
    },
};

figma.ui.onmessage = msg => {
    switch (msg.type) {
        case 'organize':
            let maxGranularity = 0;
            let rootFrame = figma.createFrame();
            let frames = [];
            let currentPage = figma.currentPage.findAll();
            let components = currentPage.filter(node => {
                return node.type === 'COMPONENT';
            });
            let componentData = components.map(component => {
                let data = {
                    name: component.name,
                    splitName: component.name.split('/'),
                    id: component.id,
                };
                return data;
            });

            componentData.forEach(component => {
                if (maxGranularity < component.splitName.length - 1) {
                    maxGranularity = component.splitName.length - 1;
                }
            });

            if (msg.state.granularity > maxGranularity) {
                frames = getFrames(componentData, maxGranularity);
            } else {
                frames = getFrames(componentData, msg.state.granularity);
            }

            frames.forEach(frame => {
                layoutFrame(frame, msg.state);
                rootFrame.appendChild(frame);
            });

            rootFrame.fills = [clearFill];
            rootFrame.layoutMode = msg.state.direction;
            rootFrame.primaryAxisSizingMode = 'AUTO';
            rootFrame.counterAxisSizingMode = 'AUTO';
            rootFrame.itemSpacing = +msg.state.groupSpace;

            figma.closePlugin();
            break;
        case 'showSelection':
            console.log(figma.currentPage.selection);
            break;
        default:
            break;
    }

    // figma.closePlugin();
    // Uncomment the line above if you want the plugin to close after running a single message call
};

function layoutFrame(frame, state) {
    frame.fills = [clearFill];
    frame.layoutMode = state.direction === 'VERTICAL' ? 'HORIZONTAL' : 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.itemSpacing = state.direction === 'VERTICAL' ? +state.spacing.x : +state.spacing.y;
}

function getFrames(components, granularity) {
    let frameNames = [];
    components.forEach(component => {
        let name = joinName(component.splitName, granularity);
        if (frameNames.indexOf(name) === -1) {
            frameNames.push(name);
        }
    });

    let frames = [];
    frameNames.forEach(frameName => {
        let frameNodes = [];
        let regex = RegExp(`^${frameName}`);

        components.forEach(component => {
            if (regex.test(component.name)) {
                let node = figma.getNodeById(component.id);
                frameNodes.push(node);
            }
        });

        let frame = figma.createFrame();
        frame.name = frameName;

        frameNodes.forEach(node => {
            frame.appendChild(node);
        });

        // const fill: SolidPaint = {
        //     opacity: 0,
        //     type: 'SOLID',
        //     color: {
        //         r: 0,
        //         g: 0,
        //         b: 0,
        //     },
        // };

        // frame.fills = [fill];

        frames.push(frame);
    });

    return frames;
}

function joinName(splitName, granularity) {
    let nameArray = splitName;
    while (nameArray.length > granularity) {
        nameArray.pop();
    }
    return nameArray.join('/');
}
