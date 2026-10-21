let rigNo = 0;
let unusedOil = 0;
let oilHave = 0;
let rigEff = 1;
let oilPrice = 0.4;
let demand = 1;
let money = 200;
let moneyMade = 1;
let rigCost = 100;
let pop = 0.8;
let workerNo = 0;
let workerPay = 0.25;
let totalPaid = 0;
let incomeRead = 0;
let projectCost = 0;
let minWage = 0.2;
let oilIncrease = 1000;
let drillLevel = 0;
let statShow = false;
let lawyerLevel = 0;
let pumpLevel = 1;
let upgrades = [];
let projects = [];
let drillSliderValue = document.getElementById("drillSlider").value;
let drillInvestments = 0;

/* Variables for saving progress
let moneySaved //maybe not neccesary
let employees saved //maybe not neccesary
*/

const pain = 3;
document.getElementById("1stShow").style.display = "none";
document.getElementById("WorkerColumn").style.display = "none";
document.getElementById("UpgradeDis").style.display = "none";
document.getElementById("StatsButton").style.display = "none";
document.getElementById("StatsColumn").style.display = "none";
document.getElementById("Drill1Button").style.display = "none";
document.getElementById("Drill2Button").style.display = "none";
document.getElementById("Lawyer1Button").style.display = "none";
document.getElementById("Pump1Button").style.display = "none";
document.getElementById("OilBaronImage").style.display = "block";
document.getElementById("HappyOilBaronImage").style.display = "none";
document.getElementById("AngryOilBaronImage").style.display = "none";
document.getElementById("Projects").style.display = "none";
//for making a new rig
function NewRig()
{
    if (money >= rigCost)
    {
        rigNo = rigNo + 1
        unusedOil = unusedOil + oilIncrease
        document.getElementById("RigDis").innerHTML = "Number of Rigs "+rigNo;
        money -= rigCost
        rigCost = rigCost*5
        document.getElementById("RigCostDis").innerHTML = "Cost: $" + Math.round(rigCost);
        document.getElementById("1stShow").style.display = "block";
        document.getElementById("WorkerColumn").style.display = "block";
    }
}

//for hiring workers
function HireWorker(workersHired){
    if(workerNo + workersHired >= 0){
        workerNo += workersHired;
        document.getElementById("WorkerNoDis").innerHTML = "Number of Workers "+ workerNo;
}}
//for adjusting their pay to minimum wage

function Pay()
{
    totalPaid = (workerNo * (workerPay / 10)) + projectCost
    money -= totalPaid;
}

function LowerPay()
{
    if (workerPay > minWage)
    {
        workerPay -= 0.01
    }
    else
    {
        alert("cant reduce pay below minimum wage")
    }
}
function RaisePay(){
workerPay += 0.01
}

//for adjusting costs
function LowerCost(){
    if (oilPrice > 0.06)
    {
        oilPrice = oilPrice - 0.01
    }
    document.getElementById("OilPriceDis").innerHTML = "Cost per litre: $" + Math.round(oilPrice*100)/100;
}
function RaiseCost()
{
    oilPrice = oilPrice + 0.01
    document.getElementById("OilPriceDis").innerHTML = "Cost per litre: $" + Math.round(oilPrice*100)/100;
}

//updating the numbers & displays
setInterval(Updates, 100)


function Updates() {
    GeneralUpdate()
    MoneyUpdate()
    ProjectUpdate()
    Pay()
}
function GeneralUpdate()
{

    document.getElementById("testDis").innerHTML = canSell
    drillSliderValue = document.getElementById("drillSlider").value;
    
    if(rigNo > 0){
        rigEff = (1/rigNo)*(workerNo/100);
        if (unusedOil > 0)
        {
            unusedOil = unusedOil-rigNo*rigEff*pumpLevel //adjust these numbers as necesary
            oilHave = oilHave + rigNo*rigEff*pumpLevel
            if (rigEff > 1) rigEff = 1;
            document.getElementById("OilRemDis").innerHTML = "Oil in resovoirs: " + Math.round(unusedOil*100)/100;
            document.getElementById("OilHavDis").innerHTML = "Stored Oil: " + Math.round(oilHave*100)/100;
            if (unusedOil > 0) document.getElementById("OilGotPSDis").innerHTML = "Oil gotten per second: "+Math.round(rigNo*rigEff*10*100)/100*pumpLevel//adjust with above values
            else document.getElementById("OilGotPSDis").innerHTML = "Oil gotten per second: N/A";
            document.getElementById("RigEffDis").innerHTML = "Rig Efficiency: " + Math.round(rigEff*100*100)/100 + "%";
        }
        //alert(workerPay)
        document.getElementById("PayDis").innerHTML = "Amount Paid " + Math.round(workerNo * workerPay * 100) / 100 + " ($" + Math.round(workerPay*100)/100 + " per Employee)";
    }
        //making things show
    if (money >= 300 && drillLevel == 0){
        document.getElementById("Drill1Button").style.display = "block";
    }
    if (money >= 500 && lawyerLevel == 0){
        document.getElementById("Lawyer1Button").style.display = "block";
    }
    if(money >= 300){
       document.getElementById("UpgradeDis").style.display = "block"; 
    }
        if(statShow == false && money >= 101){
        document.getElementById("StatsButton").style.display = "block";
    }
    //WHY, WHY WHY HWHYWH YWHYW WHY
    if(money >= 1000){
        document.getElementById("OilBaronImage").style.display = "none";  
        document.getElementById("HappyOilBaronImage").style.display = "block";
        document.getElementById("AngryOilBaronImage").style.display = "none";
    }else if (money < 0){
        document.getElementById("OilBaronImage").style.display = "none";
        document.getElementById("HappyOilBaronImage").style.display = "none";
        document.getElementById("AngryOilBaronImage").style.display = "block";
    } else{
        document.getElementById("OilBaronImage").style.display = "block";
        document.getElementById("HappyOilBaronImage").style.display = "none";
        document.getElementById("AngryOilBaronImage").style.display = "none";
    }
   /* Basic Random Event Code
   if (Math.floor(Math.random() * 1000) == 9){
        if(Pop >= 0.8){
            alert("people happy")
        } else{
            alert("people angry")
            money -= 100
        }
    }*/
}

