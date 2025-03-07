import TaskDetails from "../models/taskdetails.js";
import { Sequelize } from 'sequelize'; 
import Task from "../models/task.js";
import User from "../models/user.js";


export const createTaskDetails = async (req, res) => {
    try {
      const { day, description, taskId , addition_date,created_by } = req.body;
  
      
      if (!taskId) {
        return res.status(400).json({ error: 'Task ID is required' });
      }
  
      // Find the last addition_no for the given taskId
      const lastTaskDetail = await TaskDetails.findOne({
        where: { taskId },
        order: [['addition_no', 'DESC']],
      });
  
      let addition_no = 1; 
  
      // If there is a previous entry, increment addition_no by 1
      if (lastTaskDetail) {
        addition_no = lastTaskDetail.addition_no + 1;
      }
  
      // Create the new TaskDetails entry with the incremented addition_no
      const newTaskDetails = await TaskDetails.create({
        addition_no,
        day,
        description,
        taskId,
        addition_date,
        created_by  
      });
  
      return res.status(201).json({
        message: 'TaskDetails created successfully',
        data: newTaskDetails,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Server Error',
        error: error.message,
      });
    }
  };


//Old Api Owais
  // export const getDetailsByTaskId = async (req, res)  => {
  //   try {
  //       const { id } = req.params;
  
  //     console.log(req.params)
       

  //     // Validate input data
  //     if (!id) {
  //       return res.status(400).json({ error: 'Task ID is required' });
  //     }
  
  //   //   const taskDetails = await TaskDetails.findAll({
  //   //     where: { taskId: id },
  //   //   });

  //   const task = await Task.findOne({
  //       where: { id : id },
  //     });

     
  //   const user = await User.findAll({
  //     where: { id : task.assigned_to },
  //   });
  //   const taskDetails = await TaskDetails.findAll({
  //       where: { taskId: id },
  //       attributes: {
  //         include: [
  //           [
  //             Sequelize.literal(
  //               `DATE_PART('day', CURRENT_DATE::date - DATE_TRUNC('day', "TaskDetails"."created_date"::date))`
  //             ),
  //             'days_since_creation', // This will return the number of days from creation date
  //           ],
  //         ],
  //       }, order: [['id', 'ASC']], 
  //     });
  
  
  //     // If no TaskDetails found for the given taskId
  //     if (!taskDetails.length) {
  //       return res.status(404).json({ message: 'No TaskDetails found for this Task ID' });
  //     }
  
  //     // Return the TaskDetails data
  //     return res.status(200).json({
  //       message: 'Task and TaskDetails retrieved successfully',
  //       task, // Return the task data
  //       taskDetails,
  //       user // Return the task details associated with the task
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({
  //       message: 'Server Error',
  //       error: error.message,
  //     });
  //   }
  // };
  export const getDetailsByTaskId = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(req.params);

        if (!id) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        // Fetch Task details
        const task = await Task.findOne({
            where: { id: id },
        });

        // Fetch Task Details
        const taskDetails = await TaskDetails.findAll({
            where: { taskId: id },
            attributes: {
                include: [
                    [
                        Sequelize.literal(
                            `DATE_PART('day', CURRENT_DATE::date - DATE_TRUNC('day', "TaskDetails"."created_date"::date))`
                        ),
                        'days_since_creation',
                    ],
                ],
            },
            order: [['id', 'ASC']],
        });

        // Fetch User details only if task exists
        // let user = [];
        // if (task) {
        //     user = await User.findAll({
        //         where: { id: task.assigned_to },
        //     });
        // }
        let user = [];
if (task) {
    user = await User.findAll({
        where: { id: task.assigned_to },
    });

    // Check if username is null and replace it with 'N/A'
    user = user.map(u => {
        if (!u.username) {
            u.username = 'N/A';
        }
        return u;
    });
}


        // If neither Task nor TaskDetails exist, return 404
        if (!task && taskDetails.length === 0) {
            return res.status(404).json({ message: 'No Task or TaskDetails found for this Task ID' });
        }

        // Return the available data
        return res.status(200).json({
            message: 'Task and TaskDetails retrieved successfully',
            task: task || {}, // Return task if found, otherwise empty object
            taskDetails: taskDetails.length ? taskDetails : [], // Return taskDetails if found, otherwise empty array
            user: user.length ? user : [], // Return user if found, otherwise empty array
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
};
