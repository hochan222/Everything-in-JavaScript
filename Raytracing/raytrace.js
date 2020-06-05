const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function draw() {
  // camera
  var camera_loc = createVector(0, 0, -100);

  // viewpoint ==> assume (0, 0, 0)
  var viewpoint_width = 40;
  var viewpoint_height = 30;

  // create sphere object
  var sphere = new Sphere(0, 0, 20, 5);

  for (var pixel_x = 0; pixel_x < WINDOW_WIDTH; pixel_x += 1) {
    for (var pixel_y = 0; pixel_y < WINDOW_HEIGHT; pixel_y += 1) {
      // current position
      var current_position = createVector(
        viewpoint_width * (pixel_x / WINDOW_WIDTH - 0.5),
        viewpoint_height * (pixel_y / WINDOW_HEIGHT - 0.5),
        0
      );

      // ray direction
      var ray_direction = p5.Vector.sub(current_position, camera_loc);
      ray_direction.normalize();

      // check intersection sphere
      var hit = sphere.intersection(camera_loc, ray_direction);

      // colour if intersected
      if (hit) {
        // point is 1 pixel dot
        point(pixel_x, pixel_y);
      }
    }
  }
}

class Sphere {
  constructor(x, y, z, r) {
    this.sphere_loc = createVector(x, y, z);
    this.sphere_radius = r;
  }

  intersection(camera_loc, ray_direction) {
    var a = p5.Vector.dot(ray_direction, ray_direction);
    var b =
      2 *
      p5.Vector.dot(ray_direction, p5.Vector.sub(camera_loc, this.sphere_loc));
    var b2 = b * b;
    var c =
      p5.Vector.dot(
        p5.Vector.sub(camera_loc, this.sphere_loc),
        p5.Vector.sub(camera_loc, this.sphere_loc)
      ) -
      this.sphere_radius * this.sphere_radius;

    // determinant
    var delta = b2 - 4 * a * c;
    return delta >= 0;
  }
}
