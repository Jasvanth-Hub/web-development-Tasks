let buttons = document.getElementsByTagName("button")

let calculation = document.getElementById("cal")

let answer = document.getElementById("ans")

var Kinput = document.querySelector('.screen');

calculation.innerText = 0

let decimalcount = 0

for(var i = 0;i<buttons.length;i++)
{
    buttons[i].addEventListener("click",function(){
        let value = this.innerText
        NewDisplay(value)
    })
}


function NewDisplay(input)
{
    if(input=="+" || input=="*" || input=="-" || input=="/" || input=="%")
    {
        decimalcount=0
    }

    let currentDiplay = calculation.innerText

    if(currentDiplay == "0")
    {
        if(input!="C" && input!="Del" && input!="/" && input!="*" && input!="-" && input!="+" && input!="=" && input!="%" && input!=".")
        {
            calculation.innerText = input
        }
        else if(input==".")
        {
            calculation.innerText = currentDiplay + input
            decimalcount+=1
        }
    }

    else
    {
        if(input!="C" && input!="Del" && input!="=")
        {
            let last = currentDiplay.length - 1

            if((currentDiplay[last]=="-" || currentDiplay[last]=="+" || currentDiplay[last]=="*" || currentDiplay[last]=="/" || currentDiplay[last]=="%" || currentDiplay[last]==".") && (input=="-" || input=="*" || input=="/" || input=="%" || input=="+" || input=="."))
            {
                calculation.innerText = currentDiplay
            }
            else if(input==".")
            {
                if(decimalcount==0)
                {
                    calculation.innerText = currentDiplay + "."
                    decimalcount+=1
                }
            }
            else
            {
                calculation.innerText = currentDiplay + input
            }
        }
        else if(input=="Del")
        {
            if(currentDiplay.length == 1)
            {
                calculation.innerText = 0
                decimalcount = 0
            }
            else
            {
                calculation.innerText = currentDiplay.substring(0,currentDiplay.length - 1)
            }
        }
        else if(input=="C")
        {
            calculation.innerText = 0
            answer.innerText = 0
            decimalcount = 0
        }
        else if(input == "=")
        {
            let last = currentDiplay.length - 1

            if(currentDiplay[last]!="/" && currentDiplay[last]!="*" && currentDiplay[last]!="-" && currentDiplay[last]!="+" && currentDiplay[last]!="%" && currentDiplay[last]!=".")
            {
                answer.innerText = eval(currentDiplay)
            }
        }
    }
}