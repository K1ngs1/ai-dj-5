song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
score_leftwrist = 0;
score_rightwrist = 0;


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log('Left wristx:' + leftWristx + ' Left wrist y:' + leftWristy);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log('Right wristx:' + rightWristx + ' right wrist y:' + rightWristy);
        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;
    }
}

function modelLoaded(){
    console.log("Pose net is initi");
}


function draw() {
	image(video, 0, 0, 600, 500);
	fill("red");
    stroke("red");

    if(score_rightwrist > 0.2){
        circle(rightWristx,rightWristy,20);

        if(rightWristy > 0 && rightWristy <= 100){
            document.getElementById('speed'). innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
    
        else if(rightWristy > 100 && rightWristy <= 200){
            document.getElementById('speed'). innerHTML = "Speed = 1x";
            song.rate(1);
        }
    
        else if(rightWristy > 200 && rightWristy <= 300){
            document.getElementById('speed'). innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
    
        else if(rightWristy > 300 && rightWristy <= 400){
            document.getElementById('speed'). innerHTML = "Speed = 2x";
            song.rate(2);
        }
    
        else if(rightWristy > 400 && rightWristy <= 400){
            document.getElementById('speed'). innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(score_leftwrist > 0.2){
        circle(leftWristx,leftWristy,20);
        numberleftwrist = Number(leftWristy);
        remove_decimals = floor(numberleftwrist);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = "+ volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolumn(1);
    song.rate(1);
}


