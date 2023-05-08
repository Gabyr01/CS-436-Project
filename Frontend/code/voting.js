const vote=document.getElementById("vote");
var point = 0;

vote.addEventListener("click", function(){
    val = document.querySelector('input[name="choice"]:checked').value;
    val = Number(val);
    point = point + val;
    vote.disabled = true;
})