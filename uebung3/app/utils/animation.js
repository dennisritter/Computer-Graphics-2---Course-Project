define(['three', 'jquery'], (function (THREE, $) {

  var example = [{
    startAt: 100, // Start pa at timestamp 100
    stopAt: 500, // Stop pa at timestamp 500
    delta: 0.5, // In every step, increment scaleX by 0.5
    trans: 'scaleX', // scale in x direction
    object: null // The Object3d
  },{
    /**
     * From and to are used to calculate delta.
     * It will not set the initial scale/rotation etc of the object.
     * E.g. from: 0, to: Math.PI * 2 means one rotation regardless of the initial rotation.
     */
    startAt: 200,
    stopAt: 1000,
    from: 0,
    to: 30,
    trans: 'scaleY',
    object: null
  }];

  /**
   * Animation runner
   * @param     {array}   config    array containing partial animation configs
   * @constructor
   */
  var Animation = function ( config ) {
    this.initialConfig = config;
    // Make a real copy of the array
    this.config = $.merge([], config);
    this.loop = false;

    // Convert from/to config properties to delta
    for ( var i = 0; i < this.config.length; ++i ) {
      var c = this.config[i];
      if ( c.delta )
        continue;

      if ( !c.startAt || !c.stopAt )
          throw new Error("An animation config element must contain startAt and stopAt");

      if ( !c.from && c.from !== 0 || !c.to && c.to !== 0 )
        throw new Error("An animation config element must either contain a delta or from and to");

      c.delta = (c.to - c.from) / (((c.stopAt - c.startAt) / 100) + 1); console.log(c.delta);
    }

    // The current relative time
    this.time = 0;
  };

  /**
   * Starts the animation
   */
  Animation.prototype.start = function () { console.log(this);
    if ( this.interval )
      return;

    var _this = this;
    // Call step-method every 100ms
    this.interval = setInterval( function () {
      _this.step();
    }, 100 );
  };

  /**
   * 1 animation step
   * Executed every 100ms
   */
  Animation.prototype.step = function () {
    // If every partial animation has finished, stop whole animation and trigger the onFinish callback if set
    if ( this.config.length < 1 ) {
      if ( this.loop ) {
        this.config = $.merge([], this.initialConfig);
        this.time = 0;
      } else {
        this.stop();
        if (this.onFinish)
          this.onFinish();
      }
      return;
    }

    // For each partial animation (pa)
    for ( var i = 0; i < this.config.length; ++i ) {
      var c = this.config[i];
      // If pa has not yet started, continue
      if ( c.startAt > this.time )
        continue;

      // If pa has already ended, remove it from config and continue
      if ( c.stopAt < this.time ) {
        this.config.splice(i, 1);
        --i;
        continue;
      }

      switch ( c.trans ) {
        case 'scaleX':
          c.object.scale.x += c.delta;
          break;

        case 'scaleY':
          c.object.scale.y += c.delta;
          break;

        case 'scaleZ':
          c.object.scale.z += c.delta;
          break;

        default: // per difo: check if method with name [c.trans] exists and call it with delta
          if ( !c.object[c.trans] )
            break;

          c.object[c.trans](c.delta);
      }
    }

    // Increment the time by 100
    this.time += 100;
  };

  /**
   * Stops the animation
   */
  Animation.prototype.stop = function () {
    if ( !this.interval )
      return;

    clearInterval( this.interval );
    this.interval = null;
  };

  return Animation;
}));