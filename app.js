const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelector(q);

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a % b;

const operate = (op, a, b) => op(a, b);
