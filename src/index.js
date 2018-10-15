const insertElement = () => {
  document.body.insertBefore(document.createElement('div'), document.body.firstChild);
  const elm = document.body.childNodes[0];
  elm.style.position = 'fixed';
  elm.style.zIndex = 2147483647;
  return elm;
}

const checkNum = num => {
  num = num ? String(num) : false;
  const regExp = /^[0-9]+$/;
  if (num && !num.match(regExp)) throw new Error(num + ' is not number.');
  return num && num.match(regExp);
}

const checkColor = color => {
  color = color ? String(color) : false;
  color = colorName[color] || color;
  const regExp = /((^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}))$)|((^rgba?\((\s*(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\s*,){2}(\s*(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5])\s*)(,\s*(0?(\.[1-9]+)?|1(\.0+)?)\s*)?)\))$)|(^hsla\((\d|[1-9]\d|[1-2]\d\d|3[0-5]\d|360)\,\s?((\d|[1-9]\d|100)\%\,\s?){2}(0|0?\.\d+|1|1\.0+)\)$)/;
  if (color && !color.match(regExp)) throw new Error(color + ' is not colorcode.');
  return color && color.match(regExp);
}

const changeColorCode = color => {
  color = String(color);
  color = colorName[color] || color;
  const regExpShort16 = color.match(/(#.{3})$/);
  const regExpRgb = color.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s?,\s?((0?\.\d+)|0|1(\.0)?)?\s*/);
  const regExpHsla = color.match(/^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s?,\s?((0?\.\d+)|0|1(\.0)?)\s*/);
  color = regExpShort16 ? color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3) : color;
  const regExp16 = color.match(/#(..)(..)(..)/);
  const color1 = regExpHsla ? regExpHsla[1] : regExpRgb ? regExpRgb[1] : parseInt(regExp16[1], 16);
  const color2 = regExpHsla ? regExpHsla[2] : regExpRgb ? regExpRgb[2] : parseInt(regExp16[2], 16);
  const color3 = regExpHsla ? regExpHsla[3] : regExpRgb ? regExpRgb[3] : parseInt(regExp16[3], 16);
  const color4 = regExpHsla ? regExpHsla[4] : regExpRgb ? regExpRgb[4] || false : false;
  return [color1, color2, color3, color4];
}

const pre = 50;

export const blackoutAnimation = (property, callback) => {
  callback = !callback && typeof property === 'function' ? property : callback;
  property = typeof property !== 'object' ? {} : property;
  const type = property.type && parseInt(property.type) === 2 ? property.type : 1,
    transition = checkNum(property.transition) ? parseInt(property.transition) : 1000,
    interval = checkNum(property.interval) ? parseInt(property.interval) : 300,
    color = checkColor(property.color) ? property.color : '#000';

  setTimeout(() => {
    callback && callback();
  }, transition + pre)

  const vertical = type === 1;
  const colorCode = changeColorCode(color);
  const colorCodeType = color.match(/^hsla/) ? 'hsla' : 'rgba';

  const elm = insertElement();
  const blackoutHeight = window.innerHeight;
  const blackoutWidth = window.innerWidth;
  const baseStyle = {
    background: color,
    position: 'fixed',
    transition: transition / 1000 + 's'
  };

  [...Array(2)].forEach((none, index) => {
    elm.appendChild(document.createElement('div'));
    const current = elm.childNodes[index];
    let direction, blackoutTop, blackoutLeft, blackoutBg;
    if (vertical) {
      direction = !index ? '180deg' : '0deg';
      blackoutTop = !index ? -blackoutHeight + 'px' : blackoutHeight + 'px';
      blackoutLeft = 0
    } else {
      direction = !index ? '90deg' : '270deg';
      blackoutTop = 0;
      blackoutLeft = !index ? -blackoutWidth + 'px' : blackoutWidth + 'px';
    }
    blackoutBg = 'linear-gradient(' + direction + ', ' + colorCodeType + '(' + colorCode[0] + ',' + colorCode[1] + ',' + colorCode[2] + ',' + (colorCode[3] || 1) + ') 50%, ' + colorCodeType + '(' + colorCode[0] + ',' + colorCode[1] + ',' + colorCode[2] + ',0))';
    const specStyle = {
      height: blackoutHeight + 'px',
      width: blackoutWidth + 'px',
      top: blackoutTop,
      left: blackoutLeft,
      background: blackoutBg
    };
    Object.keys(baseStyle).forEach(function (prop) {
      current.style[prop] = baseStyle[prop];
    });
    Object.keys(specStyle).forEach(function (prop) {
      current.style[prop] = specStyle[prop];
    });
    [...Array(2)].forEach((none, animation_index) => {
      setTimeout(() => {
        vertical ? current.style.top = !animation_index ? 0 : blackoutTop : current.style.left = !animation_index ? 0 : blackoutLeft;
      }, !animation_index ? pre : transition + interval + pre)
    })
  })
  
  setTimeout(() => {
    elm.parentNode.removeChild(elm)
  }, transition * 2 + interval + pre)
}

export const slideAnimation = (property, callback) => {
  callback = !callback && typeof property === 'function' ? property : callback;
  property = typeof property !== 'object' ? {} : property;
  const type = parseInt(property.type) >= 1 && parseInt(property.type) <= 4 ? parseInt(property.type) : 1,
    transition = checkNum(property.transition) ? parseInt(property.transition) : 500,
    interval = checkNum(property.interval) ? parseInt(property.interval) : 300,
    color = checkColor(property.color) ? property.color : '#000';

  setTimeout(() => {
    callback && callback();
  }, transition + pre)

  const elm = insertElement();
  const slideHeight = window.innerHeight;
  const slideWidth = window.innerWidth;
  const baseStyle = {
    background: color,
    position: 'fixed',
    transition: transition / 1000 + 's',
    height: slideHeight + 'px',
    width: slideWidth + 'px'
  };
  elm.appendChild(document.createElement('div'));
  const current = elm.childNodes[0];
  const right = type === 1;
  const left = type === 2;
  const down = type === 3;
  const up = type === 4;
  const specStyle = {
    top: right || left ? 0 : down ? -slideHeight + 'px' : slideHeight + 'px',
    left: down || up ? 0 : right ? -slideWidth + 'px' : slideWidth + 'px',
  };
  Object.keys(baseStyle).forEach(function (prop) {
    current.style[prop] = baseStyle[prop];
  });
  Object.keys(specStyle).forEach(function (prop) {
    current.style[prop] = specStyle[prop];
  });
  [...Array(2)].forEach((none, animation_index) => {
    setTimeout(() => {
      if (!animation_index) {
        current.style.top = 0;
        current.style.left = 0;
      } else {
        current.style.top = right || left ? 0 : down ? slideHeight + 'px' : -slideHeight + 'px';
        current.style.left = down || up ? 0 : right ? slideWidth + 'px' : -slideWidth + 'px';
      }
    }, !animation_index ? pre : transition + interval + pre)
  })

  setTimeout(() => {
    elm.parentNode.removeChild(elm)
  }, delay * 2 + transition * 2 + delay + pre)
}

export const barAnimation = (property, callback) => {
  callback = !callback && typeof property === 'function' ? property : callback;
  property = typeof property !== 'object' ? {} : property;
  const type = parseInt(property.type) >= 1 && parseInt(property.type) <= 4 ? parseInt(property.type) : 1,
    elements = checkNum(property.elements) ? parseInt(property.elements) : 5,
    transition = checkNum(property.transition) ? parseInt(property.transition) : 500,
    delay = checkNum(property.delay) ? parseInt(property.delay) : 500,
    interval = checkNum(property.interval) ? parseInt(property.interval) : 300,
    color = checkColor(property.color) ? property.color : '#000';

  setTimeout(() => {
    callback && callback();
  }, transition + delay + pre)

  const right = type === 1;
  const left = type === 2;
  const down = type === 3;
  const up = type === 4;

  const elm = insertElement();
  const barHeight = right || left ? window.innerHeight / elements : window.innerHeight;
  const barWidth = down || up ? window.innerWidth / elements : window.innerWidth
  const baseStyle = {
    background: color,
    position: 'fixed',
    transition: transition / 1000 + 's'
  };

  [...Array(elements)].forEach((none, index) => {
    elm.appendChild(document.createElement('div'));
    const current = elm.childNodes[index];
    const specStyle = {
      height: Math.ceil(barHeight) + 'px',
      width: Math.ceil(barWidth) + 'px',
      top: down ? -barHeight + 'px' : up ? barHeight + 'px' : barHeight * index + 'px',
      left: right ? -barWidth + 'px' : left ? barWidth + 'px' : barWidth * index + 'px'
    };

    Object.keys(baseStyle).forEach(function (prop) {
      current.style[prop] = baseStyle[prop];
    });
    Object.keys(specStyle).forEach(function (prop) {
      current.style[prop] = specStyle[prop];
    });

    [...Array(2)].forEach((none, animation_index) => {
      setTimeout(() => {
        if (!animation_index) {
          right || left ? current.style.left = 0 : current.style.top = 0;
        } else {
          if (right || left) {
            current.style.left = right ? barWidth + 'px' : -barWidth + 'px';
          } else {
            current.style.top = down ? barHeight + 'px' : -barHeight + 'px';
          }
        }
      }, !animation_index ? delay / elements * index + pre : delay + transition + interval + delay / elements * index + pre)
    })
  })

  setTimeout(() => {
    elm.parentNode.removeChild(elm)
  }, delay * 2 + transition * 2 + delay + pre)
}

export const stripeAnimation = (property, callback) => {
  callback = !callback && typeof property === 'function' && property;
  property = typeof property !== 'object' ? {} : property;
  const type = parseInt(property.type) === 2 ? parseInt(property.type) : 1,
    elements = checkNum(property.elements) ? parseInt(property.elements) : 10,
    transition = checkNum(property.transition) ? parseInt(property.transition) : 1000,
    interval = checkNum(property.interval) ? parseInt(property.interval) : 300,
    color = checkColor(property.color) ? property.color : '#000';

  setTimeout(() => {
    callback && callback();
  }, transition + pre)

  const elm = insertElement();
  const horizonal = type === 1;
  const stripeHeight = horizonal ? window.innerHeight / elements : window.innerHeight;
  const stripeWidth = !horizonal ? window.innerWidth / elements : window.innerWidth;
  const baseStyle = {
    background: color,
    position: 'fixed',
    transition: transition / 1000 + 's'
  };

  [...Array(elements)].forEach((stripe, index) => {
    elm.appendChild(document.createElement('div'));
    const even = index % 2 === 0;
    const current = elm.childNodes[index];
    const specStyle = {
      height: Math.ceil(stripeHeight) + 'px',
      width: Math.ceil(stripeWidth) + 'px',
      top: horizonal ? stripeHeight * index + 'px' : even ? stripeHeight + 'px' : -stripeHeight + 'px',
      left: !horizonal ? stripeWidth * index + 'px' : even ? stripeWidth + 'px' : -stripeWidth + 'px'
    };
    Object.keys(baseStyle).forEach((prop) => {
      current.style[prop] = baseStyle[prop];
    });
    Object.keys(specStyle).forEach((prop) => {
      current.style[prop] = specStyle[prop];
    });
    [...Array(2)].forEach((none, animation_index) => {
      setTimeout(() => {
        if (horizonal) {
          current.style.left = !animation_index ? 0 : even ? -stripeWidth + 'px' : stripeWidth + 'px';
        } else {
          current.style.top = !animation_index ? 0 : even ? -stripeHeight + 'px' : stripeHeight + 'px';
        }
      }, !animation_index ? pre : interval + transition + pre);
    })
  })

  setTimeout(() => {
    elm.parentNode.removeChild(elm)
  }, interval * 2 + transition * 2 + pre)
}

export const circleAnimation = (property, callback) => {
  callback = !callback && typeof property === 'function' ? property : callback;
  property = typeof property !== 'object' ? {} : property;
  const transition = checkNum(property.transition) ? parseInt(property.transition) : 700,
    interval = checkNum(property.interval) ? parseInt(property.interval) : 300,
    color = checkColor(property.color) ? property.color : '#000';

  setTimeout(() => {
    callback && callback();
  }, transition + pre)

  const elm = insertElement();
  const diameter = window.innerHeight > window.innerWidth ? window.innerHeight * 1.5 : window.innerWidth * 1.5;
  const baseStyle = {
    position: 'fixed',
    width: diameter + 'px',
    height: diameter + 'px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  }
  Object.keys(baseStyle).forEach(function (prop) {
    elm.style[prop] = baseStyle[prop];
  });
  elm.appendChild(document.createElement('div'));
  const innerElm = elm.childNodes[0];
  innerElm.style.position = 'relative';
  innerElm.style.width = innerElm.style.height = '100%';
  [...Array(5)].forEach(() => innerElm.appendChild(document.createElement('div')))

  innerElm.childNodes.forEach((el, index) => {
    const innerStyle = {
      position: 'absolute',
      transition: transition / 1000 + 's',
      width: index === 0 || index === 1 || index === 3 ? diameter + 'px' : 0,
      height: index === 0 || index === 2 || index === 4 ? diameter + 'px' : 0,
      top: index === 0 ? '50%' : index === 1 || index === 2 || index === 4 ? 0 : 'none',
      left: index === 0 ? '50%' : index === 1 || index === 3 || index === 4 ? 0 : 'none',
      right: index === 2 ? 0 : 'none',
      bottom: index === 3 ? 0 : 'none',
      transform: index === 0 ? 'translate(-50%,-50%) scale(1.03)' : 'none',
      background: index === 0 ? 'radial-gradient(circle farthest-side, transparent 97%,' + color + ' 97%)' : color
    };
    Object.keys(innerStyle).forEach((prop) => {
      el.style[prop] = innerStyle[prop];
    });
    [...Array(2)].forEach((none, animation_index) => {
      setTimeout(() => {
        el.style.width = !animation_index ? index === 0 ? 0 : index % 2 === 0 ? Math.ceil(diameter / 2) + 'px' : diameter + 'px' : index === 2 || index === 4 ? 0 : diameter + 'px';
        el.style.height = !animation_index ? index === 0 ? 0 : index % 2 === 1 ? Math.ceil(diameter / 2) + 'px' : diameter + 'px' : index === 1 || index === 3 ? 0 : diameter + 'px';
      }, !animation_index ? pre : transition + interval + pre);
    });
  })

  setTimeout(() => {
    elm.parentNode.removeChild(elm)
  }, transition * 2 + interval + pre);
}

export const mosaicAnimation = (property, callback) => {
  callback = !callback && typeof property === 'function' ? property : callback;
  property = typeof property !== 'object' ? {} : property;
  const size = checkNum(property.size) ? parseInt(property.size) : 30,
    times = checkNum(property.times) ? parseInt(property.times) : 20,
    transition = checkNum(property.transition) ? parseInt(property.transition) : 0,
    delay = checkNum(property.delay) ? parseInt(property.delay) : 1000,
    interval = checkNum(property.interval) ? parseInt(property.interval) : 300,
    color = checkColor(property.color) ? property.color : '#000';

  setTimeout(() => {
    callback && callback();
  }, transition + delay + pre)

  const elm = insertElement();
  const col = Math.ceil(window.innerWidth / size);
  const row = Math.ceil(window.innerHeight / size);
  const items = Math.ceil(col * row / times);
  [...Array(col * row)].forEach(() => elm.appendChild(document.createElement('div')))

  const baseStyle = {
    position: 'fixed',
    width: size + 'px',
    height: size + 'px',
    background: color,
    transition: transition / 1000 + 's',
    opacity: 0
  };

  elm.childNodes.forEach((el, index) => {
    const specStyle = {
      left: (index % col) * size + 'px',
      top: Math.floor(index / col) * size + 'px'
    };

    Object.keys(baseStyle).forEach(prop => {
      el.style[prop] = baseStyle[prop];
    })
    Object.keys(specStyle).forEach(prop => {
      el.style[prop] = specStyle[prop];
    })
  });

  let shuffle = [...Array(row * col)].map((none, index) => {
    return index
  });

  for (let i = shuffle.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    let tmp = shuffle[i];
    shuffle[i] = shuffle[r];
    shuffle[r] = tmp;
  }

  [...Array(2)].forEach((none, animation_index) => {
    [...Array(times)].forEach((none, times_index) => {
      setTimeout(() => {
        [...Array(items)].forEach((none, items_index) => {
          if (elm.childNodes[items_index + times_index * items] !== undefined)
            elm.childNodes[shuffle[items_index + times_index * items]].style.opacity = !animation_index ? 1 : 0;
        })
      }, !animation_index ? delay / times * times_index : delay + transition + interval + delay / times * times_index)
    });
  });

  setTimeout(() => {
    elm.parentNode.removeChild(elm)
  }, delay * 2 + transition * 2 + interval)
}

export const accordionAnimation = (property, callback) => {
  callback = !callback && typeof property === 'function' ? property : callback;
  property = typeof property !== 'object' ? {} : property;
  const type = parseInt(property.type) === 2 ? parseInt(property.type) : 1,
    elements = checkNum(property.elements) ? parseInt(property.elements) : 10,
    transition = checkNum(property.transition) ? parseInt(property.transition) : 500,
    delay = checkNum(property.delay) ? parseInt(property.delay) : 500,
    interval = checkNum(property.interval) ? parseInt(property.interval) : 300,
    color = checkColor(property.color) ? property.color : '#000';

  setTimeout(() => {
    callback && callback();
  }, transition + delay + pre)

  const elm = insertElement();
  const accordionWidth = window.innerWidth / elements;
  const baseStyle = {
    background: color,
    position: 'fixed',
    transition: transition / 1000 + 's',
    opacity: 0,
    top: 0,
    height: window.innerHeight + 'px',
    width: Math.ceil(accordionWidth) + 'px'
  };
  const ltr = type === 1;
  [...Array(elements)].forEach((none, index) => {
    elm.appendChild(document.createElement('div'));
    const current = elm.childNodes[index];

    const specStyle = {
      left: ltr ? accordionWidth * index + 'px' : 'none',
      right: !ltr ? accordionWidth * index + 'px' : 'none'
    };

    Object.keys(baseStyle).forEach(function (prop) {
      current.style[prop] = baseStyle[prop];
    });
    Object.keys(specStyle).forEach(function (prop) {
      current.style[prop] = specStyle[prop];
    });

    [...Array(2)].forEach((none, animation_index) => {
      setTimeout(() => {
        current.style.opacity = !animation_index ? 1 : 0;
      }, !animation_index ? delay / elements * index + pre : delay + transition + interval + delay / elements * index + pre);
    })
  })

  setTimeout(() => {
    elm.parentNode.removeChild(elm)
  }, delay * 2 + transition * 2 + interval + pre)
}

export const squareAnimation = (property, callback) => {
  callback = !callback && typeof property === 'function' ? property : callback;
  property = typeof property !== 'object' ? {} : property;
  const size = checkNum(property.size) ? parseInt(property.size) : 100,
    transition = checkNum(property.transition) ? parseInt(property.transition) : 700,
    interval = checkNum(property.interval) ? parseInt(property.interval) : 300,
    color = checkColor(property.color) ? property.color : '#000';

  setTimeout(() => {
    callback && callback();
  }, transition + pre)

  const elm = insertElement();
  const col = Math.ceil(window.innerWidth / size);
  const row = Math.ceil(window.innerHeight / size);
  [...Array(col * row)].forEach(() => elm.appendChild(document.createElement('div')))

  const baseStyle = {
    position: 'fixed',
    width: size + 'px',
    height: size + 'px',
    transition: transition / 1000 + 's',
    background: color,
    transform: 'scale(0)'
  };

  elm.childNodes.forEach((el, index) => {
    const specStyle = {
      left: (index % col) * size + 'px',
      top: Math.floor(index / col) * size + 'px'
    };

    Object.keys(baseStyle).forEach(prop => {
      el.style[prop] = baseStyle[prop];
    });
    Object.keys(specStyle).forEach(prop => {
      el.style[prop] = specStyle[prop];
    });

    [...Array(2)].forEach((none, index) => {
      setTimeout(() => {
        el.style.transform = !index ? 'scale(1)' : 'scale(0)';
      }, !index ? pre : transition + interval + pre)
    })
  });

  setTimeout(() => {
    elm.parentNode.removeChild(elm)
  }, transition * 2 + interval + pre)
}

export const panelAnimation = (property, callback) => {
  callback = !callback && typeof property === 'function' ? property : callback;
  property = typeof property !== 'object' ? {} : property;
  const size = checkNum(property.size) ? parseInt(property.size) : 200,
    transition = checkNum(property.transition) ? parseInt(property.transition) : 700,
    delay = checkNum(property.delay) ? parseInt(property.delay) : 1000,
    interval = checkNum(property.interval) ? parseInt(property.interval) : 300,
    color = checkColor(property.color) ? property.color : '#000';

  setTimeout(() => {
    callback && callback();
  }, transition + delay + pre)

  const elm = insertElement();
  const col = Math.ceil(window.innerWidth / size);
  const row = Math.ceil(window.innerHeight / size);
  const specDelay = delay / (col * row);
  [...Array(col * row)].forEach(() => elm.appendChild(document.createElement('div')))

  const baseStyle = {
    position: 'fixed',
    width: size + 'px',
    height: size + 'px',
    transition: transition / 1000 + 's',
    background: color,
    transform: 'rotateY(90deg)',
    transformStyle: 'preserve-3d'
  };

  elm.childNodes.forEach((el, index) => {
    const specStyle = {
      left: (index % col) * size + 'px',
      top: Math.floor(index / col) * size + 'px'
    };

    Object.keys(baseStyle).forEach(prop => {
      el.style[prop] = baseStyle[prop];
    });
    Object.keys(specStyle).forEach(prop => {
      el.style[prop] = specStyle[prop];
    });

    [...Array(2)].forEach((none, animation_index) => {
      setTimeout(() => {
        el.style.transform = !animation_index ? 'rotateY(360deg)' : 'rotateY(90deg)';
      }, !animation_index ? pre + specDelay * index : transition + delay + interval + pre + specDelay * index)
    })
  });

  setTimeout(() => {
    elm.parentNode.removeChild(elm)
  }, transition * 2 + interval + delay * 2 + pre)
}

const colorName = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brass: '#b5a642',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coolcopper: '#d98719',
  copper: '#bf00df',
  coral: '#ff7f50',
  cornflower: '#bfefdf',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkbrown: '#da0b00',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dodgerblue: '#1e90ff',
  feldsper: '#fed0e0',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  lavender: '#e6e6fa',
  lavender: '#e6e6fa',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  red: '#ff0000',
  richblue: '#0cb0e0',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
}