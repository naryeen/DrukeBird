import { showAlert } from './alert.js'
export const resetPassword = async (data) => 
{
    
    try {
        const res = await axios({
            method: 'POST',
            url: window.location.href,
            data,
        })

        console.log("res ", res);
        if (res.data.status === 200) 
        {
            let message =
            showAlert(message) 
            // console.log("data successfully")
        }
    } catch (err) {
        console.log("error ", err);
        let message =
        typeof err.response !== 'undefined'
        ? err.response.data.message
        : err.message
        showAlert('error', message )
        console.log(err)
        
        //showAlert('error', err.response.data.message)
    }
}

const userDataForm = document.querySelector('.resetPassword')

userDataForm.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const form = new FormData()
    form.append('password', document.getElementById('password').value)
    
    resetPassword(form)

})

