let cosApplied = false;
let sinApplied = false;
let tanApplied = false;
let line = document.querySelector('.addLines');
let ratioCos = document.querySelector('.ratioCos');
let ratioSin = document.querySelector('.ratioSin');
let ratioTan = document.querySelector('.ratioTan');

let viewbox = document.querySelector('.viewboxsvg');
let standardValue1 = -100;
let standardValue2 = 200;

function drawline(angle)
{
    if(angle === Number(line.innerHTML))
    {
        line.removeAttribute("d");
        resetRatio();
        line.innerHTML = "";
        return;
    }
    else
    {
        line.removeAttribute("d");
        resetRatio();
    }
    
    document.querySelector('.errorMessage').innerHTML = "";

    if(angle === 45)
    {
        line.setAttribute("d","M " + standardValue1 + "," + (-standardValue1) + " L " + (-standardValue1) + "," + standardValue1);
        line.innerHTML = 45;
    }
    
    if(angle === 60)
    {
        line.setAttribute("d","M " + (-standardValue1/Math.sqrt(3)) + "," + standardValue1 + " L " + standardValue1/Math.sqrt(3) + "," + (-standardValue1));
        line.innerHTML = 60;
    }

    if(angle === 30)
    {
        line.setAttribute("d","M " + standardValue1 + "," + (-standardValue1/Math.sqrt(3)) + " L " + (-standardValue1) + "," + standardValue1/Math.sqrt(3));
        line.innerHTML = 30;
    }
}

function visibleRatio(trigfun)
{
    let angle = Number(line.innerHTML);

    if(line.innerHTML === "")
    {
        document.querySelector('.errorMessage').innerHTML = 'Please draw a line';
        return;
    }

    if(trigfun === 'cos' && cosApplied === true)
    {
        ratioCos.removeAttribute("d");

        cosApplied = false;
    }
    else if(trigfun === 'cos' && cosApplied === false)
    {
        let cosine = Math.cos(angle*Math.PI/180);
        let cosineLine = 50*cosine;

        ratioCos.setAttribute("d","M 0,0 L " + cosineLine + ",0");

        cosApplied = true;
        return;
    }
    else if(trigfun === 'sin' && sinApplied === true)
    {
        ratioSin.removeAttribute("d");

        sinApplied = false;
    }
    else if(trigfun === 'sin' && sinApplied === false)
    {
        let sine = Math.sin(angle*Math.PI/180);
        let sineLine = 50*sine;

        ratioSin.setAttribute("d","M 0,0 L 0," + ( - sineLine ));

        sinApplied = true;
        return;
    }
    else if(trigfun === 'tan' && tanApplied === true)
    {
        ratioTan.removeAttribute("d");

        tanApplied = false;
    }
    else if(trigfun === 'tan' && tanApplied === false && (angle % 90 != 0))
    {
        let tan = Math.tan(angle*Math.PI/180);
        let tanLine = 50*tan;

        ratioTan.setAttribute("d","M 50,0 L 50," + ( - tanLine ) );

        tanApplied = true;
        return;
    }
}

function getAngle()
{
    let angle;

    if(document.querySelector('.insertAngle').value != "")
    {
        angle = Number(document.querySelector('.insertAngle').value);
    }
    else
    {
        return;
    }

    document.querySelector('.errorMessage').innerHTML = "";

    if(angle === Number(line.innerHTML)  && line.innerHTML != "")
    {
        line.removeAttribute("d");
        line.innerHTML = "";
        resetRatio();
        return;
    }

    line.innerHTML = angle;
    resetRatio();

    if(angle % 180 === 0)
    {
        line.setAttribute("d","M " + standardValue1 + ",0 L " + (-standardValue1) + ",0");
        linedrawn = true;
        line.innerHTML = angle;
        return;
    }

    angle = angle * Math.PI / 180;
    let tan = Math.tan(angle);
    let first, second;

    console.log('ma perche');
    first = (-standardValue1)/tan;
    second = (standardValue1)/tan;
 
    line.setAttribute("d","M " + first + "," + standardValue1 + " L " + second + "," + (-standardValue1));
    linedrawn = true;
}

function resetRatio()
{
    ratioCos.removeAttribute('d');
    ratioSin.removeAttribute('d');
    ratioTan.removeAttribute('d');
    cosApplied = false;
    sinApplied = false;
    tanApplied = false;
}

function reset()
{
    document.querySelector('.errorMessage').innerHTML = "";
    line.innerHTML = "";
    line.removeAttribute("d");
    resetRatio();
    standardValue1 = -150;
    standardValue2 = 300;
    zoomIn();
}

function zoomOut()
{
   line.removeAttribute("d");
    resetRatio();
    line.innerHTML = "";


    standardValue1 = standardValue1*1.5;
    standardValue2 = standardValue2*1.5;

    viewbox.removeAttribute("viewBox");
    viewbox.setAttribute("viewBox",standardValue1 + " " + standardValue1 + " " + standardValue2 + " " + standardValue2);
}

function zoomIn()
{
    line.removeAttribute("d");
    resetRatio();
    line.innerHTML = "";

    standardValue1 = standardValue1/1.5;
    standardValue2 = standardValue2/1.5;

    viewbox.removeAttribute("viewBox");
    viewbox.setAttribute("viewBox",standardValue1 + " " + standardValue1 + " " + standardValue2 + " " + standardValue2);
}