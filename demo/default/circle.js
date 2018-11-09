export default {
    name : 'circleAnimation',
    input: [{
        name: 'transition',
        type: 'num',
        def: 700,
        ref: 'circleTransition',
        remark: 'ms'
    },{
        name: 'interval',
        type: 'num',
        def: 300,
        ref: 'circleInterval',
        remark: 'ms'
    },{
        name: 'color',
        type: 'text',
        def: '#000',
        ref: 'circleColor',
        remark: ''
    }]
}