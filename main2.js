let nodes = [];

let smoothness = 4;

function setup() {
    createCanvas(W,H);
}

function draw() {
    background(bg_col);
    draw_nodes();
    let chaikin_pts = chaikin(nodes);
    for(let i = 0; i < smoothness; i += 1) {
        chaikin_pts = chaikin(chaikin_pts);
    }
    draw_curve(chaikin_pts,curve_col);
    draw_curve(nodes,line_col);
    noLoop();
}

function mouseClicked() {
    nodes.push(createVector(mouseX,mouseY));
    loop();
    console.log(nodes);
}

function draw_nodes() {
    noFill();
    beginShape();
    for(node of nodes) {
        stroke(node_col);
        circle(node.x,node.y,5);
        stroke(line_col);
        //vertex(node.x,node.y);
    }
    endShape(CLOSE);
}
function draw_curve(pts,col) {
    noFill();
    stroke(col);
    strokeWeight(4);
    beginShape();
    for(pt of pts) {
        vertex(pt.x,pt.y);
    }
    endShape();
}

function chaikin(pts) {
    let new_pts = [];

    for(let i = 0; i < pts.length-1; i += 1) {
        let p1 = pts[i];
        let p2 = pts[(i+1)%pts.length];

        let mp = createVector(
            (p1.x+p2.x)/2,
            (p1.y+p2.y)/2
        );
        let qp1 = createVector(
            (mp.x+p2.x)/2,
            (mp.y+p2.y)/2
        );
        let qp2 = createVector(
            (mp.x+p1.x)/2,
            (mp.y+p1.y)/2
        );

        new_pts.push(qp2);
        new_pts.push(qp1);
    }
    return new_pts;
}