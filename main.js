const getEl = (id) => document.getElementById(id);

const init = () => {
  const loadingPage = getEl('loading-page')
  const logoContainer = getEl('logo-container')
  
  logoContainer.children[0].classList.add('first-child')
  logoContainer.children[1].classList.add('second-child')
  logoContainer.children[2].classList.add('third-child')
  logoContainer.children[3].classList.add('fourth-child')
  logoContainer.style.transition= '3s'

  setTimeout(() => {
    logoContainer.style.transform= 'scale(5)'
}, 1); ///1500

    setTimeout(() => {
        loadingPage.classList.add("loading-page-hide");
        const container = getEl('container')
        container.style.display = 'block'
         checkOnScroll()
    }, 1);///3000

    setTimeout(() => {
      loadingPage.style.display = 'none'
  }, 1); ///3500
}

window.onload = () => {
    init();
    addFooterTekst()
}


let prevScrollpos = window.scrollY

window.onscroll  = function() {
  checkOnScroll()
};

let timeFixed;

const checkOnScroll = () => {

    const vh = document.documentElement.clientHeight;
    const childScroll = window.scrollY
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    console.log('checkOnScroll')
    console.log(childScroll)
    console.log(height)
    var mybutton = getEl("myBtn");
    if(timeFixed){
      clearTimeout(timeFixed)
    }
      if (childScroll > 20) {
        mybutton.style.display = "block";
        mybutton.style.animation = "opacity010 1s forwards";
      } else {
        mybutton.style.animation = "opacity101 1s forwards";
        timeFixed = setTimeout(() => {
          mybutton.style.display = "none";
        }, 1000);
      }
    

    const revealsLeft = document.querySelectorAll(".reveal-left");
    const revealsRight = document.querySelectorAll(".reveal-right");
    const revealsUp = document.querySelectorAll(".reveal-up");
    const revealsDown = document.querySelectorAll(".reveal-down");
    if(revealsLeft){
      for (let i = 0; i < revealsLeft.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealsLeft[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          revealsLeft[i].classList.add("active");
        }
      }
    }
    if(revealsRight){
      for (let i = 0; i < revealsRight.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealsRight[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          revealsRight[i].classList.add("active");
        }
      }
    }
    if(revealsUp){
      for (let i = 0; i < revealsUp.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealsUp[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          revealsUp[i].classList.add("active");
        } 
      }
    }
    if(revealsDown){
      for (let i = 0; i < revealsDown.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealsDown[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          revealsDown[i].classList.add("active");
        } 
      }
    }

    getEl("header").style.top = "0";
    const scrolled = (childScroll / height) * 100;
    getEl("myBar").style.width = scrolled + "%";

    if(childScroll < vh ){
        getEl("header").style.top = "-60px";
    } else if(childScroll < prevScrollpos){
      getEl("header").style.top = "-53px";
    } else{
      getEl("header").style.top = "0";
    }
    prevScrollpos = childScroll
}

const scrollToElement = (id) => {
    const choosenEl = getEl(id)
    choosenEl.scrollIntoView({behavior: "smooth"});
}

var events = new Events();
events.add = function(obj) {
  obj.events = { };
}
events.implement = function(fn) {
  fn.prototype = Object.create(Events.prototype);
}

function Events() {
  this.events = { };
}
Events.prototype.on = function(name, fn) {
  var events = this.events[name];
  if (events == undefined) {
    this.events[name] = [ fn ];
    this.emit('event:on', fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit('event:on', fn);
    }
  }
  return this;
}
Events.prototype.once = function(name, fn) {
  var events = this.events[name];
  fn.once = true;
  if (!events) {
    this.events[name] = [ fn ];
    this.emit('event:once', fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit('event:once', fn);
    }
  }
  return this;
}
Events.prototype.emit = function(name, args) {
  var events = this.events[name];
  if (events) {
    var i = events.length;
    while(i--) {
      if (events[i]) {
        events[i].call(this, args);
        if (events[i].once) {
          delete events[i];
        }
      }
    }
  }
  return this;
}
Events.prototype.unbind = function(name, fn) {
  if (name) {
    var events = this.events[name];
    if (events) {
      if (fn) {
        var i = events.indexOf(fn);
        if (i != -1) {
          delete events[i];
        }
      } else {
        delete this.events[name];
      }
    }
  } else {
    delete this.events;
    this.events = { };
  }
  return this;
}

var userPrefix;

