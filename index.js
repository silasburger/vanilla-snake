document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const HEIGHT = 500;
  const WIDTH = 500;
  // document.addEventListener("keyDown", keyPress)

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, HEIGHT, WIDTH);

  class Snake {
    constructor(trail) {
      //[{x, y}]
      this.trail = trail;
      this.head = trail[0];
    }

    render() {
      ctx.fillStyle = 'green';
      for (let i = 0; i < this.trail.length; i++) {
        ctx.fillRect(this.trail.x, this.trail.y, 10, 10);
      }
    }
  }

  class Game {
    constructor(board) {
      this.board = board;
      
    }
    start() {

      const apple = new Apple({x: 20, y: 20});
      const snake = new Snake([{x: 100, y:100}, {x: 90, y: 90}, {x: 80, y: 80}]);
      const board = new Board('E', snake, apple);

    }

  }

  class Board {
    constructor(direction, snake, apple) {
      this.snake = snake;
      this.apple = apple;
      this.direction = direction;
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

    updateCoords(coords) {
      this.coords.y = Math.random() * HEIGHT;
      this.coords.x = Math.random() * WIDTH;
    }

    render() {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.coords.x, this.coords.y, 10, 10);
    }
  }

});
