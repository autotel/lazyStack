
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
