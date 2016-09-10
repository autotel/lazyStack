#LazyStack
http://autotel.co/2016/09/10/lazy-stacking/

> A snippet for infinite function stacking, and also for when you have time critical tasks that need to be interleaved with slow tasks that are not time critical.

# Explanation

I had a situation where I had a 3d rendered scene in a web browser. There were many procedures that were vital to be completed on time, such as updating the coordinates of each object in the scenery, or calculating the sizes before arranging the items. There were other tasks, however, where a delay wold not be a problem, like for example, setting a movement tween to an object. There was a situation where I had to arrange a hundred of 3d CSS elements in a grid. The critical task, was to figure out the grid of these elements, based on the screen size. From that point, starting the tweens needed not to happen at the same time. That is why I created this snippet: when you have time critical tasks that need to be interleaved with slow tasks that are not time critical. It also allows infinite task nesting, as the process doesn't get locked until completion, rather, it leaves them for the next frames.

<pre class="prettyprint">/* a function that adds itself to the stack. 
If you don't add it lazily, it would generate a stackoverflow error */
function randomStack(){
   lazyStack.add(randomStack);
}
</pre>

The inner working is very simple: the lazyStack object has an array that will contain all the functions to be performed in one side, and a function that will perform one of the tasks when called, and then remove the task from the array. This requires that you have repeating function such as setInterval, or preferably requestAnimationFrame

<pre class="prettyprint">function draw() {
    lazyStack.frame();
}
draw();
</pre>

If you want to make some tasks each frame, a simple way is to iterate the lazyStack frame:

<pre class="prettyprint">function draw() {
 for(var a=0; a<3;a++) lazyStack.frame();
}
draw();
</pre>

Albeit tweaking the snippet will be more efficient in general. This snippet allows also overwriting tasks, because many times, the result of some functions will make the previous results useless. For example, if you are getting x and y mouse coordinates lazily, probably you only want to get the latest one, and then there is no need to repeat the calculation. In this case, you provide the "name" parameter. When you provide the name parameter, the lazyStack will search for other function with the same name in the stack, and replace it.

<pre class="prettyprint">lazyStack.add(randomStack,"random");
</pre>

# Snippet

<pre class="prettyprint">
var lazyStack = (function() {
  //stores pairs containing a replacementindex in 0 and the callback in 1
  this.queue=[];
  this.add = function(action, replace) {
    if (replace) {
      var replaceIndex = this.queue.findIndex(function(element, index, array) {
        return element[0] == replace
      })
      if (replaceIndex > -1) {
        this.queue[replaceIndex] = [replace, action];
      } else {
        this.queue.push([replace, action]);
      }
    } else {
      this.queue.push([false, action]);
    }
  };
  this.frame = function() {
    if (this.queue.length > 0) {
      // console.log(this.queue.length+"run:"+this.queue[0][0]);
      var a = 0;
      this.queue[a][1]();
      this.queue.splice(a, 1);
    }
  }
  return this;
})();
</pre>

# Example

You can find the example at [github.com/autotel/lazyStack/blob/master/example.html](https://github.com/autotel/lazyStack/blob/master/example.html)

# Git repository

You can watch and fork this snippet at [github.com/autotel/lazyStack](https://github.com/autotel/lazyStack)
