export default {
    name : 'barAnimation',
    input: [{
        name: 'type',
        type: 'num',
        def: 1,
        ref: 'barType',
        remark: 'select 1 ~ 4'
    },{
        name: 'elements',
        type: 'num',
        def: 5,
        ref: 'barElements',
        remark: ''
    },{
        name: 'transition',
        type: 'num',
        def: 500,
        ref: 'barTransition',
        remark: 'ms'
    },{
        name: 'delay',
        type: 'num',
        def: 500,
        ref: 'barDelay',
        remark: 'ms'
    },{
        name: 'interval',
        type: 'num',
        def: 300,
        ref: 'barInterval',
        remark: 'ms'
    },{
        name: 'color',
        type: 'text',
        def: '#000',
        ref: 'barColor',
        remark: ''
    }],
    button: function(){this.handleBarAnimation()}
}