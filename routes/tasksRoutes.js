const express=require('express');
const router= express.Router();
const expanseController=require('../controller/expanseController');
const authenticate=require('../middleware/auth');


router.get('/',expanseController.getHomePage);

router.post('/add-task',authenticate,expanseController.addTask);

router.patch('/update-task',authenticate,expanseController.updateTask);

router.delete('/delete-task',authenticate,expanseController.deleteTask);

router.delete('/delete-user',authenticate,expanseController.deleteUser);

router.get('/get-task/:itemsperpage/:currentpage',authenticate,expanseController.getTask)



module.exports=router;