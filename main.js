let pts = [];
let n_pts = 32;

let smoothness = 4;

let n_off = 0.0;
let strength = 8;
let curve = [];

function setup() {
    background(bg_col);
    createCanvas(W,H);
    pts = init_pts();
}

function draw() {
    frameRate(30);
    translate(W/2,H/2);
    background(bg_col);
    fill(0);
    //circle(0,0,10);

    draw_pts(pts,line_col);
    draw_shape(pts,line_col);
    curve = chaikin(pts);
    for(let i = 0; i < smoothness; i += 1) {
        curve = chaikin(curve);
    }


    //draw_shape(curve,curve_col);
    draw_pts(curve,curve_col);

    noLoop();
    //update_pts(pts);
}

function mouseClicked() {
    loop();
}

function update_pts(pts) {
    for(let i = 0; i < pts.length; i += 1) {
        pts[i].r += Math.sin(pts[i].n)*Math.random()*2;
        pts[i].n += 0.04;
        //pts[i].n += Math.random()*0.05;
    }
}

function draw_shape(pts,col) {
    beginShape();
    for(let i = 0; i < pts.length; i += 1) {
        let pt = pts[i];
        noFill();
        //fill(col);
        stroke(col);
        vertex(pt.r*Math.cos(pt.theta),pt.r*Math.sin(pt.theta));
    }
    endShape(CLOSE);
}

function draw_pts(pts,col) {
    for(let i = 0; i < pts.length; i += 1) {
        let pt = pts[i];
        fill(col);
        noStroke();
        pt.draw();
    }
}

function init_pts() {
    let pts = [];
    for(theta = 0; theta <= Math.PI*2; theta += (Math.PI*2)/(n_pts)) {
        let r = H/6 + Math.random() * H/6;
        pts.push(new Point(r,theta));
    }
    return pts;
}


function Point(r,theta) {
    this.r = Math.abs(r);
    this.theta = theta;
    this.pulse = noise(this.theta);
    this.n = noise(this.theta) * Math.PI*2;

    this.draw = function() {
        let x = this.r * Math.cos(theta);
        let y = this.r * Math.sin(theta);
        circle(x,y,5);

    }
}

function chaikin(pts) {
    let new_pts = [];

    for(let i = 0; i < pts.length; i += 1) {
        let p1 = pts[i];
        let p2 = pts[(i+1)%pts.length];

        let mp = midpoint(p1,p2);
        let qp1 = midpoint(mp,p2);
        let qp2 = midpoint(mp,p1);

        //new_pts.push(mp);
        new_pts.push(qp2);
        new_pts.push(qp1);
    }
    return new_pts;
}

function midpoint(p1,p2) {
    let mpXY = createVector(
        (p1.r*Math.cos(p1.theta) + p2.r*Math.cos(p2.theta))/2,
        (p1.r*Math.sin(p1.theta) + p2.r*Math.sin(p2.theta))/2,
    )

    let r = Math.sqrt(Math.pow(mpXY.x,2)+Math.pow(mpXY.y,2));
    let theta = Math.atan(mpXY.y/mpXY.x) + (mpXY.x < 0 ? Math.PI : 0);
    if(mpXY.x < 0) theta += Math.PI;
    return new Point(
        Math.sqrt(Math.pow(mpXY.x,2)+Math.pow(mpXY.y,2)),
        Math.atan(mpXY.y/mpXY.x) + (mpXY.x < 0 ? Math.PI : 0)
    );
}