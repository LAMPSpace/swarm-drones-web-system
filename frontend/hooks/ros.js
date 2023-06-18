import ROSLIB from 'roslib';

export const initRos = (ip, port) => {
    const ros = new ROSLIB.Ros({
        url: `ws://${ip}:${port}`
    });

    ros.on('connection', () => {
        console.log('Connected to websocket server.');
    });

    ros.on('error', (error) => {
        console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', () => {
        console.log('Connection to websocket server closed.');
    });

    return ros;
}

export const initTopic = (ros, topicName, topicType) => {
    return new ROSLIB.Topic({
        ros: ros,
        name: topicName,
        messageType: topicType
    });
}

export const initService = (ros, serviceName, serviceType) => {
    return new ROSLIB.Service({
        ros: ros,
        name: serviceName,
        serviceType: serviceType
    });
}

export const initParam = (ros, paramName) => {
    return new ROSLIB.Param({
        ros: ros,
        name: paramName
    });
}

export const initActionClient = (ros, actionName, actionType) => {
    return new ROSLIB.ActionClient({
        ros: ros,
        serverName: actionName,
        actionName: actionType
    });
}

export const initPose = (x, y, z, qx, qy, qz, qw) => {
    return new ROSLIB.Pose({
        position: {
            x: x,
            y: y,
            z: z
        },
        orientation: {
            x: qx,
            y: qy,
            z: qz,
            w: qw
        }
    });
}