"use strict";

const sucess_Ok = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Ok";
    }
    return res(response, true, 200, false, 200, message, data);
  };
};

const sucess_not_found = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Not found";
    }
    return res(response, true, 200, true, 404, message, data);
  };
};

const sucess_internal_server = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Server error";
    }
    return res(response, false, 200, true, 500, message, data);
  };
};

const sucess_external_error = response => {
  return (message = "", code = 500, data = {}) => {
    if (message === "") {
      message = "External error";
    }
    return res(response, false, 200, true, code, message, data);
  };
};

const sucess_external_validation = response => {
  return (error = true,  code = 500, message = "", data = {}) => {
    return res(response, !error, 200, error, code, message, data);
  };
};

const sucess_not_authorized = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Not authorized error";
    }
    return res(response, false, 200, true, 403, message, data);
  };
};

const sucess_unprocessable_entity = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Unprocessable entity error";
    }
    return res(response, false, 200, true, 422, message, data);
  };
};

const not_found = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Resource not found";
    }
    return res(response, false, 404, true, 404, message, data);
  };
};

const internal_server = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Internal Server error";
    }
    return res(response, false, 500, true, 500, message, data);
  };
};

const not_authorized = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Not authorized error";
    }
    return res(response, false, 403, true, 403, message, data);
  };
};

const expired_token = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Expired token error";
    }
    return res(response, false, 401, true, 401, message, data);
  };
};

const not_unprocessable_entity = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Validation error";
    }
    return res(response, false, 422, true, 422, message, data);
  };
};

function res(response, status, code, error, insideCode, message, data) {
  let responseBody = {
    status: status,
    code: code,
    data: {
      error: error,
      code: insideCode,
      message: message,
      ...data
    }
  };
  return response.status(responseBody.code).send(responseBody);
}

module.exports = {
  sucess_Ok,
  sucess_not_found,
  sucess_internal_server,
  sucess_external_error,
  sucess_external_validation,
  sucess_not_authorized,
  sucess_unprocessable_entity,
  not_found,
  internal_server,
  not_authorized,
  not_unprocessable_entity,
  expired_token
};