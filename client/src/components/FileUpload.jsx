import React, { useState } from "react"
import { FormGroup, Input, Button } from "reactstrap"
import axios from "axios"

const FileUpload = () => {
  const [file, setFile] = useState("")
  const [uploadFile, setUploadFile] = useState({})

  const onChange = (e) => {
    setFile(e.target.files[0])
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      const { fileName, filePath } = response.data
      setUploadFile({ fileName, filePath })
    } catch (error) {
      if (error.response.status === 500) {
        console.log("There was a problem in server")
      } else {
        console.log(error.response.data.message)
      }
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormGroup className='my-2'>
          <Input id='uploadFile' name='file' type='file' onChange={onChange} />
        </FormGroup>
        <Button
          color='primary'
          className='mt-4'
          style={{ width: "100%" }}
          tag='input'
          type='submit'
          value='Upload'
        />
      </form>

      {uploadFile && (
        <div className='row'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadFile.filePath} alt='' />
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload
