export default class Scene {
  geometries = [];
  change = 0.0;
  speed = 0.0065;
  freeze = false;

  constructor(domElement) {
    this.canvas = domElement;
    this.context = domElement.getContext("webgl");

    if (this.context === null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }
    this._createShaderProgram();
  }

  _createShaderProgram() {
    this.shaderProgram = this.context.createProgram();
    this.context.attachShader(this.shaderProgram, this._createVertexShader());
    this.context.attachShader(this.shaderProgram, this._createFragmentShader());
    this.context.linkProgram(this.shaderProgram);
    this.context.useProgram(this.shaderProgram);
  }

  _createVertexShader() {
    let vertexShaderCode = `
      attribute vec3 aCoordinates;
      attribute vec3 aColor;
      varying vec3 vColor;
      uniform mat4 uChange;
      void main(){
        gl_Position = uChange * vec4(aCoordinates, 1.0);
        vColor = aColor;
      }
    `;

    let vertexShader = this.context.createShader(this.context.VERTEX_SHADER);
    this.context.shaderSource(vertexShader, vertexShaderCode);
    this.context.compileShader(vertexShader);

    return vertexShader;
  }

  _createFragmentShader() {
    let fragmentShaderCode = `
      precision mediump float;  
      varying vec3 vColor;
      void main(){
        gl_FragColor = vec4(vColor , 1.0);
      }
    `;

    let fragmentShader = this.context.createShader(
      this.context.FRAGMENT_SHADER
    );
    this.context.shaderSource(fragmentShader, fragmentShaderCode);
    this.context.compileShader(fragmentShader);

    return fragmentShader;
  }

  _bindArrayInsideShader(arrayToBePushed, shaderAttribute, colorAttribute) {
    let buffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
    this.context.bufferData(
      this.context.ARRAY_BUFFER,
      arrayToBePushed,
      this.context.STATIC_DRAW
    );
    this.uChange = this.context.getUniformLocation(
      this.shaderProgram,
      "uChange"
    );

    let coordinate = this.context.getAttribLocation(
      this.shaderProgram,
      shaderAttribute
    );
    let color = this.context.getAttribLocation(
      this.shaderProgram,
      colorAttribute
    );
    this.context.vertexAttribPointer(
      coordinate,
      3,
      this.context.FLOAT,
      false,
      6 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    this.context.vertexAttribPointer(
      color,
      3,
      this.context.FLOAT,
      false,
      6 * Float32Array.BYTES_PER_ELEMENT,
      3 * Float32Array.BYTES_PER_ELEMENT
    );
    this.context.enableVertexAttribArray(coordinate);
    this.context.enableVertexAttribArray(color);
  }

  add(geometry) {
    this.geometries.push(geometry);
  }

  remove(removedGeometry) {
    this.geometries.forEach((geometry, index, object) => {
      if (removedGeometry === geometry) object.splice(index, 1);
    });
  }

  render() {
    let vertices = [];

    // prettier-ignore
    const leftObject = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0, 
    ];
    // prettier-ignore
    const rightObject = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, this.change, 0.0, 1.0, 
    ]

    this.geometries.forEach((geometry) => {
      vertices.push(...geometry.getVerticeArray());
    });

    vertices = new Float32Array([...vertices]);

    if (this.change < -0.3 || this.change >= 0.25) this.speed = -this.speed;
    if (!this.freeze) this.change += this.speed;

    this._bindArrayInsideShader(vertices, "aCoordinates", "aColor");

    this.context.clearColor(0.3, 0.0, 0.7, 1.0);
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    // Draw Left Object
    this.context.uniformMatrix4fv(this.uChange, false, leftObject);
    this.context.drawArrays(this.context.TRIANGLES, 0, 72);

    // Draw Right Object
    this.context.uniformMatrix4fv(this.uChange, false, rightObject);
    this.context.drawArrays(this.context.TRIANGLES, 72, 138);
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}
// Geometry 2 mulai index 432
