export default class Scene {
  geometries = [];
  static change = 0;
  static speed = 0.0015;

  constructor(domElement) {
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
      uniform float uChange;
      void main(){
        gl_Position = vec4(aCoordinates.x,aCoordinates.y + uChange, aCoordinates.z, 1.0);
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
      varying mediump vec3 vColor;
      void main(){
          gl_FragColor = vec4(vColor , 1);
      }`;

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
    let uChange = this.context.getUniformLocation(
      this.shaderProgram,
      "uChange"
    );

    this.geometries.forEach((geometry) => {
      vertices.push(...geometry.getVerticeArray());
    });

    vertices = new Float32Array([...vertices]);

    this._bindArrayInsideShader(vertices, "aCoordinates", "aColor");

    if (Scene.change < -0.3 || Scene.change >= 0.25) Scene.speed = -Scene.speed;
    Scene.change += Scene.speed;
    this.context.uniform1f(uChange, Scene.change);

    this.context.clearColor(0.4, 0.5, 0.35, 1.0);
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    this.context.drawArrays(this.context.TRIANGLES, 0, vertices.length / 3);
  }
}
