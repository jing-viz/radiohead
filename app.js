var boxSz = 250;
var numSpheres = 300;
var frames = [];
var line_size = 1;
var song;
var target_mouse_x, target_mouse_y;
var curr_mouse_x, curr_mouse_y;
var k_skip_frame = 5;

function load_next_csv(csv_index) {
  if (csv_index > 2101) return;

  var csv_filename = 'data/csv/' + csv_index + '.csv';
  loadTable(csv_filename, "csv", table => {
    var new_frame = {
      x: [],
      y: [],
      z: [],
      w: [],
    };
    for (let row of table.rows) {
      new_frame.x.push(float(row.get(0)));
      new_frame.y.push(float(row.get(1)));
      new_frame.z.push(float(row.get(2)));
      new_frame.w.push(float(row.get(3)));
    }
    frames.push(new_frame);

    print('loaded', csv_filename);

    load_next_csv(csv_index + k_skip_frame);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  strokeWeight(10);

  curr_mouse_x = target_mouse_x = mouseX;
  target_mouse_y = target_mouse_y = mouseY;

  loadSound('data/HouseOfCards_DataSample.mp3', song => {
    song.loop();
  });

  load_next_csv(1);
}

function my_line(x1, y1, z1, x2, y2, z2) {
  vertex(x1, y1, z1);
  vertex(x2, y2, z2);
}

function draw() {
  background(1);

  if (frames.length == 0) return;

  let this_frame = frames[frames.length-1];

  // rotateY(frameCount * 0.01);
  camera(100, 100, -400);

  if (true) {
    orbitControl();
  }
  else {
    if (mouseIsPressed){
      target_mouse_x = mouseX;
      target_mouse_y = mouseY;
    }

    curr_mouse_x = lerp(curr_mouse_x, target_mouse_x, 0.1);
    curr_mouse_y = lerp(curr_mouse_y, target_mouse_y, 0.1);

    rotateY((curr_mouse_x - width / 2) / (width / 2));
    rotateX((curr_mouse_y - height / 2) / (width / 2));
  }

  beginShape(LINES);
  for (var i = 0; i < this_frame.x.length; i++) {
    fill(this_frame.w[i]);
    my_line(this_frame.x[i], this_frame.y[i], this_frame.z[i], 
          this_frame.x[i]+line_size, this_frame.y[i]+line_size, this_frame.z[i]+line_size);
  }
  endShape();

}