'use strict';

let startBtn = document.getElementById("start"),
    budget = document.getElementsByClassName("budget-value").item(0),
    daybudget = document.getElementsByClassName("daybudget-value").item(0),
    level = document.getElementsByClassName("level-value").item(0),
    expenses = document.querySelector(".expenses-value"),
    optionalExpenses = document.getElementsByClassName("optionalexpenses-value").item(0),
    income = document.getElementsByClassName("income-value").item(0),
    monthsavings = document.getElementsByClassName("monthsavings-value").item(0),
    yearsavings = document.getElementsByClassName("yearsavings-value").item(0);

let expensesItems = document.querySelectorAll(".expenses-item");

const allButtons = document.getElementsByTagName("button"),
      affirmBts = [], calcBtn = allButtons[2];
affirmBts.push(allButtons[0]);
affirmBts.push(allButtons[1]);

let optionalExpensesItems = document.querySelectorAll(".optionalexpenses-item"),
    checkbox = document.querySelector("#savings"),
    textFieldSum = document.querySelector("#sum"),
    textFieldPercent = document.querySelector("#percent");

let year = document.querySelector(".year-value"),
    month = document.querySelector(".month-value"),
    day = document.querySelector(".day-value");

let appData = {
    budget: 0,
    time: Date.now(),
    expenses:{},
    optionalExpences: {},
    income: [],
    savings: false
};


startBtn.addEventListener("click", () =>{
    appData.budget = +prompt("Введите ваш бюджет на месяц?"),
    appData.time = new Date(prompt("Ведите дату в формате YYYY-MM-DD"));
    budget.textContent = appData.budget;
    year.value = appData.time.getFullYear();
    month.value = appData.time.getMonth()+1;
    day.value = appData.time.getDate();
});


affirmBts[0].addEventListener('click',() => {
    let sum = 0;
    expensesItems.forEach((x, i, arr) => {
        if (i%2 ==1) {
            sum += parseFloat(x.value);
            appData.expenses[arr[i-1].value] = parseFloat(x.value); 
        }
    });
    expenses.textContent = sum.toFixed(2);
});


