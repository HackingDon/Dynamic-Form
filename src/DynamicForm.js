import {
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  Paper,
  Box,
  Modal,
  Alert,
  Snackbar,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";

const DynamicForm = () => {
  const [expand, setExpand] = useState("Accordion1");
  const [change, setChange] = useState(false);
  const [obj1, setObj1] = useState({});
  const [id, setId] = useState();
  const [alertMessage, setAlertMessage] = useState(false);
  const [open, setOpen] = useState(false);
  let obj = useMemo(
    () => ({
      Accordion1: {
        Name: {
          value: "Person1",
          type: "string",
        },
        Age: {
          value: 20,
          type: "int",
        },
        City: {
          value: "NewYork",
          type: "string",
        },
        Favcolor: {
          list: ["Orange", "Red", "Pink", "Green"],
          value: "Pink",
          type: "dropdown",
        },
        Favcity: {
          list: ["Chennai", "Goa", "Mumbai", "Delhi"],
          value: "Mumbai",
          type: "dropdown",
        },
        Vote_Eligible: {
          value: true,
          type: "radio",
        },
        Married: {
          value: false,
          type: "radio",
        },
      },
      Accordion2: {
        Name: {
          value: "Person1",
          type: "string",
        },
        DOB: {
          value: "24/12/2024",
          type: "date",
        },
        City: {
          value: "NewYork",
          type: "string",
        },
        Favcolor: {
          list: ["Orange", "Red", "Pink", "Green"],
          value: "Red",
          type: "dropdown",
        },
        Favcity: {
          list: ["Chennai", "Goa", "Mumbai", "Delhi"],
          value: "Goa",
          type: "dropdown",
        },
        Vote_Eligible: {
          value: true,
          type: "radio",
        },
        Married: {
          value: false,
          type: "radio",
        },
      },
      Accordion3: [
        {
          Name: {
            value: "Person1",
            type: "string",
          },
          Email: {
            value: "abc@gmail.com",
            type: "email",
          },
          Company: {
            value: "New Company1",
            type: "string",
          },
        },
        {
          Name: {
            value: "Person2",
            type: "string",
          },
          Email: {
            value: "def@gmail.com",
            type: "email",
          },
          Company: {
            value: "New Company2",
            type: "string",
          },
        },
        {
          Name: {
            value: "Person3",
            type: "string",
          },
          Email: {
            value: "hij@gmail.com",
            type: "email",
          },
          Company: {
            value: "New Company3",
            type: "string",
          },
        },
      ],
    }),
    []
  );
  const checkChange = (value1, value2) => {
    if (value1 === value2) {
      setChange(false);
    } else {
      setChange(true);
    }
  };
  let columns = [
    ...Object.keys(obj["Accordion3"][0]).map((value) => {
      return { field: value, width: 200 };
    }),
    {
      field: "Actions",
      width: 200,
      renderCell: (params) => (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpen(true);
            setId(params.id);
          }}
        >
          Edit
        </p>
      ),
    },
  ];
  const call = (panel) => (_, isExpanded) => {
    if (change) {
      setExpand((prev) => prev);
      setAlertMessage(true);
      setTimeout(() => {
        setAlertMessage(false);
      }, 2000);
    } else {
      isExpanded ? setExpand(panel) : setExpand(null);
    }
  };
  useEffect(() => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      newObj[key] = key === "Accordion3" ? [] : {};
      key === "Accordion3"
        ? obj[key].map((value, ind) => {
            let mapObj = { id: ind };
            Object.keys(value).forEach((subKey) => {
              mapObj[subKey] = value[subKey].value;
            });
            return newObj[key]?.push(mapObj);
          })
        : Object.keys(obj[key]).forEach((subKey) => {
            newObj[key][subKey] = obj[key][subKey].value;
          });
    });
    return setObj1(newObj);
  }, [obj]);
  function submit(e,val) {
    setChange(false);
    e.preventDefault();
    console.log(obj1[val]);
  }
  return (
    <>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            width: 400,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
          }}
        >
          {obj["Accordion3"] && id !== undefined ? (
            Object.keys(obj1["Accordion3"][id]).map((val, ind) =>
              ind !== Object.keys(obj1["Accordion3"][id]).length - 1 ? (
                <div className="w-75" key={ind}>
                  <TextField
                    size="small"
                    className="mt-3"
                    label={val}
                    onChange={(e) => {
                      setObj1({
                        ...obj1,
                        Accordion3: obj1["Accordion3"].map((value, ind) => {
                          return id === ind
                            ? { ...value, [val]: e.target.value }
                            : { ...value };
                        }),
                      });
                    }}
                    value={obj1["Accordion3"][id][val]}
                  />
                </div>
              ) : (
                <React.Fragment key={ind}>
                  <div className="w-75">
                    <TextField
                      size="small"
                      className="mt-3"
                      label={val}
                      onChange={(e) => {
                        setObj1({
                          ...obj1,
                          Accordion3: obj1["Accordion3"].map((value, ind) => {
                            return id === ind
                              ? { ...value, [val]: e.target.value }
                              : { ...value };
                          }),
                        });
                      }}
                      value={obj1["Accordion3"][id][val]}
                      key={ind}
                    />
                  </div>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={(e) => {
                      submit(e,"Accordion3")
                      setOpen(false)}}
                    className="mt-3"
                  >
                    Save
                  </Button>
                </React.Fragment>
              )
            )
          ) : (
            <></>
          )}
        </Box>
      </Modal>
      {Object.keys(obj).map((val, ind) => (
        <Accordion key={ind} expanded={expand === val} onChange={call(val)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">{val}</Typography>
          </AccordionSummary>
          <form className="row align-items-center w-100">
            {val === "Accordion3" ? (
              <div className="d-flex justify-content-center mb-4">
                <Paper style={{ width: 810 }}>
                  <DataGrid rows={obj1[val]} columns={columns} hideFooter />
                </Paper>
              </div>
            ) : (
              Object.keys(obj[val]).map((value, index) => (
                <div key={index} className="col-4 d-flex align-item-center p-4">
                  <div className="d-flex align-items-center">
                    <label className="me-2">{value}:</label>
                  </div>
                  {obj[val][value].type === "radio" ? (
                    <React.Fragment>
                      <label className="me-3">
                        <input
                          size="small"
                          checked={
                            obj1[val] && obj1[val][value] !== undefined
                              ? obj1[val][value] === true
                              : obj[val][value].value === true
                          }
                          type={obj[val][value].type}
                          onChange={() => {
                            setObj1({
                              ...obj1,
                              [val]: { ...obj1[val], [value]: true },
                            });
                            checkChange(obj[val][value].value, true);
                          }}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          size="small"
                          checked={
                            obj1[val] && obj1[val][value] !== undefined
                              ? obj1[val][value] === false
                              : obj[val][value].value === false
                          }
                          type={obj[val][value].type}
                          onChange={() => {
                            setObj1({
                              ...obj1,
                              [val]: { ...obj1[val], [value]: false },
                            });
                            checkChange(obj[val][value].value, false);
                          }}
                        />
                        No
                      </label>
                    </React.Fragment>
                  ) : obj[val][value].type === "dropdown" ? (
                    <TextField
                      size="small"
                      style={{ width: "150px" }}
                      select
                      slotProps={{
                        select: {
                          native: true,
                        },
                      }}
                      value={obj[val][value].value}
                      onChange={(e) => {
                        setObj1({
                          ...obj1,
                          [val]: { ...obj1[val], [value]: e.target.value },
                        });
                        checkChange(obj[val][value].value, e.target.value);
                      }}
                    >
                      {obj[val][value].list?.map((value, ind) => (
                        <option key={ind} value={value}>
                          {value}
                        </option>
                      ))}
                    </TextField>
                  ) : obj[val][value].type === "date" ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          value={
                            obj1[val] && obj1[val][value]
                              ? dayjs(obj1[val][value], "DD/MM/YYYY")
                              : null
                          }
                          onChange={(eValue) => {
                            setObj1({
                              ...obj1,
                              [val]: {
                                ...obj1[val],
                                [value]:
                                  dayjs(eValue).format("DD/MM/YYYY") ===
                                  "Invalid Date"
                                    ? ""
                                    : dayjs(eValue).format("DD/MM/YYYY"),
                              },
                            });
                            checkChange(
                              obj[val][value].value,
                              dayjs(eValue).format("DD/MM/YYYY") ===
                                "Invalid Date"
                                ? ""
                                : dayjs(eValue).format("DD/MM/YYYY")
                            );
                          }}
                          format="DD/MM/YYYY"
                          label="Date"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  ) : (
                    <TextField
                      size="small"
                      value={
                        obj1[val] && obj1[val][value]
                          ? obj1[val][value]
                          : obj[val][value].value
                      }
                      type={
                        obj[val][value].type === "string"
                          ? "text"
                          : obj[val][value].type === "email"
                          ? "email"
                          : "number"
                      }
                      onChange={(e) => {
                        setObj1({
                          ...obj1,
                          [val]: { ...obj1[val], [value]: e.target.value },
                        });
                        checkChange(obj[val][value].value, e.target.value);
                      }}
                    />
                  )}
                </div>
              ))
            )}
            {val === "Accordion3" ? (
              <></>
            ) : (
              <div className="d-flex justify-content-center w-100 mb-3">
                <Button
                  color="success"
                  variant="contained"
                  style={{ width: 100 }}
                  onClick={(e)=>submit(e,val)}
                >
                  Save
                </Button>
              </div>
            )}
          </form>
        </Accordion>
      ))}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertMessage}
      >
        <Alert severity="warning" variant="filled">
          Please Save After Modify
        </Alert>
      </Snackbar>
    </>
  );
};

export default DynamicForm;
