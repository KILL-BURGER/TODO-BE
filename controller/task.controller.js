const Task = require('../model/Task')
const taskController = {};

// 과제 추가
taskController.createTask = async (req, res) => {
    try {
        const {task, isComplete} = req.body;
        const newTask = new Task({task, isComplete});
        await newTask.save();
        res.status(200).json({status: '과제 추가 완료', data: newTask});
    } catch (err) {
        res.status(400).json({status: '과제 추가 실패', error: err});
    }
};

// 전체 과제 조회
taskController.getTaskList = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({status: 'ok', data: taskList});
    } catch (err) {
        res.status(400).json({status: 'fail', error: err});
    }
}

// 단일 과제 조회
taskController.getTask = async (req, res) => {
    try {
        const target = await Task.findById(req.params.id).select("-__v -_id");
        res.status(200).json({status: 'ok', data: target});
    } catch (err) {
        res.status(400).json({status: 'fail', error: err});
    }
}

// 과제 완료, 미완료 수정
taskController.updateTask = async (req, res) => {
    try {
        const target = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            // 업데이트 후 문서반환, 업데이트시에 유효성 검증
            {new: true, runValidators: true}
        );
        res.status(200).json({status: '수정완료', data: target});
    } catch (err) {
        res.status(400).json({status: '수정실패', error: err});
    }
}

// 과제 삭제
taskController.deleteTask = async (req, res) => {
    try {
        const target = await Task.findByIdAndDelete(req.params.id);
        // 어떤 데이터가 삭제된지 반환값으로 보여준다.
        res.status(200).json({status: '삭제완료', data: target});
    } catch (err) {
        res.status(400).json({status: '삭제 실패', error: err});
    }
}

module.exports = taskController;