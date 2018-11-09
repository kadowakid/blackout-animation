export default {
    name : 'blackoutAnimation',
    input: [{
        name: 'type',
        type: 'num',
        def: 1,
        ref: 'blackoutType',
        remark: 'select 1 or 2'
    },
    {
        name: 'transition',
        type: 'num',
        def: 1000,
        ref: 'blackoutTransition',
        remark: 'ms'
    },
    {
        name: 'interval',
        type: 'num',
        def: 300,
        ref: 'blackoutInterval',
        remark: 'ms'
    },
    {
        name: 'color',
        type: 'text',
        def: '#000',
        ref: 'blackoutColor',
        remark: ''
    }]
}