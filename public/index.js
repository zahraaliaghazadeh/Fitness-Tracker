const workoutBtn = $("#addworkout")
const workoutinput = $(".workoutInput")
const workoutInputBtn =$("#workoutBtn")
const workoutInputField = $("#workoutInput")
// to hide the input 
workoutinput.hide();

workoutBtn.on("click",function(){
    workoutinput.show();
})

workoutInputBtn.on("click", function(){
    let workoutToSave= workoutInputField.val()
    workoutinput.hide()
})

