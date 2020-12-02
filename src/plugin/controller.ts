figma.showUI(__html__, {
    height: 250,
});

figma.loadFontAsync({family: 'Roboto', style: 'Regular'});

figma.ui.onmessage = msg => {
    switch (msg.type) {
        case 'message1':
            //Enter your fimga API code here!!
            break;
        case 'message2':
            //Enter your fimga API code here!!
            break;
        case 'message3':
            //Enter your fimga API code here!!
            break;
        default:
            break;
    }

    // figma.closePlugin();
    // Uncomment the line above if you want the plugin to close after running a single message call
};
