parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"EHrm":[function(require,module,exports) {
module.exports={name:"javascript-calculator",version:"1.1.0",description:"Advanced Front End Development Project for FreeCodeCamp",keywords:["javascript calculator","freecodecamp"],homepage:"https://javascriptcalculator.mikelowe.xyz/",bugs:{url:"https://github.com/vanillaSlice/JavaScriptCalculator/issues",email:"mikelowedev@gmail.com"},license:"MIT",author:{name:"Mike Lowe",email:"mikelowedev@gmail.com",url:"https://www.mikelowe.xyz/"},repository:{type:"git",url:"https://github.com/vanillaSlice/JavaScriptCalculator.git"},scripts:{test:"run-s test:*","test:lint":"run-s test:lint:*","test:lint:css":"stylelint src/**/*.css","test:lint:js":"eslint src/**/*.js",start:"parcel src/index.html -d build",build:"parcel build src/index.html -d build --public-url ./"},devDependencies:{acorn:"^6.0.6",autoprefixer:"^9.4.7",eslint:"^5.13.0","eslint-config-airbnb-base":"^13.1.0","eslint-plugin-import":"^2.16.0","npm-run-all":"^4.1.5","parcel-bundler":"^1.12.3","parcel-plugin-browserconfig":"^1.0.0",stylelint:"^9.10.1","stylelint-config-recommended":"^2.1.0"},private:!0};
},{}],"g2Hq":[function(require,module,exports) {
"use strict";var _package=require("../../package.json"),inputs=["0"],screenTextElement=document.querySelector(".js-screen-text"),acBtnElement=document.querySelector(".js-ac-btn"),ceBtnElement=document.querySelector(".js-ce-btn"),numberBtnElements=[].slice.call(document.querySelectorAll(".js-number-btn")),operationBtnElements=[].slice.call(document.querySelectorAll(".js-operation-btn")),decimalPointBtnElement=document.querySelector(".js-decimal-point-btn"),equalsBtnElement=document.querySelector(".js-equals-btn"),versionElement=document.querySelector(".js-version");function resetInputs(){inputs=["0"]}function displayInputs(){screenTextElement.innerText=inputs.join("")}function clearAll(){resetInputs(),displayInputs()}function hasMoreThanOneInput(){return inputs.length>1}function removeLastInput(){inputs.pop()}function clearEntry(){hasMoreThanOneInput()?(removeLastInput(),displayInputs()):clearAll()}function getLastInput(){return inputs[inputs.length-1]}function isAnOperation(n){return"÷"===n||"×"===n||"+"===n||"−"===n}function setLastInput(n){inputs[inputs.length-1]=n}function appendToLastInput(n){inputs[inputs.length-1]+=n}function appendNumber(n){var e=n.target.innerText,t=getLastInput();isAnOperation(t)?inputs.push(e):"0"===t?setLastInput(e):appendToLastInput(e),displayInputs()}function appendMinus(){var n=getLastInput();"0"!==n||hasMoreThanOneInput()?"−"!==n&&inputs.push("−"):inputs[0]="−"}function appendOperation(n){var e=n.target.innerText;"−"===e?appendMinus():isAnOperation(getLastInput())||inputs.push(e),displayInputs()}function containsDecimalPoint(n){return n.includes(".")}function appendDecimalPoint(){containsDecimalPoint(getLastInput())||(appendToLastInput("."),displayInputs())}function normaliseInputs(){return inputs.join("").replace(/÷/g,"/").replace(/×/g,"*").replace(/−/g,"-")}function evaluate(expression){try{return eval(expression)}catch(error){return error}}function isInvalidResult(n){return!Number.isFinite(n)}function handleCalculationError(){screenTextElement.innerText="Error",resetInputs()}function normaliseResult(n){return String(n).replace(/-/g,"−")}function calculateResult(){var n=evaluate(normaliseInputs());isInvalidResult(n)?handleCalculationError():(inputs=[normaliseResult(n)],displayInputs())}acBtnElement.addEventListener("click",clearAll),ceBtnElement.addEventListener("click",clearEntry),numberBtnElements.forEach(function(n){return n.addEventListener("click",appendNumber)}),operationBtnElements.forEach(function(n){return n.addEventListener("click",appendOperation)}),decimalPointBtnElement.addEventListener("click",appendDecimalPoint),equalsBtnElement.addEventListener("click",calculateResult),versionElement.innerText=_package.version;
},{"../../package.json":"EHrm"}]},{},["g2Hq"], null)
//# sourceMappingURL=scripts.06a9a26b.js.map