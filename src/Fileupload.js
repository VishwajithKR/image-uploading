import React, { useState } from 'react'
import './App.css'

function Fileupload() {
    const [image, setImage] = useState()
    const [imageName, setImageName] = useState()
    const [loading, setLoading] = useState(false)

    const file = async (e) => {
        setImage(e.target.files)
        setImageName(e.target.files[0].name)
    }
    console.log(image)
    const uploaded = (e) => {
        e.preventDefault()
        const files = image
        if (files) {
            const data = new FormData();
            data.append('file', files[0])
            data.append('upload_preset', 'vishwapics')


            fetch('https://api.cloudinary.com/v1_1/cloudinarysite/image/upload', {
                method: 'post',
                body: data
            })

                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setImage(data.secure_url)
                    setLoading(true)
                }).catch((err) => {
                    console.log(err)
                })

        } else {
            alert("please upload the image")
        }

    }

    const Reupload = () => {
        setLoading(false)
    }

    return (
        <div className="container">
            <div className="row">
                <div className='col-4 mt-5' >
                    {
                        loading ? (<img src={image} alt="" className='uploadimage' />) : (<h4>Loading...</h4>)
                    }

                </div>
                <div className='col-4 mt-5'>
                    <form>
                        <h3>React File Upload</h3>
                        <div className="form-group mt-3">
                            <div className=''>
                            
                            </div>
                            <label htmlFor="file" className= {loading ? 'disabled form-label' :'form-label'}>
                                <img className='click' src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-upload-icon-image_1347930.jpg" alt="upload image" />

                            
                            </label>
                            <input type="file" name='file' placeholder='select the image' hidden id="file" onChange={file} />
                        </div>
                        <p>{imageName}</p>
                        <div className="form-group mt-3">
                            {
                                loading ? (<button className="btn btn-primary" type="submit" disabled onClick={uploaded}>Upload</button>) : (<button className="btn btn-primary" type="submit" onClick={uploaded}>Upload</button>)
                            }
                            {
                                loading ? (<button className="btn btn-danger ms-4" type="submit" onClick={Reupload}>Re-upload</button>) : (null)
                            }

                        </div>
                    </form>


                </div>
                <div className='col-4' >

                </div>
            </div>
        </div>
    )
}

export default Fileupload