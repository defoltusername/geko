
const users=[
    {
    username:"Admin",password:"1234",isBlocked:false
    },
   {
    username:"John",password:"qwerty",isBlocked:true
    }, 
    {
        username:"Anna",password:"pass",isBlocked:false
    }
];
function login(users,username,password){

let user=null;

for(let i=0;i<users.length;i++){
    if(users[i].username===username){
        user=users[i];
        console.log(`${username}`)
        break;
    } 
}
    if(!user){
        console.log("User not found");
        return;
    }

if(user.password!==password){
    console.log("Wrong Password");
    return;
}

if(user.isBlocked){
    console.log("User is blocked");
    return;
}
console.log(`Welcome ,${username}`);
}

login(users,"Admin","1234");
login(users,"John","qwerty");
login(users,"Anna","1111");
login(users,"Mike","2222");
