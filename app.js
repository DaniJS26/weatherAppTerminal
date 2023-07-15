import inquirer from "inquirer";
import https from "https";
import fs from "fs";

inquirer
    .prompt([
        {
            name: "City",
            message: "Enter your current location: ",
        },
        {
            name: "appid",
            message: "Enter your appid: ",
        },
        {
            name: "temperature_Units",
            message: "C / F : "
        }

    ])
    .then(answer => {
        const usr_api = answer.appid;
        let usr_city = answer.City;
        let usr_unit = answer.temperature_Units;
        let weatherUnit;
        if (usr_unit === "C") {
            weatherUnit = "metric"
        } else {
            weatherUnit = "imperial";
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${usr_city}&appid=${usr_api}&units=${weatherUnit}`;
        https.get(url, (res) => {
            res.on("data", data => {
                fs.writeFile("weather.json", data, (err) => {
                    if (err) throw err;
                    else { console.log("File Saving Completed !") };
                })
            });
            res.on("error", error => {
                console.log(error)
            })
        })
    })
    .catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    })

