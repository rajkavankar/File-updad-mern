import express from "express"

import fileUpload from "express-fileupload"

const app = express()
const PORT = 5000

app.use(fileUpload())

app.get("/msg", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to react file upload",
  })
})

app.post("/uploads", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({
      success: false,
      message: "No file to upload",
    })
  }

  const file = req.files.file

  file.mv(`./client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        success: false,
        message: err,
      })
    }

    res.status(201).json({
      success: true,
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
    })
  })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
