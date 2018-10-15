export default {
  name : 'slideAnimation',
  input: [{
      name: 'type',
      type: 'num',
      def: 1,
      ref: 'slideType',
      remark: 'select 1 ~ 4'
  },
  {
      name: 'transition',
      type: 'num',
      def: 500,
      ref: 'slideTransition',
      remark: 'ms'
  },
  {
      name: 'interval',
      type: 'num',
      def: 300,
      ref: 'slideInterval',
      remark: 'ms'
  },
  {
      name: 'color',
      type: 'text',
      def: '#000',
      ref: 'slideColor',
      remark: ''
  }],
  button: function(){this.handleSlideAnimation()}
}