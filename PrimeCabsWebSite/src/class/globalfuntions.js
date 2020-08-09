/**
 * Created by Jayendra Matarage on 6/9/2019.
 */
import {NotificationManager} from 'react-notifications';
import AWN from "awesome-notifications";

export function ViewNotification(type, title, message, time=5000) {

        switch (type) {
            case 'info':
                NotificationManager.info(message, title, time);
                break;
            case 'success':
                NotificationManager.success(message, title, time);
                break;
            case 'warning':
                NotificationManager.warning(message, title, time);
                break;
            case 'error':
                NotificationManager.error(message, title, time);
                break;
            default:
                break;
        }

}

export function Awesomenotifications(type,message,options = null) {
   let notification =  new AWN();
   switch (type) {
       case 'success':
           notification.success(message, options);
           break;
       default:
           break;
   }
}