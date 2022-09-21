function setup() 
{
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

img = "" ;
Status = "" ;

function preload()
{
    img = loadImage("Fishtank.jpg");
}

function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
}
objects = [];

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
 {
    image(img, 0, 0, 640, 420);

    if(Status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected : " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
 }
