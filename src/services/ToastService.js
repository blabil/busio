const ToastService = {

    prepareToastMessage(response)
    {
        let message = "";
        if (Array.isArray(response))
          message = response[0];
        else message = response;
        return message;
    }
}

export default ToastService;