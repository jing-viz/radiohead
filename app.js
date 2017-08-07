let frames = [];
let song;

const k_skip_frame = 5;
const k_frame_count = 2101;

function load_frame(idx) {
    if (idx >= k_frame_count) return;

    const csv_filename = 'data/csv/' + idx + '.csv';

    loadTable(csv_filename, "csv", table => {
        let new_frame = {
            x: [],
            y: [],
            z: [],
            w: [],
        };
        for (let row of table.rows) {
            new_frame.x.push(int(row.get(0)));
            new_frame.y.push(int(row.get(1)));
            new_frame.z.push(int(row.get(2)));
            new_frame.w.push(int(row.get(3)));
        }
        frames.push(new_frame);
        print('loaded', csv_filename);
        load_frame(idx + k_skip_frame);
    });
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    loadSound('data/HouseOfCards_DataSample.mp3', song => {
        song.loop();
    });

    frameRate(30);
    load_frame(1);
}

function draw_dot(x, y, z) {
    const k = 2;
    vertex(x-k, y-k, z);
    vertex(x+k, y+k, z);
    vertex(x+k, y-k, z);
    vertex(x-k, y+k, z);    
}

function draw() {
    let sec = millis() / 1000;
    let idx = int(sec * 30 / k_skip_frame);
    if (idx > frames.length - 1) return;
    let frame = frames[idx];

    background(1);

    rotateY(frameCount * 0.001);
    camera(200, 200, -400);
    orbitControl();
    scale(2);

    beginShape(LINES);
    for (let i = 0; i < frame.x.length; i++) {
        fill(frame.w[i]*1.1,frame.w[i]*1.6,200,255);
        draw_dot(frame.x[i], frame.y[i], frame.z[i]);
    }
    endShape();

}