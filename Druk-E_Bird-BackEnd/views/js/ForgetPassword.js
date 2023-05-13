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
            showAlert('Successfully Reset Your Password!!!') 
            console.log('Successfully Reset Your Password!!!') 
        }
    } catch (err) {
        let message =
        typeof err.response !== 'undefined'
        ? err.response.data.message
        : err.message
        showAlert('error', message )
    }
}

const userDataForm = document.querySelector('.resetPassword')

userDataForm.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const password = document.getElementById('password').value
    console.log("password ", password);
    resetPassword({password})

})

