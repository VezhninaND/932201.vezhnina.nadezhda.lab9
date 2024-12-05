let numbers = [];
let d = [];
let ops = [];
let i = 0;
let display = "";
let displaycurrent = [];
let displaycurrentstr = "";
displaycurrent.push(0);
numbers.push(0);
d.push(0);

function AddNumber(n) {
	if (d[i] == 0) numbers[i] = numbers[i]*10 + n;
	if (d[i] > 0) {
		let n_temp = n * (1/(10**d[i]));
		numbers[i] += n_temp;
		d[i]++;
	}
	displaycurrentstr = "";
	if (displaycurrent[0] == 0 && d[i] == 0) displaycurrent[0] = n;
	else displaycurrent.push(n);
	for (j = 0; j < displaycurrent.length; j++) displaycurrentstr += displaycurrent[j];
	document.getElementById("display-current").innerHTML = displaycurrentstr;
}

function Operation(op) {
	ops.push(op);
	display += numbers[i];
	display += " " + op + " ";
	i++;
	numbers.push(0);
	d.push(0);
	document.getElementById("display").innerHTML = display;
	displaycurrent.splice(0, displaycurrent.length);
	displaycurrentstr = "";
	displaycurrent.push(0);
	for (j = 0; j < displaycurrent.length; j++) displaycurrentstr += displaycurrent[j];
	document.getElementById("display-current").innerHTML = displaycurrentstr;
}

function Decimal() {
	if (d[i] == 0) {
		d[i] = 1;
		displaycurrent.push(".");
		displaycurrentstr = "";
		for (j = 0; j < displaycurrent.length; j++) displaycurrentstr += displaycurrent[j];
		document.getElementById("display-current").innerHTML = displaycurrentstr;
	}
}

function Back() {
	if (d[i] == 0) {
		numbers[i] -= numbers[i] % 10;
		numbers[i] /= 10;
	}
	if (d[i] > 0) {
		d[i]--;
		numbers[i] *= 10**d[i];
		numbers[i] -= numbers[i] % 10;
		numbers[i] /= 10**d[i];
	}
	displaycurrent.pop();
	if (d[i] == 1) { displaycurrent.pop(); d[i]--; }
	displaycurrentstr = "";
	for (j = 0; j < displaycurrent.length; j++) displaycurrentstr += displaycurrent[j];
	document.getElementById("display-current").innerHTML = displaycurrentstr;
}

function Clear() {
	display = "";
	displaycurrentstr = "";
	d.splice(0, d.length);
	d.push(0);
	numbers.splice(0, numbers.length);
	numbers.push(0);
	displaycurrent.splice(0, displaycurrent.length);
	ops.splice(0, ops.length);
	i = 0;
	displaycurrent.push(0);
	displaycurrentstr += 0;
	document.getElementById("display").innerHTML = display;
	document.getElementById("display-current").innerHTML = displaycurrentstr;
}

function Solve() {
	if (ops.length == numbers.length - 1) {
		let j;
		for (j = 0; j < ops.length; j++) {
				if (ops[j] == '*') {
					numbers.splice(j, 2, numbers[j] * numbers[j+1]);
					ops.splice(j, 1);
					j = 0;
				}
				if (ops[j] == '/') {
					numbers.splice(j, 2, numbers[j] / numbers[j+1]);
					ops.splice(j, 1);
					j = 0;
				}
			}
		while (ops.length > 0) {
			if (ops[0] == '-') {
				numbers.splice(0, 2, numbers[0] - numbers[1]);
			}
			if (ops[0] == '+') {
				numbers.splice(0, 2, numbers[0] + numbers[1]);
			}
			ops.splice(0, 1);
		}
	}
	display = "";
	displaycurrent.splice(0, displaycurrent.length);
	displaycurrentstr = "";
	let temp = numbers[0];
	d.splice(0, d.length);
	d.push(0);
	let temp_d = temp % 1;
	temp -= temp_d;
	if (temp_d != 0) displaycurrent.push(".");
	while (temp_d != 0) {
		temp_d *= 10;
		displaycurrent.push(temp_d - temp_d % 1);
		temp_d %= 1;
		d[0]++;
	}
	if (d[0] > 0) d[0]++;
	while (temp != 0) {
		displaycurrent.unshift(temp % 10);
		temp -= temp % 10;
		temp /= 10;
	}
	displaycurrentstr += displaycurrent[0];
	for (j = 1; j < displaycurrent.length; j++) displaycurrentstr += Math.abs(displaycurrent[j]);
	document.getElementById("display").innerHTML = display;
	document.getElementById("display-current").innerHTML = displaycurrentstr;
	i = 0;
}