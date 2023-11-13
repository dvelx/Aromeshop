import express from 'express'
import getAccessKey from './getAccessKey.js'

const router = express.Router()

router.get('/accessKey', getAccessKey)

export default router
