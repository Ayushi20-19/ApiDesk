import axios from "axios";
import React, { useState } from "react";
import ReactJson from "react-json-view";

const ShowApiData = () => {
  const [method, setMethod] = useState("GET");
  const [apiUrl, setApiUrl] = useState();
  const [apiResponse, setApiResponse] = useState({});
  const [jsonData, setJsonData] = useState({});
  const [error, setError] = useState();
  const [jsonError, setJsonError] = useState("");
  const [headerInputs, setHeaderInputs] = useState({
    headerKey: "Accept",
    headerValue: "*/*",
  });

  const headerInputHandler = (e) => {
    setHeaderInputs({ ...headerInputs, [e.target.name]: e.target.value });
  };

  const jsonDataHandler = (e) => {
    try {
      setJsonData(e.target.value);
      setJsonError("Error in JSON format");
    } catch (e) {
      setJsonError("Error in JSON format");
    }
  };

  const apiCallHandler = async () => {
    var keyHead = headerInputs.headerKey || "Accept";
    var value = headerInputs.headerValue || "*/*";
    if (method === "GET") {
      try {
        const res = await axios.get(apiUrl, {
          headers: { [keyHead]: value },
        });

        setApiResponse(res);
      } catch (error) {
        setError(error.message);
      }
    } else if (method === "POST") {
      try {
        const res = await axios.post(apiUrl, jsonData, {
          headers: { [keyHead]: value },
        });

        setApiResponse(res);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const submitHandler = () => {
    setError("");
    apiCallHandler();
  };

  return (
    <div>
      <select
        onChange={(e) => setMethod(e.target.value)}
        placeholder='Select method'>
        select method
        <option>GET</option>
        <option>POST</option>
      </select>
      <input
        placeholder='Enter Your API url'
        onChange={(e) => setApiUrl(e.target.value)}
      />
      <button onClick={submitHandler}>Submit</button>
      <div className='header'>
        <div className='div1'>
          <input
            type='text'
            placeholder='header key'
            name='headerKey'
            value={headerInputs.headerKey}
            onChange={headerInputHandler}
          />
          <input
            type='text'
            name='headerValue'
            value={headerInputs.headerValue}
            placeholder='header value'
            onChange={headerInputHandler}
          />
        </div>
      </div>
      <div className='body'>
        <textarea
          onChange={jsonDataHandler}
          placeholder='put json object data'></textarea>
        {jsonError}
      </div>
      <div className=''>
        {error ? (
          error
        ) : apiResponse === undefined ? (
          <h2>Response is undefined</h2>
        ) : (
          <>
            <h2>Headers:</h2>
            <ReactJson
              src={apiResponse.headers}
              theme={"parasio"}
              collapsed={2}
              collapseStringsAfterLength={10}
            />
            <h2>Data:</h2>
            <ReactJson
              src={apiResponse.data}
              theme={"parasio"}
              collapsed={2}
              collapseStringsAfterLength={10}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ShowApiData;
