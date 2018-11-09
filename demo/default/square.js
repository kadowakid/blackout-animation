export default {
    name : 'squareAnimation',
    input: [{
        name: 'size',
        type: 'num',
        def: 100,
        ref: 'squareSize',
        remark: 'px'
    },{
        name: 'transition',
        type: 'num',
        def: 700,
        ref: 'squareTransition',
        remark: 'ms'
    },{
        name: 'interval',
        type: 'num',
        def: 300,
        ref: 'squareInterval',
        remark: 'ms'
    },{
        name: 'color',
        type: 'text',
        def: '#000',
        ref: 'squareColor',
        remark: ''
    }]
}