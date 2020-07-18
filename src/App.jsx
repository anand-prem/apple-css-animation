import React from 'react';
import './App.css';

const frameCount = 148;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.html = document.documentElement;
    this.img = new Image();
  }

  currentFrame = (index) => `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`;

  updateImage = (index) => {
    if (index >= frameCount || index <= 0) {
      return;
    }
    this.img.src = this.currentFrame(index);
    this.context.drawImage(this.img, 0, 0);
  }

  handleScroll = () => {
    const scrollTop = this.html.scrollTop;
    const maxScrollTop = this.html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => this.updateImage(frameIndex + 1))
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = this.currentFrame(i);
    }
    this.context = this.canvasRef.current.getContext('2d');
    this.img.src = this.currentFrame(1); // we'll make this dynamic in the next step, for now we'll just load image 1 of our sequence
    this.img.onload= () => this.context.drawImage(this.img, 0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <>
        <canvas ref={this.canvasRef} width={1158} height={770}/>
        <div>Hello How Are You</div>
      </>
    );
  }
}
