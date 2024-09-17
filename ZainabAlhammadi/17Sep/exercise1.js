

const hour = new DataTransfer().getHours;

if (hour <18)
{
    greeting ="Good Day";
}
else
{
    greeting = "Good evening";

}
document.getElementById("demo").innerHTML = greeting;