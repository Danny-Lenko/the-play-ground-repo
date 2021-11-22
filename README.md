# the-play-ground-repo

Here I'm gonna be practicing coding

## I will start with a bit of a snake game

### What I've learned section

1) The way to render snake on the grid (adds styling to grid's indexes in accordance with the snake array elements' values)
```js
snake.forEach( (index) => { grid[index].classList.add('snake') });
```

2) An example of how to listen to keyboard events (used to control a snake)
```js
function controlSnake(event) {
   if (event.key === 'ArrowDown' || event.key === 'Down') {
      direction = 10;
   }
}
// the event listener has to be added
document.addEventListener('keyup', controlSnake);
```

### Useful resources

- [Element.append()](https://developer.mozilla.org/ru/docs/Web/API/Element/append) - the article helped me in the grid construction;
- [Element.classList.contains()](https://developer.mozilla.org/ru/docs/Web/API/Element/classList) - the method used to prevent apple's appearance inside the snake;

- [Git + GitHub](https://www.youtube.com/watch?v=RGOj5yH7evk) - the basic git commands (Youtube).
- [The Markdown Guide](https://www.markdownguide.org/) - for more help with writing markdown (Article).


### the plan has been completed
Now I try merging two branches from different repositories.
