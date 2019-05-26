/*'use strict';
do
	var userName = prompt("Как твое имя, амиго?");
while(!userName);
//document.write('<h1 type="center">Олла, '+ userName +'!</h1>');
//document.write("Я загадал число от 0 до 100. Рискнешь угадать?");
alert("Я загадал число от 0 до 100. Рискнешь угадать?");
var num = Math.round(100*Math.random());
console.log(num);
var counter = 0;
var userNumber=-1;
while (userNumber != num) {
	userNumber = prompt("Действуй!");
	counter++;
	userNumber>num? alert("Больше"): userNumber===num? alert("Угадал"): alert("меньше");
}
if (counter % 10 <5) document.write("Вам понадобилось "+counter+" попытки");
else document.write("Вам понадобилось "+counter+" попыток");
*/
console.log(""+null);