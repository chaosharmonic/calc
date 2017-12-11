var active = "";
var stored = null;
var end = false;
var mode = null;

function digit(num){
  if (end){
    active = num;
    end = false;
  }
  else if(active.length < 12){
    active += num;
  }
  $("#input").text(active);
}

function negate(){
  if (active[0] !== "-"){
    active = "-" + active;
  }
  else {
    active = active.split("");
    active.shift();
    active = active.join("");
  }
  $("#input").text(active);
}


function operator(op){

  if (op !== "=") {
    if (stored === null){
      stored = Number(active);
    }
    else {
      evaluate();
    }
    mode = op;
    $("#mem").text(stored  + " " + mode);
    ce();
  }
  else {
    if (!(active == 0 && mode == "/")){
      evaluate();
    }
    if (stored !== null){
      if (active == 0 && mode == "/"){
        $("#input").text("DIV/0!");
        $("#mem").text("");
        setTimeout(function(){
          clearMem();
        }, 1500);
      }
      else{
        active = stored;
        if (String(active).length > 12) {
          active = Number(String(active).slice(0,11));
        }
        $("#input").text(active);
        stored = null;
        $("#mem").text("");
        mode = null;
        end = true;
      }
    }
  }
}

function backspace() {
  active = active.split("");
  active.pop();
  active = active.join("");
  $("#input").text(active);
}

function ce(){
  active = "";
  $("#input").text("");
}


function clearMem(){
  ce();
  stored = null;
  $("#mem").text("");
  mode = null;
}


function evaluate(){
  if (stored !== null){
    active = Number(active);
    switch (mode){
      case "+":
        stored += active;
        break;
      case "-":
        stored -= active;
        break;
      case "*":
        stored *= active;
        break;
      case "/":
        stored /= active;
        break;
    }
  }
  mode = null;
  $("#mem").text(stored);
}

$("#add").click(function(){
  operator("+");
});
$("#subtract").click(function(){
  operator("-");
});
$("#multiply").click(function(){
  operator("*");
});
$("#divide").click(function(){
  operator("/");
});
$("#equals").click(function(){
  operator("=");
});


$("#one").click(function(){
  digit("1");
});
$("#two").click(function(){
  digit("2");
});
$("#three").click(function(){
  digit("3");
});
$("#four").click(function(){
  digit("4");
});
$("#five").click(function(){
  digit("5");
});
$("#six").click(function(){
  digit("6");
});
$("#seven").click(function(){
  digit("7");
});
$("#eight").click(function(){
  digit("8");
});
$("#nine").click(function(){
  digit("9");
});
$("#zero").click(function(){
  digit("0");
});
$("#point").click(function(){
  if(!(active.includes("."))){
    digit(".");
  }
});

$("#c").click(function(){
  clearMem();
});
$("#ce").click(function(){
  ce();
});
$("#backspace").click(function(){
  backspace();
});
$("#negate").click(function(){
  negate();
});


// TODO: keypress events
