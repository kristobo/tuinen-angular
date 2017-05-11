export class Track {

    startTime: number;
    endTime: number;
    opdrachtId: number;
    taskId: number;

    constructor(opdrachtId, taskId, startTime, endTime) {
        this.startTime      = startTime          || null;
        this.endTime        = endTime            || null;
        this.opdrachtId     = opdrachtId         || null;
        this.taskId         = taskId             || null;

    }
}