window.onload = TestHelper.main;

var tests = (function () {
  var m1 = mat4.create();
  var m2 = mat4.create();
  var tm = mat4.create();
  var t = vec3.create();
  var v = vec3.create();

  function randomMatrix(m) { // reuse matrix or else stack overflow!
    mat4.identity(m);
    vec3.setValues(t, pseudoRandom(), pseudoRandom(), pseudoRandom());
    var axis = vec3.normalize(t);
    mat4.rotate(tm, m, axis, pseudoRandom());

    vec3.setValues(t, pseudoRandom(), pseudoRandom(), pseudoRandom());
    mat4.translate(m, tm, t);
    return m;
  }

  function createArray(m) { // copy data or else it gets overwritten
    Array.prototype.slice.call(mat4.getArray(m));
  }

  return {
    'Multiplication' : {
      test : function(count, maxCount, milliSeconds) {
        randomMatrix(m1);
        randomMatrix(m2);
        var loopCount = 0;
        var time = 0.0;
        var start = Date.now();
        while(Date.now() - start < milliSeconds && loopCount != maxCount) {
          ++loopCount;
          for(var i = 0; i < count; ++i) {
            mat4.multiply(m1, m1, m2);
            //mat4.copy(m1, tm);
          }
        }
        time = Date.now() - start;
        mat4.transpose(m1, m1);
        return {time: time, loopCount: loopCount, result: createArray(m1) };
      }
    },
    'Translation' : {
      test : function(count, maxCount, milliSeconds) {
        randomMatrix(m1);
        var v1 = vec3.fromValues(1.0, 2.0, 3.0);
        var loopCount = 0;
        var time = 0.0;
        var start = Date.now();
        while(Date.now() - start < milliSeconds && loopCount != maxCount) {
          ++loopCount;
          for(var i = 0; i < count; ++i) {
            mat4.translate(m1, m1, v1);
          }
        }
        time = Date.now() - start;
        mat4.transpose(m1, m1);
        return {time: time, loopCount: loopCount, result: createArray(m1) };
      }
    },
    'Scaling' : {
      test : null
      /*function(count, maxCount, milliSeconds) {
        randomMatrix(m1);
        var v1 = vec3.fromValues(1.0, 2.0, 3.0);
        var loopCount = 0;
        var time = 0.0;
        var start = Date.now();
        while(Date.now() - start < milliSeconds && loopCount != maxCount) {
          ++loopCount;
          for(var i = 0; i < count; ++i) {
            mat4.scale(m1, v1);
          }
        }
        time = Date.now() - start;
        mat4.transpose(m1, m1);
        return {time: time, loopCount: loopCount, result: createArray(m1) };
      }*/
    },
    'Rotation (Arbitrary axis)': {
      test : function(count, maxCount, milliSeconds) {
        randomMatrix(m1);
        var v1 = vec3.fromValues(1.0, 2.0, 3.0);
        var a = Math.PI/2;
        var loopCount = 0;
        var time = 0.0;
        var start = Date.now();
        while(Date.now() - start < milliSeconds && loopCount != maxCount) {
          ++loopCount;
          for(var i = 0; i < count; ++i) {
            mat4.rotate(m1, m1, a, v1);
          }
        }
        time = Date.now() - start;
        mat4.transpose(m1, m1);
        return {time: time, loopCount: loopCount, result: createArray(m1) };
      }
    },
    'Rotation (X axis)' : {
      test : function(count, maxCount, milliSeconds) {
        randomMatrix(m1);
        var a = Math.PI/2;
        var loopCount = 0;
        var time = 0.0;
        var start = Date.now();
        while(Date.now() - start < milliSeconds && loopCount != maxCount) {
          ++loopCount;
          for(var i = 0; i < count; ++i) {
            mat4.rotateX(m1, m1, a);
          }
        }
        time = Date.now() - start;
        mat4.transpose(m1, m1);
        return {time: time, loopCount: loopCount, result: createArray(m1) };
      }
    },
    'Transpose' : {
      test : function(count, maxCount, milliSeconds) {
        randomMatrix(m1);
        var loopCount = 0;
        var time = 0.0;
        var start = Date.now();
        while(Date.now() - start < milliSeconds && loopCount != maxCount) {
          ++loopCount;
          for(var i = 0; i < count; ++i) {
            mat4.transpose(m1, m1);
          }
        }
        time = Date.now() - start;
        mat4.transpose(m1, m1);
        return {time: time, loopCount: loopCount, result: createArray(m1) };
      }
    },
    'Inverse' : {
      test : function(count, maxCount, milliSeconds) {
        var m1 = mat4.create();
        mat4.perspective(m1, 90.0, 0.5, 1.0, 1000.0);
        var loopCount = 0;
        var time = 0.0;
        var start = Date.now();
        while(Date.now() - start < milliSeconds && loopCount != maxCount) {
          ++loopCount;
          for(var i = 0; i < count; ++i) {
            mat4.invert(m1, m1);
          }
        }
        time = Date.now() - start;
        mat4.transpose(m1, m1);
        return {time: time, loopCount: loopCount, result: createArray(m1) };
      }
    },
    'Inverse 3x3' : { test: null },
    'Vector Transformation' : {test: null }
  };
}());