var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  userPrefix = {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();

function bindEvent(element, type, handler) {
  if(element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent('on' + type, handler);
  }
}

function Viewport(data) {
  events.add(this);

  var self = this;

  this.element = data.element;
  this.fps = data.fps;
  this.sensivity = data.sensivity;
  this.sensivityFade = data.sensivityFade;
  this.touchSensivity = data.touchSensivity;
  this.speed = data.speed;

  this.lastX = 0;
  this.lastY = 0;
  this.mouseX = 0;
  this.mouseY = 0;
  this.distanceX = 0;
  this.distanceY = 0;
  this.positionX = 1122;
  this.positionY = 136;
  this.torqueX = 0;
  this.torqueY = 0;

  this.down = false;
  this.upsideDown = false;

  this.previousPositionX = 0;
  this.previousPositionY = 0;

  this.currentSide = 0;
  this.calculatedSide = 0;


  bindEvent(document, 'mousedown', function() {
    self.down = true;
  });

  bindEvent(document, 'mouseup', function() {
    self.down = false;
  });
  
  bindEvent(document, 'keyup', function() {
    self.down = false;
  });

  bindEvent(document, 'mousemove', function(e) {
    self.mouseX = e.pageX;
    self.mouseY = e.pageY;
  });

  bindEvent(document, 'touchstart', function(e) {

    self.down = true;
    e.touches ? e = e.touches[0] : null;
    self.mouseX = e.pageX / self.touchSensivity;
    self.mouseY = e.pageY / self.touchSensivity;
    self.lastX  = self.mouseX;
    self.lastY  = self.mouseY;
  });

  bindEvent(document, 'touchmove', function(e) {
    if(e.preventDefault) { 
      e.preventDefault();
    }

    if(e.touches.length == 1) {

      e.touches ? e = e.touches[0] : null;

      self.mouseX = e.pageX / self.touchSensivity;
      self.mouseY = e.pageY / self.touchSensivity;

    }
  });

  bindEvent(document, 'touchend', function(e) {
    self.down = false;
  });  

  setInterval(this.animate.bind(this), this.fps);

}
events.implement(Viewport);
Viewport.prototype.animate = function() {

  this.distanceX = (this.mouseX - this.lastX);
  this.distanceY = (this.mouseY - this.lastY);

  this.lastX = this.mouseX;
  this.lastY = this.mouseY;

  if(this.down) {
    this.torqueX = this.torqueX * this.sensivityFade + (this.distanceX * this.speed - this.torqueX) * this.sensivity;
    this.torqueY = this.torqueY * this.sensivityFade + (this.distanceY * this.speed - this.torqueY) * this.sensivity;
  }

  if(Math.abs(this.torqueX) > 1.0 || Math.abs(this.torqueY) > 1.0) {
    if(!this.down) {
      this.torqueX *= this.sensivityFade;
      this.torqueY *= this.sensivityFade;
    }

    this.positionY -= this.torqueY;

    if(this.positionY > 360) {
      this.positionY -= 360;
    } else if(this.positionY < 0) {
      this.positionY += 360;
    }

    if(this.positionY > 90 && this.positionY < 270) {
      this.positionX -= this.torqueX;

      if(!this.upsideDown) {
        this.upsideDown = true;
        this.emit('upsideDown', { upsideDown: this.upsideDown });
      }

    } else {

      this.positionX += this.torqueX;

      if(this.upsideDown) {
        this.upsideDown = false;
        this.emit('upsideDown', { upsideDown: this.upsideDown });
      }
    }

    if(this.positionX > 360) {
      this.positionX -= 360;
    } else if(this.positionX < 0) {
      this.positionX += 360;
    }

    if(!(this.positionY >= 46 && this.positionY <= 130) && !(this.positionY >= 220 && this.positionY <= 308)) {
      if(this.upsideDown) {
        if(this.positionX >= 42 && this.positionX <= 130) {
          this.calculatedSide = 3;
        } else if(this.positionX >= 131 && this.positionX <= 223) {
          this.calculatedSide = 2;
        } else if(this.positionX >= 224 && this.positionX <= 314) {
          this.calculatedSide = 5;
        } else {
          this.calculatedSide = 4;
        }
      } else {
        if(this.positionX >= 42 && this.positionX <= 130) {
          this.calculatedSide = 5;
        } else if(this.positionX >= 131 && this.positionX <= 223) {
          this.calculatedSide = 4;
        } else if(this.positionX >= 224 && this.positionX <= 314) {
          this.calculatedSide = 3;
        } else {
          this.calculatedSide = 2;
        }
      }
    } else {
      if(this.positionY >= 46 && this.positionY <= 130) {
        this.calculatedSide = 6;
      }

      if(this.positionY >= 220 && this.positionY <= 308) {
        this.calculatedSide = 1;
      }
    }

    if(this.calculatedSide !== this.currentSide) {
      this.currentSide = this.calculatedSide;
      this.emit('sideChange');
    }

  }

  this.element.style[userPrefix.js + 'Transform'] = 'rotateX(' + this.positionY + 'deg) rotateY(' + this.positionX + 'deg)';

  if(this.positionY != this.previousPositionY || this.positionX != this.previousPositionX) {
    this.previousPositionY = this.positionY;
    this.previousPositionX = this.positionX;

    this.emit('rotate');

  }

}
var viewport = new Viewport({
  element: document.getElementsByClassName('cube')[0],
  fps: 20,
  sensivity: .1,
  sensivityFade: .93,
  speed: 2,
  touchSensivity: 1.5
});

const changeActiveHobbieText = (activeHobbie) => {
  let textHobbie = getEl('hobbies-text')
  switch (activeHobbie) {
    case 'medicine':
      textHobbie.innerText = 'Health is the most important thing. I try to take care of my health through learning basic level of in the field of Western and Eastern medicine, in particular natural medicine. As a result, the quality of my work and life is higher.';
      break;
    case 'aviation':
      textHobbie.innerText = 'From childhood, I dreamed of flying by plane. In part, I was able to make my dream come true. Even though I am a programmer, the propeller in my head is still spinning.';
      break;
    case 'economy':
      textHobbie.innerText = 'Money does not bring happiness, but it can buy happiness. I believe that in life it is worth investing in yourself and in business, but you have to do it with your head on your neck. That is why I try to supplement my knowledge of economics on an ongoing basis.';
      break;
    case 'energy':
      textHobbie.innerText = 'The energy industry interests me due to the fact that I studied physics focusing on this industry, but also in my opinion it is the most important element of the modern world ... It is the foundation of our civilization.';
      break;
    case 'physics':
      textHobbie.innerText = 'Maybe I am no longer study physics and I am not a crazy scientist working in a secret laboratory. However I still try to be up to date with the latest discoveries in this field.';
      break;
    case 'trololo':
      textHobbie.innerText = 'Sense of humor, because you have to be positive in life!';
      break;
    default:
      break;
  }
}

function Cube(data) {
  var self = this;

  this.element = data.element;
  this.sides = this.element.getElementsByClassName('side');

  this.viewport = data.viewport;
  this.viewport.on('rotate', function() {
    self.rotateSides();
  });
  this.viewport.on('upsideDown', function(obj) {
    self.upsideDown(obj);
  });
  this.viewport.on('sideChange', function() {
    self.sideChange();
  });
}
Cube.prototype.rotateSides = function() {
  var viewport = this.viewport;
  if(viewport.positionY > 90 && viewport.positionY < 270) {
    this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX + viewport.torqueX) + 'deg)';
    this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 + viewport.torqueX) + 'deg)';
  } else {
    this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX - viewport.torqueX) + 'deg)';
    this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 - viewport.torqueX) + 'deg)';
  }
}
Cube.prototype.upsideDown = function(obj) {

  var deg = (obj.upsideDown == true) ? '180deg' : '0deg';
  var i = 5;

  while(i > 0 && --i) {
    this.sides[i].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + deg + ')';
  }
}
Cube.prototype.sideChange = function() {

  for(var i = 0; i < this.sides.length; ++i) {
    this.sides[i].getElementsByClassName('cube-image')[0].className = 'cube-image';    
  }

  this.sides[this.viewport.currentSide - 1].getElementsByClassName('cube-image')[0].className = 'cube-image active';
  const activeHobbie =  this.sides[this.viewport.currentSide - 1].getElementsByClassName('cube-image')[0].dataset.hobbie
  changeActiveHobbieText(activeHobbie)
}

new Cube({
  viewport: viewport,
  element: document.getElementsByClassName('cube')[0]
});

const scrollToTop = () => {
  const child = window
  child.scrollTo({top: 0, behavior: 'smooth'});
}

const  openVerticalMenu = () => {
  console.log('1')
}

const addFooterTekst = () => {
  let footerTekst = getEl('footer-tekst')
  footerTekst.innerText = `@${new Date().getFullYear()} designed by Netfusion Łukasz Nitkowski`
}

document.querySelector( "#retrobg-sun" ).onclick = () => {
  document.querySelector( "#retrobg" ).classList.toggle( "retrobg-shutdown" );
};