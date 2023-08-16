import React, { useContext, useState } from 'react'
import { TextField } from '../TextField/TextField'
import { AuthContext } from '../../context/AuthContext';
import { Avatar } from "../../avatar"

const EditProfile = ({ profileInfo, onClose }) => {
    const { user, setUser } = useContext(AuthContext);
    const [formFields, setFormFields] = useState(profileInfo)
    const [chooseOption, setChooseOption] = useState(true)
    const [chooseAvatar, setChooseAvatar] = useState(true)
    const handleFormChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value })
    }
    const handleOption = (boolforOption, boolforAvatar) => {
        setChooseOption(boolforOption)
        setChooseAvatar(boolforAvatar)
    }
    const handleEditUser = (e) => {
        e.preventDefault()
        fetch("/api/users/edit", {
            method: "post",
            headers: {
                "content-type": "application/json",
                authorization: user.token
            },
            body: JSON.stringify({ userData: { ...user, ...formFields } })
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.errors) {
                    setUser(data.user)
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
            {chooseOption ?
                <div>
                    <button onClick={() => handleOption(false, false)}>Image URL</button> OR <button onClick={() => handleOption(false, true)}>Choose Avatar</button>
                </div> :
                chooseAvatar ?
                    <>
                        {<img style={{ width: "50px" }} src={formFields.image} />}
                        <select name="image" onChange={handleFormChange}>
                            {Avatar.map((avtr) => (
                                <option key={avtr.name} value={avtr.img}>{avtr.name}</option>
                            ))}
                        </select>
                    </>

                    :
                    <TextField
                        value={formFields.image}
                        onChange={handleFormChange}
                        inputName='image'
                        label="Profile Image"
                    />
            }

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