//Updating the money-related stuff
function MoneyUpdate()
{
    incomeRead = moneyMade - totalPaid;
    //demand calculations
    demand = 1/oilPrice/oilPrice
    moneyMade = demand*oilPrice
    //selling
    if (oilHave >= 1 && canSell == true && oilHave >= demand / 10)
    {
        oilHave = oilHave - demand/10
        document.getElementById("OilHavDis").innerHTML = "Stored Oil: " + Math.round(oilHave*100)/100;
        money += moneyMade 
    }
    //displays
    document.getElementById("MoneyDis").innerHTML = "$"+Math.round(money*100)/100;
    if (oilHave > 0 && canSell == true)
    {
        document.getElementById("MoneyPSDis").innerHTML = "Money per second: $" + (Math.round(moneyMade * 1000) / 1000 * 10);
        document.getElementById("IncomeDis").innerHTML = "Income per second: $" + (Math.round((moneyMade - totalPaid) * 1000) / 1000 * 10);
        document.getElementById("OilSoldDis").innerHTML = "Oil sold per second: " + Math.round(demand * 100) / 100 + " Litres";
    }
    else
    {
        document.getElementById("MoneyPSDis").innerHTML = "Money per second: N/A";
        document.getElementById("IncomeDis").innerHTML = "Income per second: N/A";
        document.getElementById("OilSoldDis").innerHTML = "Oil sold per second: N/A";
    }

}
function ProjectUpdate()
{
    projectCost = 0; //Needs to be here, pay needs to be at bottom

    if (projects.length > 0)
    {
        document.getElementById("Projects").style.display = "block";
    }
    if (projects.includes("drill") && (moneyMade - (workerNo * (workerPay / 10))) > 0 && drillSliderValue > 0)
    {
        projectCost += incomeRead * (drillSliderValue / 100);
        drillInvestments += incomeRead * (drillSliderValue / 100);
        document.getElementById("drillSliderPecentDis").innerHTML = "Percentage of income: " + drillSliderValue + "%";

    } else
    {
        document.getElementById("drillSliderPecentDis").innerHTML = "Percentage of income: 0%";
    }
    document.getElementById("drillSliderInvestDis").innerHTML = "Total invested: $" + drillInvestments;
    money -= projectCost;
    ShowProjects()
}

// for purchasing upgrades

function BuyUpgrade(upgrade, moneyRequired){
    if (money >= moneyRequired)
    {
        switch (upgrade)
        {
            case "statsUp":
                document.getElementById("StatsButton").style.display = "none";
                money = money - moneyRequired;
                document.getElementById("StatsColumn").style.display = "block";
                statShow = true;
                upgrades[upgrades.length] = upgrade;
                break;
            case "drillUp1":
                document.getElementById("Drill1Button").style.display = "none";
                money -= moneyRequired;
                oilIncrease = oilIncrease + 2000
                unusedOil += 2000 * rigNo;
                drillLevel = 1
                upgrades[upgrades.length] = upgrade;
                projects[projects.length] = "drill";
                break;
            case "drillUp2":
                document.getElementById("Drill2Button").style.display = "none";
                money -= moneyRequired;
                oilIncrease = oilIncrease + 2000
                unusedOil += 2000 * rigNo;
                drillLevel += 1
                upgrades[upgrades.length] = upgrade;
                break;
            case "minWageUp1":
                minWage -= 0.05;
                money -= 500
                document.getElementById("Lawyer1Button").style.display = "none";
                lawyerLevel += 1
                upgrades[upgrades.length] = upgrade;
                break;
            case "pumpUp1":
                pumpLevel += 1;
                money -= 750
                document.getElementById("Pump1Button").style.display = "none";
                upgrades[upgrades.length] = upgrade;
                break;
        }
        //alert(projects + "test")
        //alert(projects.length)
    }
    
}
//for enabling/disabling selling
let canSell = true;

function SellSwitch(){ //fix, it doesn't re-enable
    if(canSell == false){
        canSell = true;
    }
    if(canSell == true){
        canSell = false;
    }
}

//secret cheats
function moneyCheat(MonGain)
{
    money += MonGain;
}
function ShowProjects()
{
    if (drillInvestments >= 50 && upgrades.includes("drillUp2") == false) {
        document.getElementById("Drill2Button").style.display = "block";
    }
        
}










// Capital letters will be the death of me