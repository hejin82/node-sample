module.exports = app => {
    const Tasks = app.models.tasks;
    app.get('/tasks', (req, res) => {
        /** 
        res.json({
            tasks: [
                {title: "buy some shoe"},
                {title: 'fix notebook'}
            ]
        });
        */
       Tasks.findAll({}, (tasks) => {
           res.json({tasks: tasks});
       });
    });
};