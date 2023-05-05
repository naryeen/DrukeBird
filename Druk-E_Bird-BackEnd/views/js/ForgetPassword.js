import { showAlert } from './alert.js'
export const resetPassword = async (data) => 
{
    
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://10.9.211.203:4001/api/v1/resetPassword/'+id,
            data
        })
        if (res.data.status === 'success') 
        {
            showAlert('success', 'Data updated successfully!') 
        }
    } catch (err) {
        let message =
        typeof err.response !== 'undefined'
        ? err.response.data.message
        : err.message
        showAlert('error', message )
        //showAlert('error', err.response.data.message)
    }
}

const userDataForm = document.querySelector('.resetPassword')

userDataForm.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const form = new FormData()
    form.append('resetPassword', document.getElementById('password').value)
    
    resetPassword(form)

})

