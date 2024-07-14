
async function signUp(event){
    event.preventDefault();
    const obj= {
        name:event.target.name.value,
        email:event.target.email.value,
        password:event.target.password.value
    }
    try {

        const res=await axios.post('http://localhost:4000/user/signup',obj)
        console.log(res);
        event.target.name.value=""
        event.target.email.value=""
        event.target.password.value=""
        alert('User Created Successfully')
        
    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }    
   
}


async function login(event){
    event.preventDefault();
    const obj={
        email:event.target.email.value,
        password:event.target.password.value
    }
    try {
        const res= await axios.post('http://localhost:4000/user/login',obj)

        console.log(res);
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("username","Harshit");
        event.target.password.value=""
        event.target.email.value=""
        window.location.href="/task"
        
    } catch(err){
        alert(err.response.data)
        console.log(err);
    }
    
}