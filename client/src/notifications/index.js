import { store } from "react-notifications-component";

export function triggerSuccessNotification(
  title,
  msg = "Action successfully completed"
) {
  store.addNotification({
    title: title,
    message: msg,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
}

export function triggerFailureNotification(
  title,
  msg = "Failed to complete action"
) {
  store.addNotification({
    title: title,
    message: msg,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
}

export function triggerInfoNotification(title, msg) {
  store.addNotification({
    title: title,
    message: msg,
    type: "info",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
}
