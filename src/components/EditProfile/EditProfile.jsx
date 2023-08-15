import React, { useContext, useState } from 'react'
import { TextField } from '../TextField/TextField'
import { AuthContext } from '../../context/AuthContext';

const EditProfile = ({ profileInfo, onClose }) => {
    const { user, setUser } = useContext(AuthContext);
    const [formFields, setFormFields] = useState(profileInfo)

    const handleFormChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value })
    }

    const handleEditUser = (e) => {
        e.preventDefault()
        fetch("/api/users/edit", {
            method: "post",
            headers: {
                "content-type": "application/json",
                authorization: user.token
            },
            body: JSON.stringify({ post: { ...user, ...formFields } })
        })
            .then((res) => res.json())
            .then((data) => {
                // The API is not working giving the initial data everytime. So I am setting the state manually to the updated value 
                if (!data.errors) {
                    setUser({ ...user, ...formFields })
                    onClose()
                }
            })
            .catch(e => console.log("Error is ", e))
    }

    return (
        <form onSubmit={handleEditUser} className='login-form'>
            <h3>Edit Profile</h3>
            <TextField
                value={formFields.username}
                onChange={handleFormChange}
                inputName='username'
                label="Username"
            />
            <TextField
                value={formFields.image}
                onChange={handleFormChange}
                inputName='image'
                label="Profile Image"
            />
            <TextField
                value={formFields.bio}
                onChange={handleFormChange}
                inputName='bio'
                label='Bio'
                required
            />
            <TextField
                value={formFields.github_Url}
                onChange={handleFormChange}
                inputName='github_Url'
                label="Github Url"
            />
            <TextField
                value={formFields.portfolio_url}
                onChange={handleFormChange}
                inputName='portfolio_url'
                label="Portfolio Url"
            />
            <button>Submit</button>
        </form>
    )
}

export default EditProfile