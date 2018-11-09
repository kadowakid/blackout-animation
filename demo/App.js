import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SampleCode from './Code';
import Animations from './default'
import './css/example.scss';
import * as blackout from '../src';

const blankNum = Animations.length % 3;
blankNum && [...Array(blankNum)].forEach(() => Animations.push(false));

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      sampleCode: false,
      opening: true
    }
  }
  componentDidMount(){
    setTimeout(() => {
      blackout.blackoutAnimation(() => {
        this.setState({opening: false})
      });
    }, 1500);
  }
  handleBackToTop() {
    if (!this.state.sampleCode) return false;
    const num = Math.floor(Math.random() * Animations.length);
    const animation = blackout[Animations[num].name];
    animation(() => {
      this.setState({sampleCode: false})
    });
  }
  handleAnimation(animationProps,animationName) {
    let prop = {};
    animationProps.forEach(animationProp =>{
      prop[animationProp.name] = this.refs[animationProp.ref].value
    })
    const animation = blackout[animationName];
    animation(prop, () => {
      this.setState({sampleName: animationName, sampleCode: prop})
    })
  }
  render() {
    const backToTop = this.state.sampleCode;
    return (
      <div className="container">
        {
          this.state.opening ?
          <div className='opBg'>
            <h1>Blackout<br/>Animation</h1>
          </div> :
          <div>
            <header>
              <h1
                className={backToTop ? 'back' : ''}
                onClick={() => this.handleBackToTop()}>Blackout<br/>Animation<br/>
                <span>for<br/>Single Page Application</span>
              </h1>
              <SampleCode name={this.state.sampleName} code={this.state.sampleCode}/>
            </header>
            <div className="contentWrap">
              <ul className="content">
                {Animations.map((animation, animations_index) => {
                  return animation ? 
                  (
                    <li key={animations_index}>
                      <h2>{animation.name}</h2>
                      <table>
                        <tbody>
                          {animation.input.map((prop, prop_index) => {
                              return (
                                <tr key={prop_index}>
                                  <th>{prop.name}</th>
                                  <td><input type={prop.type} defaultValue={prop.def} ref={prop.ref}/></td>
                                  <td className="remark">{prop.remark}</td>
                                </tr>
                              )
                            })}
                        </tbody>
                      </table>
                      <button onClick={()=>this.handleAnimation(animation.input,animation.name)}>start</button>
                    </li>
                  ) :
                  (<li key={animations_index}/>)
                })}
              </ul>
            </div>
            <footer></footer>
          </div>
        }
      </div>
    );
  }
}

ReactDOM.render(
  <App/>, document.getElementById('app'));
