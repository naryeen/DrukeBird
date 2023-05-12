import { showAlert } from './alert.js'
export const resetPassword = async (data) => 
{
    
    try {
        const res = await axios({
            method: 'POST',
            url: window.location.href,
            data
        })
        if (res.data.status === 200) 
        {
            // let message =
            showAlert("password reset successful") 
        }
    } catch (err) {
        console.log("error ", err);
        let message =
        typeof err.response !== 'undefined'
        ? err.response.data.message
        : err.message
        showAlert('error', message )
        console.log(err)
    }
}

const userDataForm = document.querySelector('.resetPassword')

userDataForm.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const password = document.getElementById('password').value
    console.log("pasword ", password);
    resetPassword({password})

})

