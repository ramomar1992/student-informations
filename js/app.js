'use strict';

function StudentObj(email , phoneNum, tuition) {
    this.name = email.slice(0, email.indexOf('@'));
    this.email = email;
    this.phone = phoneNum;
    this.tuition = tuition;
    this.age = this.randomAge();
    this.id = StudentObj.allStudents.length+1;
    StudentObj.allStudents.push(this);
    this.addToLocalStorage();
}
StudentObj.allStudents = [];

StudentObj.prototype.randomAge = function () {
    return Math.floor(Math.random() * (24 - 18 + 1)) + 18;
}

StudentObj.prototype.addToLocalStorage = function () {
    localStorage.setItem('allData', JSON.stringify(StudentObj.allStudents));
}
StudentObj.prototype.render = function (stdnt) {
    let parent = document.getElementById('tableBody');
    let tr = document.createElement('tr');
    parent.appendChild(tr);
    
    let tdId = document.createElement('td');
    tr.appendChild(tdId);
    tdId.textContent = stdnt.id;

    let tdName = document.createElement('td');
    tr.appendChild(tdName);
    tdName.textContent = stdnt.name;

    let tdEmail = document.createElement('td');
    let tdMobile = document.createElement('td');
    let tdAge = document.createElement('td');
    let tdTuitiona = document.createElement('td');

    tr.appendChild(tdEmail);
    tdEmail.textContent = stdnt.email;

    tr.appendChild(tdMobile);
    tdMobile.textContent = stdnt.phone;

    tr.appendChild(tdAge);
    tdAge.textContent = stdnt.age;

    tr.appendChild(tdTuitiona);
    tdTuitiona.textContent = stdnt.tuition;
}
if (localStorage.getItem('allData')) {
    
    let data = JSON.parse(localStorage.getItem('allData'));
    
    for (let element of data) {
        new StudentObj(element.email, element.phone, element.tuition);
    }
    for (let student of StudentObj.allStudents) {
        student.render(student);
    }
    let totalEl = document.getElementById('total');
    let sum = 0;
    for (let element of StudentObj.allStudents) {
        sum += parseInt(element.tuition);
    }
    totalEl.textContent = `Total: ${sum}`;
}
    
let submit = document.getElementById('submit');

submit.addEventListener('click', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phoneNum').value;
    let tuition = document.getElementById('tuition').value;
    new StudentObj(email, phone, tuition);
    let data = JSON.parse(localStorage.getItem('allData'));
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = [];
    StudentObj.allStudents = [];
    for (let element of data) {
        new StudentObj(element.email , element.phone, element.tuition);
    }
    for (let student of StudentObj.allStudents) {
        student.render(student);
    }
    
    let totalEl = document.getElementById('total');
    let sum = 0;
    for (let element of StudentObj.allStudents) {
        sum += parseInt(element.tuition);
    }
    totalEl.textContent = `Total: ${sum}`;
    document.querySelector('form').reset();
}