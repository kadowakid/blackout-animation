import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SampleCode from './Code';
import Animations from './default'
import './css/example.scss';
import {
  blackoutAnimation,
  slideAnimation,
  barAnimation,
  stripeAnimation,
  circleAnimation,
  mosaicAnimation,
  accordionAnimation,
  squareAnimation,
  panelAnimation
} from '../src/index';

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
      blackoutAnimation(() => {
        this.setState({opening: false})
      });
    }, 1500);
  }
  handleBackToTop() {
    if (!this.state.sampleCode) 
      return false;
    const animations = [
      blackoutAnimation,
      slideAnimation,
      barAnimation,
      stripeAnimation,
      circleAnimation,
      mosaicAnimation,
      accordionAnimation,
      squareAnimation,
      panelAnimation
    ];
    const num = Math.floor(Math.random() * animations.length);
    animations[num](() => {
      this.setState({sampleCode: false})
    });
  }
  handleBlackoutAnimation() {
    const prop = {
      type: this.refs.blackoutType.value,
      transition: this.refs.blackoutTransition.value,
      interval: this.refs.blackoutInterval.value,
      color: this.refs.blackoutColor.value
    };
    blackoutAnimation(prop, () => {
      this.setState({sampleName: 'blackoutAnimation', sampleCode: prop})
    });
  }
  handleSlideAnimation() {
    const prop = {
      type: this.refs.slideType.value,
      transition: this.refs.slideTransition.value,
      interval: this.refs.slideInterval.value,
      color: this.refs.slideColor.value
    };
    slideAnimation(prop, () => {
      this.setState({sampleName: 'slideAnimation', sampleCode: prop})
    });
  }
  handleBarAnimation() {
    const prop = {
      type: this.refs.barType.value,
      elements: this.refs.barElements.value,
      transition: this.refs.barTransition.value,
      delay: this.refs.barDelay.value,
      interval: this.refs.barInterval.value,
      color: this.refs.barColor.value
    };
    barAnimation(prop, () => {
      this.setState({sampleName: 'barAnimation', sampleCode: prop})
    });
  }
  handleStripeAnimation() {
    const prop = {
      type: this.refs.stripeType.value,
      elements: this.refs.stripeElements.value,
      transition: this.refs.stripeTransition.value,
      interval: this.refs.stripeInterval.value,
      color: this.refs.stripeColor.value
    }
    stripeAnimation(prop, () => {
      this.setState({sampleName: 'stripeAnimation', sampleCode: prop})
    });
  }
  handleCircleAnimation() {
    const prop = {
      transition: this.refs.circleTransition.value,
      interval: this.refs.circleInterval.value,
      color: this.refs.circleColor.value
    }
    circleAnimation(prop, () => {
      this.setState({sampleName: 'circleAnimation', sampleCode: prop})
    });
  }
  handleMosaicAnimation() {
    const prop = {
      size: this.refs.mosaicSize.value,
      times: this.refs.mosaicTimes.value,
      transition: this.refs.mosaicTransition.value,
      delay: this.refs.mosaicDelay.value,
      interval: this.refs.mosaicInterval.value,
      color: this.refs.mosaicColor.value
    };
    mosaicAnimation(prop, () => {
      this.setState({sampleName: 'mosaicAnimation', sampleCode: prop})
    });
  }
  handleAccordionAnimation() {
    const prop = {
      type: this.refs.accordionType.value,
      elements: this.refs.accordionElements.value,
      transition: this.refs.accordionTransition.value,
      delay: this.refs.accordionDelay.value,
      interval: this.refs.accordionInterval.value,
      color: this.refs.accordionColor.value
    };
    accordionAnimation(prop, () => {
      this.setState({sampleName: 'accordionAnimation', sampleCode: prop})
    });
  }
  handleSquareAnimation() {
    const prop = {
      size: this.refs.squareSize.value,
      transition: this.refs.squareTransition.value,
      interval: this.refs.squareInterval.value,
      color: this.refs.squareColor.value
    };
    squareAnimation(prop, () => {
      this.setState({sampleName: 'squareAnimation', sampleCode: prop})
    });
  }
  handlePanelAnimation() {
    const prop = {
      size: this.refs.panelSize.value,
      transition: this.refs.panelTransition.value,
      delay: this.refs.panelDelay.value,
      interval: this.refs.panelInterval.value,
      color: this.refs.panelColor.value
    };
    panelAnimation(prop, () => {
      this.setState({sampleName: 'panelAnimation', sampleCode: prop})
    });
  }
  render() {
    const backToTop = this.state.sampleCode;
    return (
      <div className="container">
        {
          this.state.opening ?
          <div className='opBg'>
            <h1>
              Blackout<br/>Animation
            </h1>
          </div> :
          <div>
            <header>
              <h1
                className={backToTop
                ? 'back'
                : ''}
                onClick={() => this.handleBackToTop()}>Blackout<br/>Animation<br/>
                <span>for<br/>Single Page Application</span>
              </h1>
              <SampleCode name={this.state.sampleName} code={this.state.sampleCode}/>
            </header>
            <div className="contentWrap">
              <ul className="content">
                {Animations.map((animation, animations_index) => {
                  if (animation === false) 
                    return (<li key={animations_index}/>);
                  return (
                    <li key={animations_index}>
                      <h2>{animation.name}</h2>
                      <table>
                        <tbody>
                          {animation
                            .input
                            .map((prop, prop_index) => {
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
                      <button
                        onClick={animation
                        .button
                        .bind(this)}>start</button>
                    </li>
                  )
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
