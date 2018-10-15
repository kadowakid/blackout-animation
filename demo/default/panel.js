export default {
    name : 'panelAnimation',
    input: [{
        name: 'size',
        type: 'num',
        def: 200,
        ref: 'panelSize',
        remark: 'px'
    },{
        name: 'transition',
        type: 'num',
        def: 700,
        ref: 'panelTransition',
        remark: 'ms'
    },{
        name: 'delay',
        type: 'num',
        def: 1000,
        ref: 'panelDelay',
        remark: 'ms'
    },{
        name: 'interval',
        type: 'num',
        def: 300,
        ref: 'panelInterval',
        remark: 'ms'
    },{
        name: 'color',
        type: 'text',
        def: '#000',
        ref: 'panelColor',
        remark: ''
    }],
    button: function(){this.handlePanelAnimation()}
}