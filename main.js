song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(400,400);
    canvas.center();
 
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function draw()
{
    image(video, 0, 0, 400, 400);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("red");
    stroke("red");
    
    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);

    song2.stop();

    if(song2_status == false)
    {
        song1.play();
        document.getElementById("song").innerHTML = "Playing - Beat 1";
    }
    
    }

}

function play()
{
    song.play();
}

function gotPoses(results)
{
   if(results.length > 0)
   {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = "+ scoreLeftWrist);
    
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "  leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "  rightWristY = " + rightWristY);
   }
}