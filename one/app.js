let frame = {
    x: [],
    y: [],
    z: [],
    w: [],
};

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    loadTable('data/1.csv', "csv", table => {
        for (let row of table.rows) {
            frame.x.push(int(row.get(0)));
            frame.y.push(int(row.get(1)));
            frame.z.push(int(row.get(2)));
            frame.w.push(int(row.get(3)));
        }
    });
}

function draw_dot(x, y, z) {
    const k = 0.5;
    vertex(x, y, z);
    vertex(x+k, y+k, z+k);
}

function draw() {
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