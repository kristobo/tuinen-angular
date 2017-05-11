export class Track {

    startTime: number;
    endTime: number;
    opdrachtId: number;
    taskId: number;

    constructor(startTime, endTime, opdrachtId, taskId) {
        this.startTime      = startTime          || null;
        this.endTime        = endTime            || null;
        this.opdrachtId     = opdrachtId         || null;
        this.taskId         = taskId             || null;

    }
}