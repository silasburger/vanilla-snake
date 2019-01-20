document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const HEIGHT = 500;
  const WIDTH = 500;

  class Snake {
    constructor(trail) {
      //[{x, y}]
      this.trail = trail;
    }

    render() {
      ctx.fillStyle = 'green';
      for (let i = 0; i < this.trail.length; i++) {
        ctx.fillRect(this.trail.x, this.trail.y, 10, 10);
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
        { x: 100, y: 100 },
        { x: 90, y: 90 },
        { x: 80, y: 80 }
      ]);
      this.apple = new Apple({ x: 20, y: 20 });
      this.direction = 'E';
      this.intervalId = setInterval(this.tick, 1000 / 15);
      this.alive = true;
      document.addEventListener('keydown', this.changeDirection);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, HEIGHT, WIDTH);
    }

    tick() {
      //update coords of snake
      //check if snake is on apple
      //if so update apple coords
      //else pop
      this.move();

      //check if snake is eating itself
      this.checkTrail();

      //render apple if eaten
      if (this._newApple) {
        this._newApple = false;
        this.apple.render();
      }

      //render snake
      this.snake.render();
    }

    checkTrail() {
      if (
        this.trail[0].x > WIDTH ||
        this.trail[0].x < 0 ||
        this.trail[0].y > HEIGHT ||
        this.trail[0].y < 0
      ) {
        this.alive = false;
        clearInterval(this.intervalId);
        document.removeEventListener('keydown', this.changeDirection);
      }
    }

    move() {
      const head = this.snake.trial[0];
      switch (this.direction) {
        case 'E':
          this.snake.trail.push({ x: head.x + 10, y: head.y });
          break;

        case 'N':
          this.snake.trail.push({ x: head.x, y: head.y + 10 });
          break;

        case 'W':
          this.snake.trail.push({ x: head.x - 10, y: head.y });
          break;

        case 'S':
          this.snake.trail.push({ x: head.x, y: head.y - 10 });
          break;
      }
      if (
        this.snake.trail[0].x === this.apple.coords.x &&
        this.snake.trail[0].y === this.apple.coords.y
      ) {
        this.snake.trail.pop();
      } else {
        this.apple.updateCoords();
        this._newApple = true;
      }
    }

    changeDirection(event) {
      switch (event.keyCode) {
        case 37:
          this.direction = 'E';
          break;
        case 38:
          this.direction = 'N';
          break;
        case 39:
          this.direction = 'W';
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
      this.coords.y = Math.random() * HEIGHT;
      this.coords.x = Math.random() * WIDTH;
    }

    render() {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.coords.x, this.coords.y, 10, 10);
    }
  }

  const game = new Game();
});
