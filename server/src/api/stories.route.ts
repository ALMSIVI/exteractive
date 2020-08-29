import { Router } from 'express'
import StoriesController from './stories.controller'

const router: Router = Router()

router.route('/root').get(StoriesController.apiGetRoot)

export default router
