import { Router } from 'express'
import StoriesController from './stories.controller'

const router: Router = Router()

router.route('/root').get(StoriesController.apiGetRoot)
router.route('/story/:id').get(StoriesController.apiGetStory)
router.route('/children/:id').get(StoriesController.apiGetChildren)
router.route('/tree/:id').get(StoriesController.apiGetTree)

export default router
