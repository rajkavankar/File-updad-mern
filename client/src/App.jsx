import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container } from "reactstrap"
import { FaReact } from "react-icons/fa"
import FileUpload from "./components/FileUpload"
import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  const [message, setMessage] = useState("")

  useEffect(() => {
    return () => {
      const fetchMessage = async () => {
        const res = await axios.get("/msg")
        const { message } = res.data
        console.log(message)
      }

      fetchMessage()
    }
  }, [])
  return (
    <div>
      <Container className='my-4'>
        <h1 className='display-4 text-center mb-2'>
          <FaReact /> React file upload
        </h1>
        <FileUpload />
      </Container>
    </div>
  )
}

export default App
