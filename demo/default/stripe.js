export default {
    name : 'stripeAnimation',
    input: [{
        name: 'type',
        type: 'num',
        def: 1,
        ref: 'stripeType',
        remark: 'select 1 or 2'
    },{
        name: 'elements',
        type: 'num',
        def: 10,
        ref: 'stripeElements',
        remark: ''
    },{
        name: 'transition',
        type: 'num',
        def: 1000,
        ref: 'stripeTransition',
        remark: 'ms'
    },{
        name: 'interval',
        type: 'num',
        def: 300,
        ref: 'stripeInterval',
        remark: 'ms'
    },{
        name: 'color',
        type: 'text',
        def: '#000',
        ref: 'stripeColor',
        remark: ''
    }],
    button: function(){this.handleStripeAnimation()}
}