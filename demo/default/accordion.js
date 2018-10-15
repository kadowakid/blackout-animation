export default {
    name : 'accordionAnimation',
    input: [{
        name: 'type',
        type: 'num',
        def: 1,
        ref: 'accordionType',
        remark: 'select 1 or 2'
    },{
        name: 'elements',
        type: 'num',
        def: 10,
        ref: 'accordionElements',
        remark: ''
    },{
        name: 'transition',
        type: 'num',
        def: 500,
        ref: 'accordionTransition',
        remark: 'ms'
    },{
        name: 'delay',
        type: 'num',
        def: 500,
        ref: 'accordionDelay',
        remark: 'ms'
    },{
        name: 'interval',
        type: 'num',
        def: 0,
        ref: 'accordionInterval',
        remark: 'ms'
    },{
        name: 'color',
        type: 'text',
        def: '#000',
        ref: 'accordionColor',
        remark: ''
    }],
    button: function(){this.handleAccordionAnimation()}
}