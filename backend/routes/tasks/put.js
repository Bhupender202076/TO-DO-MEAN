const Task = require("../../models/Task")



module.exports = {
    updateTask:(req,res,next)=>{
        const url = req.protocol + "://" + req.get("host");
        let imagePath = req.body.imagePath;
        if(req.file){
            imagePath =  url +'/images/' + req.file.filename;
        }
        console.log(imagePath);

        const task = new Task({
            _id: req.body._id,
            title: req.body.title,
            description: req.body.description,
            imagePath: imagePath
        });
    
        Task.updateOne({_id:req.body._id,creator: req.userData.userId},task)
        .then ((result)=>{
            console.log(result);
            res.json({
                status:{
                    message:"successfully",
                    code: 201
                },
                data:task
            
            });
    
        }
        ).catch(e=>{
            res.status(500).json({
              status:{
                  message: e.message,
                  code: 500
              }
          });
        });
      
    }
    
}