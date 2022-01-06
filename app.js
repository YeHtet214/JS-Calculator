$(document).ready(function () {
  let result = "";
  let history = "";
  let decimal = "";

  // Events
  $("#calculation-part div").each(function () {
    $(this).on("click", getInput);
  });

  // Event Handler Function
  function getInput(e) {
    const INPUT = e.target.innerText;
    const NUMBER = parseInt(INPUT);
    decimal += NUMBER ? NUMBER : INPUT === '.' ? '.' : '';

    if (!NUMBER) {
      // operators
      switch (INPUT) {
        case "/":
        case "*":
        case "-":
        case "+":
          showResult(INPUT);
          addToHistory(history);
          break;

        case "AC":
          clearAll();
          break;

        case ".":
          integerToDecimal(decimal);
          break;

        case "0":
          showResult(INPUT);
          break;

        default:
          calculate(result);
          break;
      }

      return;
    }

    // Update UI
    showResult(INPUT);
  }

  function showResult(input) {
    history = result + input;
    // don't update   UI if there are
    // two operators in a row
    if (!parseInt(input)) {
      if (/[-*+/]/g.test(result[result.length - 1])) {
        addToHistory(history);
        return;
      }
    }
    result += input;
    $("#result").html(result);
  }

  function addToHistory(history) {
    if (/[-*+/]/g.test(history[history.length - 2])) {
      return;
    }
    $("#history").html(history);
  }

  function calculate(operants) {
    if (/[-*/+]/.test(operants[operants.length - 1])) {
      operants = operants.slice(0, operants.length - 1);
    } else if ((/[*/]/).test(operants[0])) {
        operants = operants.slice(1, operants.length);
    }
    if (!operants) return;
    let value = eval(operants);
    result = value;
    $('#history').html(operants + ' = ' + value);
    $('#result').html(value);
  }

  function integerToDecimal(num) {
    const countDecimal = decimal.split('.').length;
    if (countDecimal > 2) return;
    showResult('.');
  }

  function clearAll() {
    $("#history").empty();
    $("#result").empty();
    result = "";
  }
});
