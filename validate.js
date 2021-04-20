$().ready(function() {
    $("#regform").validate({
        rules:{
            username:{
                required: true,
                minlength: 2
            },
            password:{
                required: true,
                minlength: 6,
                validPassword: true
            },
            fullname:{
                required: true,
                validName: true
            },
            email:{
                required: true,
                email: true
            },
            date:{
                required: true,
                minDate: true
            }
        },
        errorElement: "em"
    });
    
});
$.validator.addMethod("minDate", function (value, element) {
    var now = new Date();
    var myDate = new Date(value);
    return this.optional(element) || myDate < now;
},"this date is in the future");

$.validator.addMethod('validPassword',function(value,element){
    return this.optional(element)
    || (value.search(/[a-zA-Z0-9]/) >= 0 
    && value.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\,\.\?\\\'\`\~\{\}\[\]\|\-]/) == -1);
},"Password should contains numbers and letters only");

$.validator.addMethod('validName',function(value,element){
    return this.optional(element)
    || value.search(/[0-9]/) == -1;
},"Full name should contains only letters")


$("#submit").on('click',function(){
    $("#regform").valid();
});


