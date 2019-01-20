document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const HEIGHT = 500;
  const WIDTH = 500;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, HEIGHT, WIDTH);

  class Snake {
    constructor(trail) {
      //[{x, y}]
      this.trail = trail;
    }

    render() {
      ctx.fillStyle = 'green';
      for (let i = 0; i < this.trail.length; i++) {
        ctx.fillRect(this.trail[i].x, this.trail[i].y, 8, 8);
      }
    }
  }

  class Game {
    constructor() {
      this.started = false;
      this.gameNumber = 0;
      this.start = this.start.bind(this);
      document.addEventListener('keydown', this.start);
    }
    start(event) {
      if (!this.started && event.keyCode === 32) {
        this.board = new Board();
      }
    }
  }

  class Board {
    constructor() {
      this.snake = new Snake([
        { x: 250, y: 250 },
        { x: 260, y: 250 },
        { x: 270, y: 250 }
      ]);
      this.apple = new Apple({ x: 20, y: 20 });
      this.direction = 'E';
      this.tick = this.tick.bind(this);
      this.changeDirection = this.changeDirection.bind(this);
      this.intervalId = setInterval(this.tick, 1000 / 15);
      this.alive = true;
      document.addEventListener('keydown', this.changeDirection);
    }

    tick() {
      console.log('tick', this.direction, this.apple.coords);
      //update coords of snake
      //check if snake is on apple
      //if so update apple coords
      //else pop
      this.move();

      //check if snake is eating itself
      this.checkTrail();

      //render canvas
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, HEIGHT, WIDTH);

      //render apple if eaten
      this.apple.render();

      //render snake
      this.snake.render();
    }

    checkTrail() {
      if (
        this.snake.trail[0].x > WIDTH ||
        this.snake.trail[0].x < 0 ||
        this.snake.trail[0].y > HEIGHT ||
        this.snake.trail[0].y < 0
      ) {
        this.alive = false;
        clearInterval(this.intervalId);
        document.removeEventListener('keydown', this.changeDirection);
      }
    }

    move() {
      let head = this.snake.trail[0];
      switch (this.direction) {
        case 'E':
          this.snake.trail.unshift({ x: head.x + 10, y: head.y });
          break;

        case 'N':
          this.snake.trail.unshift({ x: head.x, y: head.y - 10 });
          break;

        case 'W':
          this.snake.trail.unshift({ x: head.x - 10, y: head.y });
          break;

        case 'S':
          this.snake.trail.unshift({ x: head.x, y: head.y + 10 });
          break;
      }
      if (
        this.snake.trail[0].x === this.apple.coords.x &&
        this.snake.trail[0].y === this.apple.coords.y
      ) {
        this.apple.updateCoords();
      } else {
        this.snake.trail.pop();
      }
    }

    changeDirection(event) {
      switch (event.keyCode) {
        case 37:
          this.direction = 'W';
          break;
        case 38:
          this.direction = 'N';
          break;
        case 39:
          this.direction = 'E';
          break;
        case 40:
          this.direction = 'S';
          break;
      }
    }
  }

  class Apple {
    constructor(coords) {
      // {
      //   x,
      //   y
      // }
      this.coords = coords;
    }

    updateCoords() {
      this.coords.y = Math.round((Math.random() * (480)+10)/10) * 10;
      this.coords.x = Math.round((Math.random() * (480)+10)/10) * 10;
    }

    render() {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.coords.x, this.coords.y, 8, 8);
    }
  }

  const game = new Game();
});
