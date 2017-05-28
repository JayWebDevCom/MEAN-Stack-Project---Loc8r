function updateErrorSection (e) {
  console.log(e.message)
  var newli = document.createElement("li");
  var text = document.createTextNode(e.message);
  newli.appendChild(text);
  document.getElementById("testOutput").appendChild(newli)
}

function updateSection(assert) {
  var output = "Passed - " + assert._testName
  var newli = document.createElement("li");
  var text = document.createTextNode(output);
  newli.appendChild(text);
  document.getElementById("testOutput").appendChild(newli)
}

function Assert(subject, testName, expectation) {
  this._subject = subject;
  this._testName = testName;
  this._expectation = expectation;
}

Assert.prototype.isEqual = function () {
  if (this._subject == this._expectation) {
    updateSection(this)
  } else {
    throw new Error("Failed - " + this._testName);
  }
};

Assert.prototype.isInstanceOf = function () {
  if ((this._subject instanceof this._expectation)) {
    updateSection(this)
  } else {
    throw new Error("Failed - " + this._testName);
  }
};

Assert.prototype.isTypeOf = function () {
  if ((typeof this._subject === this._expectation)) {
    updateSection(this)
  } else {
    throw new Error("Failed - " + this._testName);
  }
};
