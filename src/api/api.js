import qs from "qs";
import axios from "axios";
import idx from "idx";
import { CONTENT_TYPE } from "../utils/constants";
import { API_URL } from "@env";

const HEADERS = {
  "Content-Type": CONTENT_TYPE,
};

class Api {
  constructor(baseURL, headers = {}) {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL,
      headers,
      timeout: 35 * 1000,
    });
    this.headers = headers;
  }

  setAccessToken = (token) => {
    if (token) {
      this.headers = {
        ...this.headers,
        authorization: "Bearer " + token,
      };
    } else {
      delete this.headers.authorization;
    }
  };

  setUserCredentials = (name, password) => {
    this.headers = {
      ...this.headers,
      "Auth-Email": name,
      "Auth-Password": password,
    };
  };

  jsonToFormData = (json) => {
    const formData = new FormData();

    Object.keys(json).forEach((key) => {
      formData.append(key, json[key]);
    });

    return formData;
  };

  jsonToQuery = (json) => (json ? `?${qs.stringify(json)}` : "");

  get = async (path = "", data, options = {}) => {
    const strQuery = this.jsonToQuery(data);
    const res = await this.api
      .get(`${path}${strQuery}`, {
        ...options,
        headers: { ...this.headers, ...options.headers },
      })
      .catch((error) => {
        this.handleRequestError(error, path, data, options);
      });
    return res.data;
  };

  post = async (path = "", body, options = {}) => {
    const res = await this.api
      .post(path, body, {
        ...options,
        headers: { ...this.headers, ...options.headers },
      })
      .catch((error) => {
        this.handleRequestError(error, path, body, options);
      });
    return res.data;
  };

  patch = async (path = "", body, options = {}) => {
    const res = await this.api
      .patch(path, body, {
        ...options,
        headers: { ...this.headers, ...options.headers },
      })
      .catch((error) => {
        this.handleRequestError(error, path, body, options);
      });
    return res.data;
  };

  put = async (path = "", body, options = {}) => {
    const res = await this.api
      .put(path, body, {
        ...options,
        headers: { ...this.headers, ...options.headers },
      })
      .catch((error) => {
        this.handleRequestError(error, path, body, options);
      });

    return res.data;
  };

  delete = async (path = "", body, options = {}) => {
    const res = await this.api
      .delete(path, {
        ...options,
        data: body,
        headers: { ...this.headers, ...options.headers },
      })
      .catch((error) => {
        this.handleRequestError(error, path, body, options);
      });

    return res.data;
  };

  handleRequestError = (error, path, body, options) => {
    const err = new Error();
    if (!error.response && !error.code) {
      err.name = "NETWORK_ERROR";
      err.status = "SERVER_ERROR";
      err.message = "Network error";
    } else if (!error.response && error.code === "ECONNABORTED") {
      err.name = "TIMEOUT_ERROR";
      err.status = "SERVER_ERROR";
      err.message = "Timeout from server";
    } else {
      err.name = "SERVER_ERROR";
      err.status = "SERVER_ERROR";
      err.message =
        idx(error, (_) => _.response.data.message) ||
        `Server error, status: ${idx(error, (_) => _.response.status)}`;
      err.statusCode = idx(error, (_) => _.response.status);
      err.data = idx(error, (_) => _.response.data);
      err.headers = idx(error, (_) => _.response.headers);
      err.type = idx(error, (_) => _.response.data.error_type);
      err.req = {
        path: `${this.baseURL}${path}`,
        body,
        options,
      };
    }

    if (__DEV__) {
      console.log(
        "SERVER_ERROR",
        "name",
        err.name,
        "status",
        err.status,
        "message",
        err.message,
        "statusCode",
        err.statusCode,
        "data",
        err.data,
        "headers",
        err.headers,
        "path",
        `${this.baseURL}${path}`,
        "body/query",
        body,
        "options",
        options
      );
    }
    throw err;
  };
}

export default new Api(API_URL, HEADERS);
