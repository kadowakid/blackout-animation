import React,{Component} from 'react';

export default class SampleCode extends Component {
  constructor(props) {
    super();
    this.state = {
      codeView: 'React',
      first: true
    };
  }
  componentDidMount(){
    this.codeAreaEdit();    
  }
  componentDidUpdate(){
    this.codeAreaEdit();
  }
  codeAreaEdit(){
    const code = document.getElementsByClassName('code')[0];
    code.style.maxHeight = code.scrollHeight + 'px';   
  }
  changeView(e){
    if(e.target.value === this.state.codeView) return false;
    const code = document.getElementsByClassName('code')[0];
    const val = e.target.value;
    code.style.maxHeight = code.style.paddingBottom = 0;
    setTimeout(()=>{
      this.setState({
        codeView: val
      });
      code.style.maxHeight = code.scrollHeight + 'px';
      code.style.paddingBottom = '10px';
    },500) 
  }
  checkNum(num) {
    const numCheck = /^\d+$/;
    const check = num && num.match(numCheck);
    return check;
  }
  render() {
    const sampleCode = this.props.code;
    sampleCode && Object.keys(this.props.code).forEach((prop,i)=>{
      this.props.code[prop] === '' && delete this.props.code[prop];
    });

    const react = this.state.codeView === 'React';
    const vue = this.state.codeView === 'Vue';

    const ReactCode = () => (
      <div>
        <span className="keyword">import</span> <span className="text">React, &#123; Component &#125;</span> <span className="keyword">from</span> <span className="string">'react'</span>;<br/>
        <span className="keyword">import</span> <span className="text">&#123;
        <span className="animationCode"> {this.props.name} </span>
        &#125;</span> <span className="keyword">from</span> <span className="string">'blackout-animation'</span>;<br/>
        <br/>
        <span className="keyword">class</span> <span className="className">SampleCode</span> <span className="keyword">extends</span> <span className="className">Component</span> &#123;<br/>
        <div className='indent'>
          <span className="function">constructor</span>(<span className="text">props</span>) &#123;<br/>
          <div className='indent'>
            <span className="function">super</span>();<br />
            <span className="keyword">this</span>.<span className="text">state</span>.<span className="text">view</span> = <span className="text">true</span>;
          </div>
          &#125;<br/>
          <span className="function">animation</span>()&#123;
          <div className='indent'>
            <span className="animationCode"><span className="function">{this.props.name}</span>(&#123;</span>
            <div className='indent'>
              {Object.keys(this.props.code).map((name, i) => {
                return (
                  <p className="animationCode" key={i}>
                    <span className="text">{name}</span>
                      : <span className="text">{this.checkNum(this.props.code[name]) ? this.props.code[name] : "'" + this.props.code[name] + "'"}</span>{Object.keys(this.props.code).length !== i + 1 && ','}
                  </p>
                )
              })}</div>
            <span className="animationCode">&#125;,()=>&#123;</span>
            <div className="indent">
              <span className='animationCode'><span className="keyword">this</span>.<span className="function">setState</span>(&#123;<span className="text">view</span> : !<span className="keyword">this</span>.<span className="text">state</span>.<span className="text">view</span>&#125;)</span>
            </div>
            <span className="animationCode">&#125;);</span>
          </div>
          &#125;<br/>
          <span className="function">render</span>()&#123;
          <div className='indent'><span className="keyword">return</span> (<br/>
            <div className="indent">
            &lt;<span className="tag">div</span>&gt;<br/>
                <div className="indent">
                &#123;<span className="keyword">this</span>.<span className="text">state</span>.<span className="text">view</span> ? &lt;<span className="tag">p</span>&gt;<span className="text">content1</span>&lt;/<span className="tag">p</span>&gt; : &lt;<span className="tag">p</span>&gt;<span className="text">content2</span>&lt;/<span className="tag">p</span>&gt;&#125;<br />
                &lt;<span className="tag">button</span> <span className="keyword">onClick</span>=&#123;()=><span className="keyword">this</span>.<span className="function">animation</span>()&#125;&gt;<span className="text">change</span>&lt;/<span className="tag">button</span>&gt;
                </div>
            &lt;/<span className="tag">div</span>&gt;
            </div>)
          </div>
          &#125;
        </div>
        &#125;
      </div>
    );

    const VueCode = () => (
      <div>
        <span className="keyword">import</span> Vue <span className="keyword">from</span> <span className="string">'vue'</span>;<br/>
        <span className="keyword">import</span> &#123; <span className="animationCode">{this.props.name}</span> &#125; <span className="keyword">from</span> <span className="string">'blackout-animation'</span>;<br/>
        <br/>
        Vue.component(<span className="string">'SampleCode'</span>, &#123;<br/>
        <div className='indent'>
          data: <span className="function">function</span> ()  &#123;<br/>
          <div className='indent'>
          <span className="keyword">return</span> &#123; view: <span className="keyword">true</span> &#125;
          </div>
          &#125;,<br/>
          methods: &#123;
          <div className='indent'>
            animation : <span className="function">function</span> () &#123;
            <div className='indent'>
              <span className="animationCode"><span className="function">{this.props.name}</span>(&#123;</span>
              <div className='indent'>
                {Object.keys(this.props.code).map((name, i) => {
                  return (
                    <p className="animationCode" key={i}>
                      {name}
                      : {this.checkNum(this.props.code[name]) ? this.props.code[name] : "'" + this.props.code[name] + "'"}{Object
                        .keys(this.props.code)
                        .length !== i + 1 && ','}
                    </p>
                  )
                })}</div>
              <span className="animationCode">&#125;,()=>&#123;</span>
              <div className="indent">
                  <span className="animationCode">this.view = !this.view;</span>
              </div>
              <span className="animationCode">&#125;);</span>
            </div>
            &#125;
          </div>
          &#125;,<br/>
          template: <span className="string">'\</span>
          <div className='indent'>
          <span className="string">&lt;div&gt;\</span>
            <div className="indent">
              <span className="string">&lt;p v-if="view"&gt;content1&lt;/p&gt;\<br/>
              &lt;p v-else&gt;content2&lt;/p&gt;\<br/>
              &lt;button v-on:click="animation"&gt;change&lt;/button&gt;\</span>            
            </div>
            <span className="string">&lt;/div&gt;'</span>
          </div>
        </div>
        &#125;)
      </div>
    );
          
    return (
      <div className='codeArea'>
        {!sampleCode
          ? <div>
              <h2>install</h2>
              <div className='code'>
                <div>
                  npm install blackout-animation
                </div>
              </div>
              <h2>usage</h2>
              <div className='code'>
                <div>
                  import &#123; blackoutAnimation &#125; from 'blackout-animation'
                </div>
              </div>
            </div>
          : <div>
              <h2>Sample Code
                <p>
                  <button className={'react' + (react ? ' current' : '')} value='React' onClick={e=>this.changeView(e)}>React</button>
                  <button className={'vue' + (vue ? ' current' : '')} value='Vue' onClick={e=>this.changeView(e)}>Vue.js</button>
                </p>
              </h2>
              <div className={'code ' + this.state.codeView}>
                {react && <ReactCode/>}
                {vue && <VueCode/>}
              </div>
            </div>
          }
      </div>
    )
  }
}