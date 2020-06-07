const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function draw() {
  // camera
  var camera_loc = createVector(0, 0, -100);

  // light source
  var light_location = createVector(100, 100, -50)

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
      var [hit, intersection_point, normal] = sphere.intersection(
        camera_loc,
        ray_direction
      );

      // colour if intersected
      if (hit) {

        // vector to light source
        var to_light_source = p5.Vector.sub(light_location, intersection_point)
        to_light_source.normalize()

        // point is 1 pixel dot
        stroke(0, 0, 0)
        point(pixel_x, 600 - pixel_y);
      } else {
        // background gradient
        stroke(50, 50, 100 + ray_direction.y * 1000);
        point(pixel_x, 600 - pixel_y);
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

    if (delta < 0) {
      return [false, 0, 0];
    } else {
      // calculate nearest point (lowest t)
      var t = (-b - sqrt(delta)) / (2 * a);
      var intersection_point = p5.Vector.add(
        camera_loc,
        p5.Vector.mult(ray_direction, t)
      );

      //normal
      var normal = p5.Vector.sub(intersection_point, this.sphere_loc);
      normal.normalize();

      return [delta >= 0, intersection_point, normal];
    }
  }
}
