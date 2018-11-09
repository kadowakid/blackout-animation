export default {
    name : 'mosaicAnimation',
    input: [{
        name: 'size',
        type: 'num',
        def: 30,
        ref: 'mosaicSize',
        remark: 'px'
    },{
        name: 'times',
        type: 'num',
        def: 20,
        ref: 'mosaicTimes',
        remark: ''
    },{
        name: 'transition',
        type: 'num',
        def: 0,
        ref: 'mosaicTransition',
        remark: 'ms'
    },{
        name: 'delay',
        type: 'num',
        def: 1000,
        ref: 'mosaicDelay',
        remark: 'ms'
    },{
        name: 'interval',
        type: 'num',
        def: 300,
        ref: 'mosaicInterval',
        remark: 'ms'
    },{
        name: 'color',
        type: 'text',
        def: '#000',
        ref: 'mosaicColor',
        remark: ''
    }]
}