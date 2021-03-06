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
            let rootFrame = figma.createFrame();
            let components = figma.currentPage.findAll(node => {
                return node.type === 'COMPONENT' && node.parent.type !== 'COMPONENT_SET';
            });
            let componentSets = figma.currentPage.findAll(node => {
                return node.type === 'COMPONENT_SET';
            });

            if (msg.state.sortAlphabetically) {
                components.sort(compareNodes);
                componentSets.sort(compareNodes);
            }

            renameOldFrames();
            rootFrame.name = 'Component-Organizer-Root';
            rootFrame.fills = [clearFill];
            rootFrame.layoutMode = msg.state.direction;
            rootFrame.primaryAxisSizingMode = 'AUTO';
            rootFrame.counterAxisSizingMode = 'AUTO';
            rootFrame.itemSpacing = +msg.state.margin;

            let maxGranularity = 0;
            let frames = [];

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
                frames = getFrames(componentData, maxGranularity, msg.state.renameDuplicate);
            } else {
                frames = getFrames(componentData, msg.state.granularity, msg.state.renameDuplicate);
            }

            if (msg.state.sortAlphabetically) {
                frames.sort(compareNodes);
            }

            frames.forEach(frame => {
                layoutFrame(frame, msg.state);
                rootFrame.appendChild(frame);
            });
            componentSets.forEach(set => {
                layoutFrame(set, msg.state);
                rootFrame.appendChild(set);
            });

            if (msg.state.displayTitle) {
                createTitles(rootFrame, msg.state);
            }
            if (msg.state.zoomCenter) {
                figma.viewport.scrollAndZoomIntoView([rootFrame]);
            }

            removeOldFrames();
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

async function createTitles(rootFrame, state) {
    await figma.loadFontAsync({family: 'Roboto', style: 'Bold'});
    let titles = [];

    rootFrame.children.forEach(child => {
        let text = figma.createText();
        text.characters = child.name;
        text.fontName = {family: 'Roboto', style: 'Bold'};
        text.fontSize = 16;

        if (state.direction === 'VERTICAL') {
            text.y = child.y;
            text.x = child.x - text.width - 10;
        } else {
            text.y = child.y - text.height - 10;
            text.x = child.x;
        }

        titles.push(text);
    });

    let titleGroup = figma.group(titles, figma.currentPage);
    titleGroup.name = 'Component-Organizer-Titles';
}

function renameOldFrames() {
    let regex = RegExp(`^Component-Organizer`);
    let frames = figma.currentPage.findAll(node => {
        return regex.test(node.name);
    });
    frames.forEach(frame => {
        if (regex.test(frame.name)) {
            frame.name = 'OLD-' + frame.name;
        }
    });
}

function removeOldFrames() {
    let regexRoot = RegExp(`^OLD-Component-Organizer-Root`);
    let regexTitle = RegExp(`^OLD-Component-Organizer-Titles`);
    let oldRoot = figma.currentPage.findChild(node => {
        return regexRoot.test(node.name);
    });
    let oldTitles = figma.currentPage.findChild(node => {
        return regexTitle.test(node.name);
    });
    if (oldRoot) {
        oldRoot.remove();
    }
    if (oldTitles) {
        oldTitles.remove();
    }
}

function layoutFrame(frame, state) {
    frame.fills = [clearFill];
    frame.layoutMode = state.direction === 'VERTICAL' ? 'HORIZONTAL' : 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.itemSpacing = state.gutter;
}

function getFrames(components, granularity, renameDuplicate) {
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
        let nodeNames = [];
        let regex = RegExp(`^${frameName}`);

        components.forEach(component => {
            if (regex.test(component.name)) {
                let node = figma.getNodeById(component.id);

                if (renameDuplicate) {
                    checkForDuplicates(node, nodeNames);
                }

                frameNodes.push(node);
            }
        });

        let frame = figma.createFrame();
        frame.name = frameName;

        frameNodes.forEach(node => {
            frame.appendChild(node);
        });

        frames.push(frame);
    });

    return frames;
}

function checkForDuplicates(node, nameArray) {
    if (nameArray.includes(node.name)) {
        if (node.name.includes('Copy')) {
            let copyNum = parseInt(node.name.substring(node.name.length - 1)) + 1;
            node.name = node.name.substring(0, node.name.length - 1) + copyNum;
        } else {
            node.name = node.name + ' Copy 1';
        }
        checkForDuplicates(node, nameArray);
    } else {
        nameArray.push(node.name);
    }
}

function joinName(splitName, granularity) {
    let nameArray = splitName;
    while (nameArray.length > granularity) {
        nameArray.pop();
    }
    return nameArray.join('/');
}

function compareNodes(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}
