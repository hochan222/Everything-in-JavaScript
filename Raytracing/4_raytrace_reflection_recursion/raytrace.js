// global variables
var light_location;
var list_of_scene_objects = [];
const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

///////////////////////////////////////////

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

///////////////////////////////////////////

function draw() {
  // camera
  var camera_loc = createVector(0, 0, -100);

  // light source
  light_location = createVector(100, 100, -50);

  // viewpoint ==> assume (0, 0, 0)
  var viewpoint_width = 40;
  var viewpoint_height = 30;

  // list of scene objects
  list_of_scene_objects.push(
    new Sphere(0, 7.5, 30, 3, createVector(255, 0, 0))
  );
  list_of_scene_objects.push(new Sphere(10, 3, 10, 5, createVector(0, 0, 255)));
  list_of_scene_objects.push(
    new Sphere(-10, 3, 10, 5, createVector(255, 255, 0))
  );
  list_of_scene_objects.push(new Sphere(0, -2, 0, 5, createVector(0, 255, 0)));
  list_of_scene_objects.push(
    new Sphere(-1.5, 5.5, 0, 2, createVector(254, 1, 154))
  );

  // depth of rays
  var max_depth = 3;

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

      // set off recursive ray
      var [hit, rgb] = recursive_ray(camera_loc, ray_direction, max_depth);

      if (hit) {
        stroke(rgb.x, rgb.y, rgb.z);
        point(pixel_x, 600 - pixel_y);
      } else {
        stroke(100, 100, 200 + ray_direction.y * 1000);
        point(pixel_x, 600 - pixel_y);
      }
    }
  } // pixel loop
}

///////////////////////////////////////////////////////

function recursive_ray(ray_source, ray_direction, depth) {
  var colour_contribution = createVector(0, 0, 0);
  var intersected = false;

  // only continue if depth is more than 0
  if (depth > 0) {
    // nearest point
    var distance_to_nearest_point = Infinity;
    var nearest_intersection_point;
    var nearest_normal;
    var nearest_rgb;

    // test all objects in scene
    for (var obj of list_of_scene_objects) {
      // check intersection with object
      var [hit, intersection_point, normal, rgb] = obj.intersection(
        ray_source,
        ray_direction
      );

      if (hit) {
        intersected = true;
        // find nearest point
        var distance_to_point = p5.Vector.mag(
          p5.Vector.sub(intersection_point, ray_source)
        );
        if (distance_to_point < distance_to_nearest_point) {
          distance_to_nearest_point = distance_to_point;
          nearest_intersection_point = intersection_point;
          nearest_normal = normal;
          nearest_rgb = rgb;
        }
      }
    } // list of objects

    // if we hit object, we know the nearest object
    if (intersected) {
      // vector to light source
      var to_light_source = p5.Vector.sub(
        light_location,
        nearest_intersection_point
      );
      to_light_source.normalize();

      // vector reflected ray
      var reflected_ray = p5.Vector.sub(
        p5.Vector.mult(
          nearest_normal,
          2 * p5.Vector.dot(to_light_source, nearest_normal)
        ),
        to_light_source
      );
      reflected_ray.normalize();

      // cosine factor
      var cos_with_lightsource = p5.Vector.dot(nearest_normal, to_light_source);
      var cos_ray_to_reflection = p5.Vector.dot(
        reflected_ray,
        p5.Vector.mult(ray_direction, -1)
      );

      // clip cosine
      cos_with_lightsource = constrain(cos_with_lightsource, 0, 1);
      cos_ray_to_reflection = constrain(cos_ray_to_reflection, 0, 1);

      // phong factor
      cos_with_lightsource = pow(cos_with_lightsource, 2);
      cos_ray_to_reflection = pow(cos_ray_to_reflection, 2);

      // lighting factor
      var lighting = (0.1 + cos_with_lightsource * cos_ray_to_reflection) / 1.1;

      // update rgb with lighting factor
      var nearest_rgb = p5.Vector.mult(nearest_rgb, lighting);

      // add to colour contribution
      colour_contribution = p5.Vector.add(colour_contribution, nearest_rgb);

      // bounced ray from new source, not from camera
      var bounced_ray = p5.Vector.add(
        p5.Vector.mult(
          nearest_normal,
          2 * p5.Vector.dot(p5.Vector.mult(ray_direction, -1), nearest_normal)
        ),
        ray_direction
      );
      bounced_ray.normalize();

      // fire off recursive ray along bounced direction
      var [hit2, rgb2] = recursive_ray(
        nearest_intersection_point,
        bounced_ray,
        depth - 1
      );
      // scale colour down because of depth
      rgb2 = p5.Vector.mult(rgb2, 0.5 * depth);
      // contribution colourr
      colour_contribution = p5.Vector.add(colour_contribution, rgb2);
    }
  }

  return [intersected, colour_contribution];
}

///////////////////////////////////////////////////////

class Sphere {
  constructor(x, y, z, r, col) {
    this.sphere_loc = createVector(x, y, z);
    this.sphere_radius = r;
    this.rgb = col;
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
      // normal = p5.Vector.add(normal, p5.Vector.random3D())
      normal.normalize();

      // ensure t positive for forward ray direction
      if (t < 0) {
        delta = -1;
      }

      return [delta >= 0, intersection_point, normal, this.rgb];
    }
  }
}
